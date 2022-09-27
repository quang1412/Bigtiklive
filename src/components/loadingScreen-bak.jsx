import React from "react";
import logo from '../logo.svg';
import '../App.css';

export default function startScreen(props) {

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p className='mb-0 fs-4'>{props.title}</p>
      <small className='fs-6'>{props.text}</small>
    </header>
  )
}