import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, createStyles, CssBaseline, Grid, Paper, useTheme} from '@material-ui/core';
import { queries, mappings } from '../../src/constants';
import { useRouter } from 'next/router';
import JSONTree from 'react-json-tree';
import { emphasize, withStyles, Theme} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormComponent } from '../../src/components/form';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      //borderBottom: 'unset',
    },
  },
});
const theme = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED'
};
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#cb3837",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

function Row(props: { row: any, entitySchema:string[], schema:Object, uischema:Object }) {
  const { row, entitySchema, schema, uischema } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {entitySchema.map((key, index)=>{
          const data = row[key];
          if(typeof data==='object'){
            return <StyledTableCell align="center" key={index}> <JSONTree data={data} theme={{
              extend: theme,
              // underline keys for literal values
              valueLabel: {
                textDecoration: 'underline',
              },
              
              // switch key for objects to uppercase when object is expanded.
              // `nestedNodeLabel` receives additional argument `expandable`
              nestedNodeLabel: ({ style }, expanded) => ({
                style: {
                  ...style,
                  textTransform: expanded ? 'uppercase' : style.textTransform,
                },
              }),
            }} shouldExpandNode={()=>false} invertTheme={true}/> </StyledTableCell>
          }
          else{
            return <StyledTableCell align="center" key={index}>{data.toString().length>0?data:"NULL"}</StyledTableCell>
          }
        })}
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow style={{maxHeight:open?450:0, overflow:"auto"}}>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0.5} display="flex" style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <FormComponent data={{}} schema={schema} uischema={uischema} open={open}/>
              <CssBaseline/>
              <Button variant="contained" color="secondary" >submit</Button>
              </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}


const useStyles = makeStyles((theme)=>({
  toolbar: theme.mixins.toolbar,
  paper:{
    //height:500
  },
  table:{
    
  }
}));
export default function CollapsibleTable() {
  const router = useRouter();
  const entity = router.query.entity as string;
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [tableSchema, setTableSchema] = useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [uischema, setUIschema] = useState({});
  const [schema, setSchema]=useState({});
  const [formData,setFormData]=useState({});

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(()=>{
    if(entity!==undefined){
      setTableSchema(mappings[entity].headers);
      fetch('http://localhost:3000',{
      method: "POST",
      headers:{
        "AUTHORIZATION": "Bearer 3d1833da7020e0602165529446587434",
        "mobilenumber":"+919010637524",
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        query: queries[entity]
      })
    }).then(res=> res.json()).then(({ data})=> {
      const { schema, uischema } = mappings[entity];
      const { response } = data[mappings[entity]['response']];
      setData(response);
      setSchema(schema);
      setUIschema(uischema);
    });
    }
  },[entity])
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
            onClick={handleClick}
          />
          <StyledBreadcrumb component="a" href="#" label={entity} onClick={handleClick} />
      </Breadcrumbs>
      <Grid container justify="flex-end">
      <TablePagination 
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={4}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      </Grid>
      
      {/* <div className={classes.toolbar} /> */}
      <TableContainer component={Paper} className={classes.paper}>
        <Table aria-label="collapsible table" className={classes.table}>
          <TableHead>
            <TableRow>
              {
                tableSchema.map((key, index)=><StyledTableCell align="center" key={index}>{key.toUpperCase()}</StyledTableCell>)
              }
              <StyledTableCell>EDIT</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((entity:Object,index) => (
              <Row key={index} row={{...entity, sno:index+1}} entitySchema={tableSchema} schema={schema} uischema={uischema} />
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow >
              
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </>
  );
}
