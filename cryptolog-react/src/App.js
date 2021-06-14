import React, { Component } from 'react'
import NewForm from './components/NewForm';

export default class App extends Component {


  render() {
    return (
      <div className="container text-center mt-4">
        <h1>Cryptolog</h1>
        <NewForm />
      </div>
    )
  }
}

