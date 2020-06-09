import React from 'react';
import ActionCable from 'actioncable'
import { API_WS_ROOT } from '../constants';
import { Grid } from '@material-ui/core/'
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
    const newProbe = response.temperature;
    console.log('new temp');
    if (this.state.probes.some(probeData => {return probeData.probe_id === newProbe.probe_id})) {
      // Existing Probe Data
      this.setState((state) => {
        const probes = state.probes.map((probeData) => {
          if (probeData.probe_id === newProbe.probe_id){
            return newProbe;
          } else {
            return probeData;
          }
        });
        return { probes: probes };
      });
    } else {
      // New Probe Data
      this.setState(state => {
        const probes = [...state.probes, newProbe];
        return { probes: probes };
      })
    }

  };

  render = () => {
    return (
      <Grid container justify="center" direction="row" spacing={2} className="temperatureDisplay">
        { this.state.probes.map((probeData)=>{
          return(
            <Grid xs={4} item key={probeData.probe_id}>
              <ProbeCard temp={probeData.temp} createdAt={probeData.created_at} probeId = {probeData.probe_id}/>
            </Grid>
          );
        }) }
      </Grid>
    )
  }
}

export default TemperatureDisplay;