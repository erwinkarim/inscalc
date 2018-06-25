import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import NumberFormatCustom from '../components/NumberFormatCustom';
import { totalHealthcareExpenses, coverage, surgeryShortfall, recoveryExpenses, availableCIFundAfterSurgery, recoveryShortfall} from '../config/calculation';


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
          <ul>
            <li>Coverage (CI, Health + EPF): MYR <NumberFormatCustom value={coverage(props)} displayType="text" /></li>
            <li>
              Sugery & Hospitalization Expenses today: MYR <NumberFormatCustom value={totalHealthcareExpenses(props)} displayType="text" />
            </li>
            <li>
              Sugery & Hospitalization Expenses in 5 years: MYR <NumberFormatCustom value={totalHealthcareExpenses(props, true)} displayType="text" />
            </li>
            <li>
              Sugery shortfall today: MYR <NumberFormatCustom value={surgeryShortfall(props)} displayType="text" />
            </li>
            <li>
              Sugery shortfall in 5 years: MYR <NumberFormatCustom value={surgeryShortfall(props, true)} displayType="text" />
            </li>
            <li>Funds available after Sugery: MYR <NumberFormatCustom value={availableCIFundAfterSurgery(props)} displayType="text" /></li>
            <li>
              Recovery Expenses for {props.recoveryTime} months today: MYR <NumberFormatCustom value={recoveryExpenses(props)} displayType="text" />
            </li>
            <li>
              Recovery Expenses for {props.recoveryTime} months in 5 years:
              MYR <NumberFormatCustom value={recoveryExpenses(props, true)} displayType="text" />
            </li>
            <li>
              Recovery expenses shortfall today: MYR <NumberFormatCustom value={recoveryShortfall(props)} displayType="text" />
            </li>
            <li>
              Recovery expenses shortfall in 5 years: MYR <NumberFormatCustom value={recoveryShortfall(props, true)} displayType="text" />
            </li>
          </ul>
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

Finish.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default withStyles(styles)(Finish);
