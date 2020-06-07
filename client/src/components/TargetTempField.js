import React from 'react';

class TargetTempField extends React.Component {

  constructor(props) {
		super(props);
  }

  render = () => {
    return (
      <div className="targetTempField">
        <input type="text" onChange={this.props.handleChange} />  
      </div>
    )
  }
}

export default TempeatureDisplay;