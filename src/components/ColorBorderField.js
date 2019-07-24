import React from 'react';

class ColorBorderField extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    this.myRef.current.style.borderColor =
      '#' + (((1 << 24) * Math.random()) | 0).toString(16);
  }

  render() {
    return <input autoComplete="off" ref={this.myRef} {...this.props.field} />;
  }
}

export default ColorBorderField;
