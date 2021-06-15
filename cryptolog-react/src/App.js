import React, { Component } from 'react'
import NewForm from './components/NewForm';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
      showForm: false
    }

    this.handleAddTransaction = this.handleAddTransaction.bind(this);
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
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
        <button onClick={this.toggleForm}>Add New Transaction</button>
        { this.state.showForm &&
        <NewForm handleAddTransaction={ this.handleAddTransaction } />

        }
      </div>
    )
  }
}

