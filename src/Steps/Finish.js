import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';


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
  avatar: {
    margin: '0px 5px',
  },
  row: {
    display: 'flex', justifyContent: 'center',
  },
});

const Finish = (props) => {
  const { classes } = props;

  return (
    <div>
      <Typography className={classes.instructions}>
        All steps completed - you&quot;re finished
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          Talk about coveage here
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <p>Share your results</p>
          <div className={classes.row}>
            <Button className={classes.avatar} variant="fab" color="primary" onClick={() => { console.log('should share to facebook'); }}>
              <FontAwesomeIcon icon={faFacebook} />
            </Button>
            <Button className={classes.avatar} variant="fab" color="primary" onClick={() => { console.log('should share to twitter'); }}>
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
            <Button className={classes.avatar} variant="fab" color="primary" onClick={() => { console.log('should share to email'); }}>
              <FontAwesomeIcon icon={faEnvelope} />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Button onClick={props.handleReset} className={classes.button}>
        Reset
      </Button>
    </div>
  );
};

export default withStyles(styles)(Finish);
