import React, { Component } from 'react'
import Transactions from './components/Transactions';
import NewForm from './components/NewForm';
import CreateUser from './components/CreateUser';
import UserLogin from './components/UserLogin';

const baseURL = 'http://localhost:3003'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
      showForm: false
    }

    this.handleAddTransaction = this.handleAddTransaction.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount() {
    this.getTransactions()
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  getTransactions() {
    fetch(baseURL + '/transactions')
    .then(data => { return data.json()}, err => console.log(err))
    .then(parsedData => this.setState({transactions: parsedData}), err => console.log(err))
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
        <Transactions transactions={ this.state.transactions }/>
        <UserLogin />
        <CreateUser />
      </div>
    )
  }
}

