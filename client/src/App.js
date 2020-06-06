import React, { Component } from 'react';
import TemperatureDisplay from './components/TemperatureDisplay';
// import './App.css'; <-- commented out for styling

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