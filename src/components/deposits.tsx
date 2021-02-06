import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
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
        <Link color="primary" href="#" onClick={preventDefault}>
          View More
        </Link>
      </div>
    </React.Fragment>
  );
}
