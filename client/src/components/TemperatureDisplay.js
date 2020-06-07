import React from 'react';
import ActionCable from 'actioncable'
import { API_ROOT, API_WS_ROOT } from '../constants';
import TargetTempField from "./targetTempField"
import moment from 'moment'

class TempeatureDisplay extends React.Component {

  constructor(props) {
		super(props);		
		this.state = {
      targetTemp: null,
      temperature: {
        temp: null,
        created_at: null
      }
    };
    this.handleReceivedTemperature = this.handleReceivedTemperature.bind(this);
    this.handleTargetTempChange = this.handleTargetTempChange.bind(this);
  }
  
  componentDidMount = () => {
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`); //CREATES ACTION CABLE CONSUMER
    this.cable.subscriptions.create({
      channel: `TemperaturesChannel`, 
      },{
      received: this.handleReceivedTemperature
    });
  }

  handleReceivedTemperature = response => {
    console.log("new temp");
    const {temperature} = response;
    this.setState({
      temperature: temperature
    });
  };

  handleTargetTempChange = value => {
    console.log("target change");
  }

  render = () => {
    const { temperature } = this.state;
    return (
      <div className="temperatureDisplay">
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
        <TargetTempField handleChange={this.handleTargetTempChange}></TargetTempField>
      </div>
    )
  }
}

export default TempeatureDisplay;