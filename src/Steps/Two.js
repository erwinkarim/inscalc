import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import FormCard from '../components/FormCard';
import NumberFormatCustom from '../components/NumberFormatCustom';

const chartColors = {
  red: 'rgba(255, 99, 132, 0.4)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

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
    labels: ['Current', 'In 5 years ...'],
    datasets: [
      {
        label: 'Hospitalization Expenses',
        backgroundColor: [chartColors.red, chartColors.red],
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
            <li>Current Healthcare Expense: <NumberFormatCustom displayType="text" value={currentHCExpense} /></li>
            <li>Current Shortfall: <NumberFormatCustom displayType="text" value={currentShortfall} /></li>
            <li>Future Healthcare Expense: <NumberFormatCustom displayType="text" value={futureHCExpense} /></li>
            <li>Future Shortfall: <NumberFormatCustom displayType="text" value={futureShortfall} /></li>
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
