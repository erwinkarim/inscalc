import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {},
  paper: {},
  button: {},
  formControl: {
    padding: '16px',
  },
  fullWidth: {
    width: '100%',
  },
  card: {
    margin: '10px 0px',
  },
  instructions: {},
});

const Finish = (props) => {
  const { classes } = props;

  return (
    <div>
      <Typography className={classes.instructions}>
        All steps completed - you&quot;re finished
      </Typography>
      <Button onClick={props.handleReset} className={classes.button}>
        Reset
      </Button>
    </div>
  );
};

export default withStyles(styles)(Finish);
