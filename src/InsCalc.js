import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Paper } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import One from './Steps/One';
import Two from './Steps/Two';
import Three from './Steps/Three';

// We can inject some CSS into the DOM.
const styles = theme => ({
  root: {
    maxWidth: '760px',
    margin: '0px auto',
  },
  paper: {
    padding: '16px',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
});

// for the sliders / forms
const calcInput = [
  [
    {
      name: 'income', min:0, max:2000000, step:1000, label: 'Current income (after taxes):',
      title: 'Annual Income', startAdornment: 'MYR',
      subtext: 'This includes your blah blah'
    },
    {
      name: 'replacementIncome', min:0, max:100, step: 1, label: 'Desired replacement income (needed during recovery):',
      title: 'Replacement Income', endAdornment: '%',
      subtext: 'This is a amount you need day-to-day blah ...'
    },
  ],
  [
    {
      name: 'mortage', min:0, max:100000, step: 1000, label: 'Mortage/Rent',
      title: 'Mortage/Rent', startAdornment: 'MYR',
      subtext: 'This is a amount you need day-to-day blah ...'
    },
    {
      name: 'property', min:0, max:100000, step: 1000, label: 'Property Fees',
      title: 'Property Fee', startAdornment: "MYR",
      subtext: 'Amount paid to property taxes or condo fees...'
    },
    {
      name: 'loans', min:0, max:100000, step: 1000, label: 'Loans',
      title: 'Loans & Debt', startAdornment: "MYR",
      subtext: 'Amount that you use to service your debts and loans'
    },
    {
      name: 'savings', min:0, max:100000, step: 1000, label: 'Savings',
      title: 'Saving Contributions', startAdornment: "MYR",
      subtext: 'Amount set aside ...'
    },
  ],
  [
    {
      name: 'currInsurance', min:0, max:2500000, step: 1000, label: 'Current Insurance',
      title:'Current Insurance', startAdornment: "MYR",
      subtext: 'Critical illness insurance coverage'
    },
  ],
  [
    {
      name: 'recoveryTime', min:0, max:120, label: 'Recovery time (in months):',
      title: 'Length of recovery', endAdornment: 'Months',
      subtext: 'Amount of times in month for recovery before working full time'
    },
    {
      name: 'desiredIncome', min:0, max:400000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Desired monthly replacement income', startAdornment: 'MYR',
      subtext: 'Amount of times in month for recovery before working full time'
    },
    {
      name: 'spousalIncome', min:0, max:10000000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Spousal Income Replacement', startAdornment: 'MYR',
      subtext: 'Loss income for spousal for 1 month'
    },
    {
      name: 'healthcareExpenses', min:0, max:500000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Healthcare expenses', startAdornment: 'MYR',
      subtext: 'Loss income for spousal for 1 month'
    },
    {
      name: 'otherExpenses', min:0, max:100000, step: 1000, label: 'Desired recovery income per month:',
      title: 'Healthcare expenses', startAdornment: 'MYR',
      subtext: 'Loss income for spousal for 1 month'
    },
  ],
];

// steps
/**
 * Adds two numbers together.
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @returns {int} The sum of the two numbers.
 */
function getSteps() {
  return ['Calculate Insurance', 'Hospitalization Costs', 'Recovery Costs'];
}

// cost calculation & assumptions
const salaryInflation = 0.03;
const inflation = 0.02;
const medInflation = 0.04;
// current costing
const calcCost = (props) => {
  return (props.mortage + props.property + props.loans + props.savings) * 12
    + props.income / 12 * props.recoveryTime + props.spousalIncome * props.recoveryTime
    + props.healthcareExpenses + props.otherExpenses;
};
// cost in 10 years
const calcFutureCost = (props) => {

};

/*
  actual component
 */
 /**
  * Adds two numbers together.
  * @param {int} num1 The first number.
  * @param {int} num2 The second number.
  * @returns {int} The sum of the two numbers.
*/
class InsCalc extends Component {
  /**
    * Constructor
    * @param {int} props the property
    * @param {int} num2 The second number.
    * @returns {int} The sum of the two numbers.
    */
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      income:  60000, replacementIncome: 35,
      mortage: 0, property: 0, loans: 0, savings: 0,
      currInsurance: 0,
      recoveryTime: 12, desiredIncome: 1399, spousalIncome: 0,
      healthcareExpenses: 25000, otherExpenses: 10000,
      data: [],
    };
  }
  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <One
            calcInput={calcInput}
            {...this.state}
            handleChange={this.handleChange}
            handleTextChange={this.handleTextChange}
          />
        );
      case 1:
        return (
          <Two
            calcInput={calcInput}
            {...this.state}
            handleChange={this.handleChange}
            handleTextChange={this.handleTextChange}
          />
        );
      case 2:
        return (
          <Three
            calcInput={calcInput}
            {...this.state}
            handleChange={this.handleChange}
            handleTextChange={this.handleTextChange}
          />
        );
      default:
        return 'Unknown step';
    }
  }
  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }
  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }
  handleReset = () => {
    this.setState({ activeStep: 0 });
  }
  handleChange = (e, v) => {
    const newState = this.state;
    newState[e] = v;
    this.setState(newState);
  }
  handleTextChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }
  render = () => {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();

    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep}>
              {
                steps.map((label) => {
                  const props = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...props}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })
              }
            </Stepper>
            <div>
              {
                activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                    <Button onClick={this.handleReset} className={classes.button}>
                      Reset
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {this.getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button variant="raised" color="primary" onClick={this.handleNext} className={classes.button}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(InsCalc);
