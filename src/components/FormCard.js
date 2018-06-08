import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


const FormCard = (props) => {
  const { classes, currentInput } = props ;

  return (
    <Card className={classes.card}>
      {
        props.currentInput.map( elm => (
          <FormControl className={classes.formControl} fullWidth>
            <Typography variant="headline">{elm.title}</Typography>
            <Slider value={props[elm.name]} min={elm.min} max={elm.max} step={elm.step || 1} onChange={(e,v) => props.handleChange(elm.name, v)}/>
            <TextField type="number" inputProps={{min:elm.min, max:elm.max}}
              helperText={elm.subtext}
              InputProps={{
                startAdornment: elm.startAdornment ? <InputAdornment position="start">{elm.startAdornment}</InputAdornment> : '',
                endAdornment: elm.endAdornment ? <InputAdornment position="endl">{elm.endAdornment}</InputAdornment> : '',
              }}
              value={props[elm.name]} id={elm.name} label={elm.title} onChange={props.handleTextChange(elm.name)}/>
          </FormControl>
        ))
      }
    </Card>
  )
}

export default FormCard;
