import React from 'react';
import ActionCable from 'actioncable'
import { API_WS_ROOT } from '../constants';
import { Container } from '@material-ui/core/'
import ProbeCard from "./ProbeCard"

class TemperatureDisplay extends React.Component {

  constructor(props) {
		super(props);		
		this.state = {
      probes: []
    }
    this.handleReceivedTemperature = this.handleReceivedTemperature.bind(this);
  }
  
  componentDidMount = () => {
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`); //CREATES ACTION CABLE CONSUMER
    this.cable.subscriptions.create({
      channel: `TemperaturesChannel`, 
      },{
      received: this.handleReceivedTemperature
    });
  }

  componentWillUnmount = () => {
    this.cable.disconnect();
  }

  handleReceivedTemperature = response => {
    this.setState = (state) => {
      const probes = this.state.probes.map((probeData) => {
        if (probeData.probe_id === response.probe_id){
          return response;
        } else {
          return probeData;
        }
      });
      return {probes};
    }
  };

  render = () => {
    return (
      <Container maxWidth="sm" className="temperatureDisplay">
        {this.state.probes.map((probeData)=>{
          return(<ProbeCard key={probeData.probe_id} temp={probeData.temp} createdAt={probeData.created_at} probeId = {probeData.id}/>);
        })}
      </Container>
    )
  }
}

export default TemperatureDisplay;