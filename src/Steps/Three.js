import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import FormCard from '../components/FormCard';
import NumberFormatCustom from '../components/NumberFormatCustom';
import chartColors from '../config/chartColors';
import { recoveryExpenses, availableCIFundAfterSurgery, recoveryShortfall } from '../config/calculation';

const styles = () => ({
  root: {},
  paper: {},
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

const Three = (props) => {
  const {
    classes,
  } = props;
  // const { BarChart } = ReactD3;

  const chartData = {
    labels: ['Current', 'In 5 years ...'],
    datasets: [
      {
        label: 'Recovery Expenses',
        backgroundColor: chartColors.red,
        stack: 'Stack 0',
        data: [recoveryExpenses(props), recoveryExpenses(props, true)],
      },
      {
        label: 'CI Fund Available',
        backgroundColor: chartColors.orange,
        stack: 'Stack 1',
        data: [availableCIFundAfterSurgery(props), availableCIFundAfterSurgery(props)],
      },
      {
        label: 'Shortfall',
        backgroundColor: chartColors.lightYellow,
        borderColor: chartColors.red,
        borderWidth: 1,
        stack: 'Stack 1',
        data: [recoveryShortfall(props), recoveryShortfall(props, true)],
      },
    ],
  };

  const chartOptions = {
    title: {
      display: true,
      text: 'Recovery Costs vs. Coverage',
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
          <ul>
            <li>Total Expenses for Recovery: <NumberFormatCustom displayType="text" value={recoveryExpenses(props)} /></li>
            <li>Shortfall for Recovery: <NumberFormatCustom displayType="text" value={recoveryShortfall(props)} /></li>
            <li>Total Expenses for Recovery in 5 years: <NumberFormatCustom displayType="text" value={recoveryExpenses(props, true)} /></li>
            <li>Shortfall for Recovery in 5 years: <NumberFormatCustom displayType="text" value={recoveryShortfall(props, true)} /></li>
            <li>CI fund available: <NumberFormatCustom displayType="text" value={availableCIFundAfterSurgery(props)} /></li>
          </ul>
        </CardContent>
      </Card>
      <Typography variant="headline">Recovery Costs</Typography>
      <FormCard
        {...props}
        currentInput={props.calcInput[4]}
      />
    </div>
  );
};

Three.propTypes = {
  calcInput: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape)).isRequired,
  classes: PropTypes.shape().isRequired,
  recoveryTime: PropTypes.number.isRequired,
  recoveryMonthly: PropTypes.number.isRequired,
  desiredIncome: PropTypes.number.isRequired,
  medInflation: PropTypes.number.isRequired,
  inflation: PropTypes.number.isRequired,
  ciInsurance: PropTypes.number.isRequired,
  healthcareExpenses: PropTypes.number.isRequired,
  otherExpenses: PropTypes.number.isRequired,
  currInsurance: PropTypes.number.isRequired,
  epf: PropTypes.number.isRequired,
};

export default withStyles(styles)(Three);
