import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import FormCard from '../components/FormCard';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  formControl: {
    padding: '16px',
  },
  fullWidth: {
    width: '100%',
  },
  card: {
    margin: '10px 0px',
  }

});

const calcInput = [
  [
    { name: 'income', min:0, max:2000000, step:1000, label: 'Current income (after taxes):',
      title:'Annual Income', startAdornment: "MYR",
      subtext:'This includes your blah blah'},
    { name: 'replacementIncome', min:0, max:100, step: 1, label: 'Desired replacement income (needed during recovery):',
      title: 'Replacement Income', endAdornment: '%',
      subtext:'This is a amount you need day-to-day blah ...'},
  ],
  [
    { name: 'mortage', min:0, max:100000, step: 1000, label: 'Mortage/Rent',
      title: 'Mortage/Rent', startAdornment: "MYR",
      subtext:'This is a amount you need day-to-day blah ...'},
    { name: 'property', min:0, max:100000, step: 1000, label: 'Property Fees',
      title: 'Property Fee', startAdornment: "MYR",
      subtext:'Amount paid to property taxes or condo fees...'},
    { name: 'loans', min:0, max:100000, step: 1000, label: 'Loans',
      title: 'Loans & Debt', startAdornment: "MYR",
      subtext:'Amount that you use to service your debts and loans'},
    { name: 'savings', min:0, max:100000, step: 1000, label: 'Savings',
      title: 'Saving Contributions', startAdornment: "MYR",
      subtext:'Amount set aside ...'},
  ],
  [
    { name: 'currInsurance', min:0, max:2500000, step: 1000, label: 'Current Insurance',
      title:'Current Insurance', startAdornment: "MYR",
      subtext:'Critical illness insurance coverage'},
  ],
];

const mainTitle = [
  'Your Income',
  'Your Current Monthly Expenses',
  'Your Existing Insurance',
];


/**
 * Adds two numbers together.
 * @param {object} props Properties
 * @returns {null} returns nothing
 */
const One = (props) => {
  const { classes } = props;

  return (
    <div>
      {
        mainTitle.map((title, index) => (
          <div key={title}>
            <Typography variant="headline">{title}</Typography>
            <FormCard
              {...props}
              currentInput={props.calcInput[index]}
            />
          </div>
        ))
      }
    </div>
  );
};

export default withStyles(styles)(One);
