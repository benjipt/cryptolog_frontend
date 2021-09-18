import React, { Component } from 'react'
import Transactions from './components/Transactions';
import NewForm from './components/NewForm';
import EditForm from './components/EditForm';
import Login from './components/Login'
import Logout from './components/Logout';

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
      selectedTransaction: {},
      showNewForm: false,
      showEditForm: false,
      userLoggedIn: false,
      userGoogleId : ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleAddTransaction = this.handleAddTransaction.bind(this)
    this.handleEditTransaction = this.handleEditTransaction.bind(this)
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
    this.toggleNewForm = this.toggleNewForm.bind(this)
    this.toggleEditForm = this.toggleEditForm.bind(this)
  }

  handleLogin = profile => {
    const { googleId } = profile
    this.setState({
      loggedIn: true,
      userGoogleId: googleId
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      userGoogleId: ''
    })
  }

  toggleNewForm = () => {
    this.setState({
      showNewForm: !this.state.showNewForm
    })
  }

  toggleEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }

  getTransactions = userId => {
    fetch(baseURL + '/transactions/' + userId)
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

  handleEditTransaction = e => {
    const { id } = e.target
    const thisTransaction = this.state.transactions.find(transaction => transaction._id === id)
    this.setState({
      showEditForm: true,
      selectedTransaction: thisTransaction
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
        
        { !this.state.loggedIn &&
        <Login 
          handleLogin={ this.handleLogin } /> }

        { this.state.loggedIn &&
        <Logout 
          handleLogout={ this.handleLogout } /> }

        { this.state.loggedIn && !this.state.showNewForm && !this.state.showEditForm &&
        <button className="btn btn-primary mt-3" onClick={this.toggleNewForm}>Add Transaction</button> }
        

        { this.state.showNewForm &&
        <NewForm 
          userId={ this.state.userGoogleId }
          handleAddTransaction={this.handleAddTransaction}
          toggleNewForm={this.toggleNewForm} />
        }

        { this.state.showEditForm &&
        <EditForm 
          transaction={this.state.selectedTransaction}
          toggleEditForm={this.toggleEditForm} /> }

        {this.state.loggedIn && !this.state.showNewForm && !this.state.showEditForm &&
        <Transactions
          userId={ this.state.userGoogleId }
          getTransactions={ this.getTransactions }
          transactions={ this.state.transactions }
          handleEditTransaction={ this.handleEditTransaction }
          handleDeleteTransaction={ this.handleDeleteTransaction } /> }
      </div>
    )
  }
}

