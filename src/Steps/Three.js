import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs';
import FormCard from '../components/FormCard';

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

const styles = theme => ({
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
  const { classes } = props;
  const {
    recoveryTime, recoveryMonthly, desiredIncome,
    medInflation, inflation,
    ciInsurance, healthcareExpenses, otherExpenses,
    currInsurance, epf
  } = props;
  // const { BarChart } = ReactD3;

  const currentRExpenses = recoveryTime * (recoveryMonthly + desiredIncome);
  const futureRExpenses = recoveryTime * (
    (recoveryMonthly * ((1 + medInflation) ** 5)) +
    (desiredIncome * ((1 + inflation) ** 5))
  );
  // somehow figure out
  const currentCIFundAvailable = ciInsurance - (
    Math.min(
      ciInsurance,
      (healthcareExpenses + otherExpenses) - (currInsurance + epf)
    )
  );
  const currentRShortfall = Math.max(0, currentRExpenses - currentCIFundAvailable);
  const futureRShortfall = Math.max(0, futureRExpenses - currentCIFundAvailable);

  const chartData = {
    labels: ['Current', 'Future'],
    datasets: [
      {
        label: 'Recovery Expenses',
        backgroundColor: chartColors.red,
        stack: 'Stack 0',
        data: [currentRExpenses, futureRExpenses],
      },
      {
        label: 'CI Fund Available',
        backgroundColor: chartColors.orange,
        stack: 'Stack 1',
        data: [currentCIFundAvailable, currentCIFundAvailable],
      },
      {
        label: 'Shortfall',
        backgroundColor: chartColors.yellow,
        stack: 'Stack 1',
        data: [currentRShortfall, futureRShortfall],
      },
    ],
  };

  const chartOptions = {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
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
      <Card>
        <CardContent>
          <Bar data={chartData} options={chartOptions} width={600} height={250} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <ul>
            <li>Total Expenses for Recovery: {currentRExpenses}</li>
            <li>Shortfall for Recovery: {currentRShortfall}</li>
            <li>Total Expenses for Recovery in 5 years: {futureRExpenses}</li>
            <li>Shortfall for Recovery in 5 years: {futureRShortfall}</li>
            <li>CI fund available: {currentCIFundAvailable}</li>
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

export default withStyles(styles)(Three);
