import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Card from './Card/Card'
import DrawButton from './DrawButton/DrawButton';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [
        {code: '404', phrase: 'Not found', description: 'indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exist.'}
        ],
      currentCard: {}
    }

    this.updateCard = this.updateCard.bind(this);
  }

  //this is called a lifecycle hook
  componentWillMount() {
    const currentCards = this.state.cards;

    //fetch JSON here!
    fetch('https://raw.githubusercontent.com/for-GET/know-your-http-well/master/json/status-codes.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.forEach(function(item) {
          let desc = item.description;
          desc = desc.replace(/"/g,"");
          currentCards.push({code: item.code, phrase: item.phrase, description: desc});
        });
      })
      .catch(function(err) {
        console.log(err);
      });


    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    });
  }

  getRandomCard(currentCards) {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }

  render() {
    return (
      <div className='App'>
      <h1> Flashcards</h1>
        <div className='card-row'> 
          <Card question={this.state.currentCard.code}
                answer={this.state.currentCard.phrase}
                description={this.state.currentCard.description} 
          />
        </div>
        <div className='button-row'>
          <DrawButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}