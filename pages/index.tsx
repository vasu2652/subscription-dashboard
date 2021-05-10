import React, { useEffect,useState } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from '../src/Copyright';
import Deposits from '../src/components/deposits';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { fetchDetails } from '../src/lib/util';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
export default function Index() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [statusCount, setStatusCount] = useState([]);
  useEffect(()=>{
    fetchDetails("get_subscription_count_by_status").then(({ response }) => {
      const subscriptions = response.filter((sub:any)=>sub.status==='active'||sub.status==='deferred_active'||sub.status==='payment_failed'||sub.status==='disabled');
      subscriptions.sort((a:any,b:any)=>a.status<b.status?-1:1);
      setStatusCount(subscriptions);
    })
  },[])
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        {statusCount.map((sub:any, index:number)=>{
          return <Grid item xs={12} md={4} lg={3} key={index}>
          <Paper className={fixedHeightPaper}>
            <Deposits title={`${sub.status.toUpperCase()} Subscribers`} subs={sub.count} />
          </Paper>
        </Grid>
        })}
        
        {/* Chart */}
        {/* <Grid item xs={12} md={4} lg={6}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid> */}
        {/* Recent Orders */}
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid> */}
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}
