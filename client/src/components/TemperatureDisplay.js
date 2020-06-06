import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import moment from 'moment'

class TempeatureDisplay extends React.Component {
  state = {
    temperature: {
      temp: null,
      created_at: null
    }
  };

  handleReceivedTemperature = response => {
    console.log("new temp");
    const {temperature} = response;
    this.setState({
      temperature: temperature
    });
  };

  render = () => {
    const { temperature } = this.state;
    return (
      <div className="temperatureDisplay">
        <ActionCableConsumer
          channel={{ channel: 'TemperaturesChannel' }}
          onReceived={this.handleReceivedTemperature}
        />
        <div className="temperatureReading">
          <h2>
          {!!this.state.temperature.temp ? this.state.temperature.temp : "N/A"}
          </h2>
          <p>
            Last Updated:&nbsp;
            {
            !!this.state.temperature.created_at ?
              (moment(this.state.temperature.created_at).format('MMMM Do YYYY, h:mm:ss a')) 
            :
              ("N/A")
            }
          </p>
        </div>
      </div>
    )
  }
}

export default TempeatureDisplay;