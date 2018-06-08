import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FormCard from '../components/FormCard';
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

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

const data = [
  [
    {x: 0, y: 10},
    {x: 1, y: 5},
  ],
  [
    {x: 0, y: 12},
    {x: 1, y: 2},
  ],
  [
    {x: 0, y: 3},
    {x: 1, y: 16},
  ]
];


class Two extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render = () => {
    const { classes } = this.props;
    //const { BarChart } = ReactD3;

    return (
      <div>
        <Card className={classes.card}>
          <XYPlot height={400} width= {300} stackBy="y">
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={data[0]} />
            <VerticalBarSeries data={data[1]} />
            <VerticalBarSeries data={data[2]} />
          </XYPlot>
        </Card>
        <Typography variant="headline">Desired replacement Income</Typography>
        <FormCard {...this.state} {...this.props}
          currentInput={this.props.calcInput[3]} />
      </div>
    );
  }
};

export default withStyles(styles)(Two);
