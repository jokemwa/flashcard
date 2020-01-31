import React from 'react';
import './Card.css';

//this is a functional and presentational component
const Card = (props) => (
  <div className='card-container'>
    <div className='card'>
      <div className='front'>
        <div className='question'>{props.question}</div>
      </div>
      <div className='back'>
        <div className='answer'>{props.answer}</div>
        <div className='description'>{props.description}</div>
      </div>
    </div>
  </div>
);

export default Card;