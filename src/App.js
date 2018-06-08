import React, { Component } from 'react';
import logo from './logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import InsCalc from './InsCalc';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {/* The rest of your application */}
        <InsCalc />
      </React.Fragment>
    );
  }
}

export default App;
