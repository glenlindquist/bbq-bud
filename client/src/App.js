import React, { Component } from 'react';
import TemperatureDisplay from './components/TemperatureDisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TemperatureDisplay />
      </div>
    );
  }
}

export default App;