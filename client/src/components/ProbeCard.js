import React from 'react';
import TargetTempField from "./TargetTempField"
import {Card, CardContent, Typography} from '@material-ui/core/'
import moment from 'moment'

class ProbeCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highTemp: null,
      lowTemp: null
    };
    this.handleHighTempSet = this.handleHighTempSet.bind(this);
    this.handleLowTempSet = this.handleLowTempSet.bind(this);
  }
  
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
    return (
      <Card className="temperatureReading">
        <CardContent>
          <Typography variant="h5">Probe {this.props.probeId}</Typography>
          <Typography variant="h3">
          {!!this.props.temperature.temp ? this.props.temperature.temp : "N/A"}
          </Typography>
          <Typography variant="overline">
            Last Updated:&nbsp;
            {
            !!this.props.temperature.createdAt ?
              (moment(this.props.temperature.createdAt).format('MMMM Do YYYY, h:mm:ss a')) 
            :
              ("N/A")
            }
          </Typography>
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
        </CardContent>
      </Card>
    )
  }
}

export default ProbeCard;