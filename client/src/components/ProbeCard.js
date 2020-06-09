import React from 'react';
import TargetTempField from "./TargetTempField"
import {CardHeader, Grid, Paper, Card, CardContent, Typography} from '@material-ui/core/'
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

  componentDidUpdate = () => {
    // compare new temp to high/low stored in state
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
        <CardHeader title={"Probe " + this.props.probeId} />
        <CardContent>
          <Grid container spacing={2} alignContent="center" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h2" align="center">
                {!!this.props.temp ? this.props.temp : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item >
                  <div>High Temp Alarm:&nbsp;
                    {
                    !!this.state.highTemp ?
                      (this.state.highTemp)
                    :
                      ("N/A")
                    }
                  </div>
                </Grid>
                <Grid item >
                  <div>Low Temp Alarm:&nbsp;
                    {
                    !!this.state.lowTemp ?
                      (this.state.lowTemp)
                    :
                      ("N/A")
                    }
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Typography variant="overline">
            Last Updated:&nbsp;
            {
            !!this.props.createdAt ?
              (moment(this.props.createdAt).format('MMMM Do YYYY, h:mm:ss a')) 
            :
              ("N/A")
            }
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <TargetTempField handleTargetTempSet={this.handleHighTempSet} label={"High Temp"}></TargetTempField>
            </Grid>
            <Grid item xs={6}>
              <TargetTempField handleTargetTempSet={this.handleLowTempSet} label={"Low Temp"}></TargetTempField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default ProbeCard;