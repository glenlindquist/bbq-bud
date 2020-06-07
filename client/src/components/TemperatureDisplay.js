import React from 'react';
import ActionCable from 'actioncable'
import { API_ROOT, API_WS_ROOT } from '../constants';
import TargetTempField from "./TargetTempField"
import {Card, CardContent, Container, Typography} from '@material-ui/core/'
import moment from 'moment'

class TemperatureDisplay extends React.Component {

  constructor(props) {
		super(props);		
		this.state = {
      highTemp: null,
      lowTemp: null,
      temperature: {
        temp: null,
        created_at: null
      }
    };
    this.handleReceivedTemperature = this.handleReceivedTemperature.bind(this);
    this.handleHighTempSet = this.handleHighTempSet.bind(this);
    this.handleLowTempSet = this.handleLowTempSet.bind(this);

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
    const {temperature} = response;
    this.setState({
      temperature: temperature
    });
    if (temperature.temp < this.state.lowTemp) {
      console.log("low temp warning");
    }
    if (temperature.temp > this.state.highTemp) {
      console.log("high temp warning");
    }

  };

  handleHighTempSet = temp => {
    this.setState({
      highTemp: temp
    })
  }

  handleLowTempSet = temp => {
    this.setState({
      lowTemp: temp
    })
  }

  render = () => {
    const { temperature } = this.state;
    return (
      <Container maxWidth="sm" className="temperatureDisplay">
        <Card className="temperatureReading">
          <CardContent>
            <Typography variant="h3">
            {!!this.state.temperature.temp ? this.state.temperature.temp : "N/A"}
            </Typography>
            <Typography variant="overline">
              Last Updated:&nbsp;
              {
              !!this.state.temperature.created_at ?
                (moment(this.state.temperature.created_at).format('MMMM Do YYYY, h:mm:ss a')) 
              :
                ("N/A")
              }
            </Typography>
          </CardContent>
        </Card>
        <div>
          <h4>High Temp:&nbsp;
            {
            !!this.state.highTemp ?
              (this.state.highTemp)
            :
              ("N/A")
            }
          </h4>
        </div>
        <div>
          <h4>Low Temp:&nbsp;
            {
            !!this.state.lowTemp ?
              (this.state.lowTemp)
            :
              ("N/A")
            }
          </h4>
        </div>

        <TargetTempField handleTargetTempSet={this.handleHighTempSet} label={"High Temp"}></TargetTempField>
        <TargetTempField handleTargetTempSet={this.handleLowTempSet} label={"Low Temp"}></TargetTempField>

      </Container>
    )
  }
}

export default TemperatureDisplay;