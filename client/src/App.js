import React, { Component } from 'react';
import TemperatureDisplay from './components/TemperatureDisplay';
import {Container, Typography} from '@material-ui/core/'

class App extends Component {
  render() {
    return (
      <Container maxWidth="xl" className="App">
        <Typography variant="h2" align="center">BBQ Bud</Typography>
        <TemperatureDisplay />
      </Container>
    );
  }
}

export default App;