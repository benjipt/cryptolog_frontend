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
      transactions: [],
      showForm: false,
      userLoggedIn: false,
      userID : '',
      userName : '',

    }

    this.handleAddTransaction = this.handleAddTransaction.bind(this)
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
    // this.userLoggedIn = this.userLoggedIn.bind(this)  // used to pull values from user login
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

  // userLoggedIn = (id , name) => {   //used to pull values from user login, this wasnt working for me (mitch)
  //   this.setState({
  //       userLoggedIn: true,
  //       userID : id,
  //       userName : name,
  //   })
  // } 

  render() {
    return (
      <div className="container text-center mt-4">
        <h1 className="display-1">Cryptolog</h1>
        <UserSection userLoggiedIn={this.userLoggedIn}/>
        <button className="btn btn-primary mt-3" onClick={this.toggleForm}>Add New Transaction</button>
        { this.state.showForm &&
        <NewForm handleAddTransaction={ this.handleAddTransaction } />
        }
        <Transactions
          transactions={this.state.transactions}
          handleDeleteTransaction={this.handleDeleteTransaction} />
        {/* <UserLogin /> */}
        {/* <CreateUser /> */}
      </div>
    )
  }
}

