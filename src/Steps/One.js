import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FormCard from '../components/FormCard';

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
});

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
const One = props => (
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

One.propTypes = {
  calcInput: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape)).isRequired,
};

export default withStyles(styles)(One);
