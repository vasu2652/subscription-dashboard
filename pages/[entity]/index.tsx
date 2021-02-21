import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, createStyles, Fab, Grid, Paper, useTheme } from '@material-ui/core';
import {  mappings } from '../../src/constants';
import { useRouter } from 'next/router';
import { emphasize, withStyles, Theme } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import { FormComponent } from '../../src/components/form';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';
import AddNewEntity from '../../src/components/modal';
import { fetchDetails, postForm } from '../../src/lib/util';
import { Row,StyledTableCell } from '../../src/components/table/styled-row';
import LinearWithValueLabel from '../../src/components/linear-loader';
import { TopSnackBar } from '../../src/components/snackbar';
const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color:"#02475b",
    fontSize: 20,
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

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  paper: {
    //height:500
  },
  table: {
    color:"#02475b"
  }
}));
export default function EntityTable() {
  const router = useRouter();
  const entity = router.query.entity as string;
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [tableSchema, setTableSchema] = useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [uischema, setUIschema] = useState({});
  const [schema, setSchema] = useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formdata, setFormdata] = useState({});
  const [reload , setReload] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [snack, setSnack]= useState({
    severity: "success",
    message: "",
    open: false
  })
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSnackClose = () => {
    setSnack({
      ...snack,
      open: false
    });
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (entity !== undefined) {
      setProgress(10);
      setTableSchema(mappings[entity].headers);
      setProgress(40);
      fetchDetails(entity).then((response) => {
        setProgress(50);
        setData(response);
        setProgress(90)
        setSchema(mappings[entity]['schema']);
        setUIschema(mappings[entity]['uischema']);
        setProgress(100);
        setModalOpen(false);
        setProgress(0);
      })
    }
  }, [entity, reload])

  enum ActionType{
    EDIT = "EDIT",
    ADD = "ADD"
  }
  const handleFormSubmit = (action: ActionType, data: any) => () => {
    setProgress(10);
    postForm(entity, data, action).then((data: any) => {
      if (data.error) {
        setSnack({
          severity: "error",
          open: true,
          message: data.error
        })
      }
      else {
        setSnack({
          severity: "success",
          open: true,
          message: "Records Updated"
        })
        setProgress(25);
        setFormdata({});
        setReload(new Date());
      }

    })
  }
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
        <StyledBreadcrumb component="a" href="#" label={entity} onClick={handleClick}  />
      </Breadcrumbs>
      
      <LinearWithValueLabel progress={progress}/>
      <Grid container justify="flex-end">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={4}
          count={data?.length}
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
        <Fab  aria-label="add" style={{ margin: 5, backgroundColor:"#02475b", color:"white" }} onClick={handleModalOpen}>
          <AddIcon />
        </Fab>
      </Grid>
      {/* <div className={classes.toolbar} /> */}
      <TableContainer component={Paper} className={classes.paper}>
        <Table aria-label="collapsible table" className={classes.table}>
          <TableHead>
            <TableRow>
            <StyledTableCell align="center" key={0}>SNO</StyledTableCell>
              {
                tableSchema.map((key, index) => <StyledTableCell align="center" key={index}>{key.toUpperCase()}</StyledTableCell>)
              }
              <StyledTableCell>EDIT</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            )?.map((entity: Object, index) => (
              <Row key={entity._id} row={entity} sno={index+1} entitySchema={tableSchema} schema={schema} uischema={uischema} handleFormSubmit={handleFormSubmit}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddNewEntity open={modalOpen} handleClose={handleModalClose} render={() => (
        <>
          <h2 id="transition-modal-title">New: {entity?.toUpperCase()}</h2>
          <FormComponent uischema={uischema} schema={schema} data={formdata} setFormdata={setFormdata} />
          <Button color="primary" variant="contained" onClick={handleFormSubmit(ActionType.ADD,formdata)}>Submit</Button>
        </>)} />
        <TopSnackBar handleClose={handleSnackClose} {...snack}/>
    </>
  );
}
