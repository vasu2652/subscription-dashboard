
import React, { useState } from 'react';
import JSONTree from 'react-json-tree';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import { createStyles, IconButton, makeStyles, TableRow, CssBaseline, Button } from '@material-ui/core';
import { FormComponent } from '../form';
import { withStyles } from '@material-ui/core/styles';
export const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      backgroundColor: "#fcb716",
      color: "#fff",
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

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
export const Row = (props: { row: any, entitySchema: string[], schema: Object, uischema: Object, handleFormSubmit:any, sno:number, page:number, rowsPerPage:number })=> {
  const { row, entitySchema, schema, uischema,handleFormSubmit, sno, page, rowsPerPage } = props;
  const [ formdata, setFormdata] = useState(row);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
      <StyledTableCell align="center" key={0}>{sno}</StyledTableCell>
        {entitySchema.map((key, index) => {
          const data = row[key];
          if (typeof data === 'object') {
            return <StyledTableCell align="center" key={index+1}> <JSONTree data={data} theme={{
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
            }} shouldExpandNode={() => false} invertTheme={true} /> </StyledTableCell>
          }
          else {
            return <StyledTableCell align="center" key={index+1}>{data?.toString().length > 0 ? typeof data ==="boolean"? data.toString():data : "NULL"}</StyledTableCell>
          }
        })}
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow style={{ maxHeight: open ? 450 : 0, overflow: "auto" }}>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0.5} display="flex" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <FormComponent data={formdata} schema={schema} uischema={uischema} open={open} setFormdata={setFormdata} page={page} rowsPerPage={rowsPerPage}/>
              <CssBaseline />
              <Button variant="contained" color="secondary" onClick={handleFormSubmit("EDIT",formdata)}>submit</Button>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}
