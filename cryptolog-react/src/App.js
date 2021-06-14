import React, { Component } from 'react'
import NewForm from './components/NewForm';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: []
    }

    this.handleAddTransaction = this.handleAddTransaction.bind(this);
  }

  handleAddTransaction(transaction) {
    const copyTransactions = [...this.state.transactions]
    copyTransactions.unshift(transaction)
    this.setState({
      transactions: copyTransactions
    })
  }

  render() {
    return (
      <div className="container text-center mt-4">
        <h1>Cryptolog</h1>
        <NewForm handleAddTransaction={ this.handleAddTransaction } />
      </div>
    )
  }
}

