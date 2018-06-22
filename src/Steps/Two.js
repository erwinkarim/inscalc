import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bar } from 'react-chartjs-2';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormCard from '../components/FormCard';
import NumberFormatCustom from '../components/NumberFormatCustom';
import chartColors from '../config/chartColors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    ciInsurance, currInsurance, epf,
    useEpf,
  } = props;
  // const { BarChart } = ReactD3;

  const currentHCExpense = healthcareExpenses + otherExpenses;
  const futureHCExpense = currentHCExpense * ((1 + medInflation) ** 5);
  const epfCoverage = useEpf ? epf : 0;
  const allCoverage = (ciInsurance + currInsurance + epfCoverage);
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
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1">
            Base on coverage of MYR {<NumberFormatCustom displayType="text" value={allCoverage} />}. Click to change
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

export default withStyles(styles)(Two);
