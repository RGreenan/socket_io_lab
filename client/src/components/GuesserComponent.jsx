import React from 'react'

class GuesserComponent extends React.Component {
  constructor(props){
    super(props);
    this.questionSubmitted = this.questionSubmitted.bind(this);
  }

  questionSubmitted(event){
    event.preventDefault();
    if(!this.props.waitingForAnswer){
    this.props.guesserQuestion(event.target[0].value);
    }
  }

  render() {
    const answers = this.props.guesserAnswers.map((answer, index) => {
      return <p>{answer.currentQuestion} is {answer.answerString}</p>
    });

    return (
      <div>
      <h1>Guesser</h1>
      <h4>Choose a celebrity</h4>
      <form onSubmit={this.questionSubmitted}>
      <input
      type="text"
      id="text">
      </input>
      <input
      type="submit"
      value="Submit">
      </input>
      </form>
      {answers}
      </div>
    )
  }

}

export default GuesserComponent;
