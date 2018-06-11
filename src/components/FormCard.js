import React from 'react';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import NumberFormatCustom from './NumberFormatCustom';


const styles = theme => ({
  root: {},
  paper: {},
  button: {},
  formControl: {},
  fullWidth: {},
  chart: {},
  card: {
    padding: '0px 20px',
  },
  sliderGrid: {
    padding: '0px 20px',
  },
});


const FormCard = (props) => {
  const { classes, currentInput } = props;

  return (
    <Card className={classes.card}>
      {
        currentInput.map(elm => (
          <FormControl key={elm.title} className={classes.formControl} fullWidth>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Typography variant="subheading">{elm.title}</Typography>
              </Grid>
              <Grid item xs={12} md={4} className={classes.sliderGrid}>
                <Slider
                  value={props[elm.name]}
                  min={elm.min}
                  max={elm.max}
                  step={elm.step || 1}
                  onChange={(e, v) => props.handleChange(elm.name, v)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: elm.startAdornment ? <InputAdornment position="start">{elm.startAdornment}</InputAdornment> : '',
                    endAdornment: elm.endAdornment ? <InputAdornment position="end">{elm.endAdornment}</InputAdornment> : '',
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: elm.min, max: elm.max },
                  }}
                  value={props[elm.name]}
                  id={elm.name}
                  onChange={props.handleTextChange(elm.name)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{elm.subtext}</Typography>
              </Grid>
            </Grid>
          </FormControl>
        ))
      }
    </Card>
  );
};

export default withStyles(styles)(FormCard);
