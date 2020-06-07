import React from 'react';
import {Button, Input, InputLabel, FormControl} from '@material-ui/core/'
class TargetTempField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {targetTemp: null};
  }

  render = () => {
    return (
      <div className="targetTempField">
        <FormControl>
          <InputLabel>{this.props.label}</InputLabel>
          <Input onChange={(e) => this.setState({targetTemp: e.target.value})} />
          <Button onClick={()=>this.props.handleTargetTempSet(this.state.targetTemp)}>Set</Button>
        </FormControl>
      </div>
    )
  }
}

export default TargetTempField;