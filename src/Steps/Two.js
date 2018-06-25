import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import FormCard from '../components/FormCard';
import NumberFormatCustom from '../components/NumberFormatCustom';
import chartColors from '../config/chartColors';
import { totalHealthcareExpenses, coverage, surgeryShortfall } from '../config/calculation';

const styles = () => ({
  root: {},
  paper: {},
  fullWidth: {},
  button: {},
  card: {
    margin: '10px 0px',
  },
  formControl: {
    padding: '16px',
  },
  chart: {
    width: '100%',
  },
});

const Two = (props) => {
  const {
    classes,
    healthcareExpenses,
    ciInsurance,
    currInsurance,
    epf,
    useEpf,
  } = props;
  // const { BarChart } = ReactD3;

  const epfCoverage = useEpf ? parseInt(epf, 10) : 0;

  const chartData = {
    labels: ['Current', 'In 5 years ...'],
    datasets: [
      {
        label: 'Hospitalization Expenses',
        backgroundColor: [chartColors.red, chartColors.red],
        stack: 'Stack 0',
        data: [healthcareExpenses, healthcareExpenses],
      },
      {
        label: 'Current Insurance Coverage',
        backgroundColor: chartColors.orange,
        stack: 'Stack 1',
        data: [currInsurance, currInsurance],
      },
      {
        label: 'Critical Illness Coverage',
        backgroundColor: chartColors.blue,
        stack: 'Stack 1',
        data: [ciInsurance, ciInsurance],
      },
      {
        label: 'EPF Coverage',
        backgroundColor: chartColors.purple,
        stack: 'Stack 1',
        data: [epfCoverage, epfCoverage],
      },
      {
        label: 'Shortfall',
        backgroundColor: chartColors.lightYellow,
        borderColor: chartColors.red,
        borderWidth: 1,
        stack: 'Stack 1',
        data: [surgeryShortfall(props), surgeryShortfall(props, true)],
      },
    ],
  };

  const chartOptions = {
    title: {
      display: true,
      text: 'Hospitalization Costs vs. Coverage',
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true,
      }],
    },
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Bar data={chartData} options={chartOptions} width={600} height={250} />
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
            Debug:
          <ul>
            <li>Current Healthcare Expense: <NumberFormatCustom displayType="text" value={totalHealthcareExpenses(props)} /></li>
            <li>Current Shortfall: <NumberFormatCustom displayType="text" value={surgeryShortfall(props)} /></li>
            <li>Future Healthcare Expense: <NumberFormatCustom displayType="text" value={totalHealthcareExpenses(props, true)} /></li>
            <li>Future Shortfall: <NumberFormatCustom displayType="text" value={surgeryShortfall(props, true)} /></li>
          </ul>
        </CardContent>
      </Card>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1">
            Base on coverage of MYR {<NumberFormatCustom displayType="text" value={coverage(props)} />}. Click to change
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormCard
            {...props}
            useDiv
            currentInput={props.calcInput[2]}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Typography variant="headline">Hospitalization Cost</Typography>
      <FormCard
        {...props}
        currentInput={props.calcInput[3]}
      />
    </div>
  );
};

Two.propTypes = {
  calcInput: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape)).isRequired,
  classes: PropTypes.shape().isRequired,
  healthcareExpenses: PropTypes.number.isRequired,
  otherExpenses: PropTypes.number.isRequired,
  medInflation: PropTypes.number.isRequired,
  ciInsurance: PropTypes.number.isRequired,
  currInsurance: PropTypes.number.isRequired,
  epf: PropTypes.number.isRequired,
  useEpf: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Two);
