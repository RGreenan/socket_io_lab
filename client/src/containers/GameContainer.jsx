import React from 'react';
import GuesserComponent from '../components/GuesserComponent';
import ChooserComponent from '../components/ChooserComponent';
import io from 'socket.io-client';

class GameContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playerType: null,
      currentQuestion: null,
      waitingForAnswer: false,
      guesserAnswers: []
    }

    this.chooserAnswer = this.chooserAnswer.bind(this);
    this.guessQuestion = this.guessQuestion.bind(this);
    this.sendToChooser = this.sendToChooser.bind(this);
    this.sendToGuesser = this.sendToGuesser.bind(this);

    this.socket = io('http://localhost:3001');
    this.socket.on( 'guesser', this.sendToGuesser);
    this.socket.on( 'chooser', this.sendToChooser);
  }


  sendToGuesser(answer){
    const answers = this.state.guesserAnswers;
    answers.push(answer);
    this.setState({guesserAnswers: answers, waitingForAnswer: false})
    console.log(this.state.guesserAnswers);
  }

  sendToChooser(question){
    this.setState({currentQuestion: question})
  }

  selectPlayerType(playerType) {
    this.setState({ playerType })
  }

  chooserAnswer(answer){
    const answerString = answer ? "correct!! Great Success!!" : "incorrect";
    const currentQuestion = this.state.currentQuestion;
    this.socket.emit('chooser', {currentQuestion, answerString});
    this.setState({currentQuestion: null})
  }

  guessQuestion(question){
    this.socket.emit('guesser', question);
    this.setState({waitingForAnswer: true})
  }

  render() {

    switch(this.state.playerType) {
      case "PLAYERTYPE_GUESSER":
        return (
          <GuesserComponent
          guesserAnswers={this.state.guesserAnswers}
          guesserQuestion={this.guessQuestion}
          waitingForAnswer={this.state.waitingForAnswer}
          />
        )
      case "PLAYERTYPE_CHOOSER":
        return (
          <ChooserComponent
          currentQuestion={this.state.currentQuestion}
          chooserAnswer={this.chooserAnswer}
          />
        )
      default:
        return (
          <div id="homeWrapper">
            <h1 className="title">20 Questions</h1>
            <h3 className="title">Choose your player</h3>
            <button onClick={()=>{this.selectPlayerType("PLAYERTYPE_GUESSER")}}>
            Guesser
            </button>
            <button onClick={()=>{this.selectPlayerType("PLAYERTYPE_CHOOSER")}}>
            Chooser
            </button>
          </div>
        )
    }

  }
}

export default GameContainer;
