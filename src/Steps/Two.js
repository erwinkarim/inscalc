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

const styles = () => ({
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
    healthcareExpenses, otherExpenses,
    medInflation,
    ciInsurance, currInsurance, epf
  } = props;
  // const { BarChart } = ReactD3;

  const currentHCExpense = healthcareExpenses + otherExpenses;
  const futureHCExpense = currentHCExpense * ((1 + medInflation) ** 5);
  const allCoverage = (ciInsurance + currInsurance + epf);
  const currentShortfall = Math.max(
    0,
    currentHCExpense - allCoverage,
  );
  const futureShortfall = Math.max(
    0,
    futureHCExpense - allCoverage,
  );

  const chartData = {
    labels: ['Current', 'Future'],
    datasets: [
      {
        label: 'Hospitalization Expenses',
        backgroundColor: chartColors.red,
        stack: 'Stack 0',
        data: [currentHCExpense, futureHCExpense],
      },
      {
        label: 'Insurance Coverage',
        backgroundColor: chartColors.orange,
        stack: 'Stack 1',
        data: [allCoverage, allCoverage],
      },
      {
        label: 'Shortfall',
        backgroundColor: chartColors.yellow,
        stack: 'Stack 1',
        data: [currentShortfall, futureShortfall],
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
      <Card className={classes.card}>
        <CardContent>
            Debug:
          <ul>
            <li>Current Healthcare Expense: {currentHCExpense}</li>
            <li>Current Shortfall: {currentShortfall}</li>
            <li>Future Healthcare Expense: {futureHCExpense}</li>
            <li>Future Shortfall: {futureShortfall}</li>
          </ul>
        </CardContent>
      </Card>
      <Typography variant="headline">Hospitalization Cost</Typography>
      <FormCard
        {...props}
        currentInput={props.calcInput[3]}
      />
    </div>
  );
};

export default withStyles(styles)(Two);
