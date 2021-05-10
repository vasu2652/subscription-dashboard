import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
function Title(props: { children: React.ReactNode; }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props: { title: any; subs: any; }) {
  const { title, subs} = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {subs}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Till Today
      </Typography>
      <div>
        <Link color="primary" href={"/data?entity=subscriptions"}>
          View More
        </Link>
      </div>
    </React.Fragment>
  );
}
