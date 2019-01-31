import React from 'react'

class ChooserComponent extends React.Component {
  constructor(props){
    super(props);

    this.trueButtonClicked = this.trueButtonClicked.bind(this);
    this.falseButtonClicked = this.falseButtonClicked.bind(this);
  }

  trueButtonClicked(){
      this.props.chooserAnswer(true);
  }

  falseButtonClicked(){
      this.props.chooserAnswer(false);
  }

  render() {
    if (this.props.currentQuestion === null)
    {return <div>
      <h1>Chooser</h1><h4>Waiting on a guess...</h4>
      </div>
      ;}

    return (
      <div>
      <h1>Chooser</h1>
      <h4>{this.props.currentQuestion}</h4>
      <button onClick={this.trueButtonClicked}>YES</button>
      <button onClick={this.falseButtonClicked}>NO</button>
      </div>
    )
  }

}

export default ChooserComponent;
