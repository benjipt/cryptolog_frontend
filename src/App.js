import React, { Component } from 'react'
import Transactions from './components/Transactions';
import NewForm from './components/NewForm';
// import CreateUser from './components/CreateUser';
// import UserLogin from './components/UserLogin';
import UserSection from './components/UserSection';

// const baseURL = 'http://localhost:3003'    //commented out while attempting to setup heroku

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}

console.log('current base URL:', baseURL)



export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      transactions: [],
      showForm: false
    }

    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    this.handleAddTransaction = this.handleAddTransaction.bind(this)
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  componentDidMount() {
    this.getTransactions()
  }

  toggleLoggedIn = () => {
    this.setState({
        loggedIn: !this.state.loggedIn
    })
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

  handleDeleteTransaction(event) {
    fetch(`${baseURL}/transactions/${event.target.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.status === 200) {
          const findIndex = this.state.transactions.findIndex(transaction => transaction._id === event.target.id)
          const copyTransactions = [...this.state.transactions]
          copyTransactions.splice(findIndex, 1)

          this.setState({
            transactions: copyTransactions
          })
        }
      })
  }

  render() {
    return (
      <div className="container text-center mt-4 mb-4">
        <h1 className="display-1">CRYPTOLOG</h1>
        <UserSection
          toggleLoggedIn={this.toggleLoggedIn}
          loggedIn={this.state.loggedIn} />

        { this.state.loggedIn &&
        <button className="btn btn-primary mt-3" onClick={this.toggleForm}>Add New Transaction</button> }
        
        { this.state.showForm &&
        <NewForm 
          handleAddTransaction={this.handleAddTransaction}
          toggleForm={this.toggleForm} />
        }

        {this.state.loggedIn &&
        <Transactions
          transactions={this.state.transactions}
          handleDeleteTransaction={this.handleDeleteTransaction} /> }
        {/* <UserLogin /> */}
        {/* <CreateUser /> */}
      </div>
    )
  }
}

