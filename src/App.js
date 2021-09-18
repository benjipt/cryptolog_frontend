import React, { useState } from 'react'
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

export default function App() {
  // STATE HOOKS
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ transactions, setTransactions ] = useState([])
  const [ selectedTransaction, setSelectedTransaction ] = useState({})
  const [ showNewForm, setShowNewForm ] = useState(false)
  const [ showEditForm, setShowEditForm ] = useState(false)
  const [ userGoogleId, setUserGoogleId ] = useState('')

  const handleLogin = profile => {
    const { googleId } = profile
    setLoggedIn(true)
    setUserGoogleId(googleId)
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUserGoogleId('')
  }

  const toggleNewForm = () => {
    setShowNewForm(!showNewForm)
  }

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
  }

  const getTransactions = userId => {
    fetch(baseURL + '/transactions/' + userId)
    .then(data => { return data.json()}, err => console.log(err))
    .then(parsedData => setTransactions(parsedData), err => console.log(err))
  }

  const handleAddTransaction = transaction => {
    const copyTransactions = [...transactions]
    copyTransactions.unshift(transaction)
    setTransactions(copyTransactions)
  }

  const handleEditTransaction = e => {
    const { id } = e.target
    const thisTransaction = transactions.find(transaction => transaction._id === id)
    setSelectedTransaction(thisTransaction)
    setShowEditForm(true)
  }

  const handleDeleteTransaction = e => {
    const { id } = e.target
    fetch(`${baseURL}/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.status === 200) {
          const findIndex = transactions.findIndex(transaction => transaction._id === id)
          const copyTransactions = [...transactions]
          copyTransactions.splice(findIndex, 1)
          setTransactions(copyTransactions)
        }
      })
  }

  return (
    <div className="container text-center mt-4 mb-4">
      <h1 className="display-1">CRYPTOLOG</h1>
      
      { !loggedIn &&
        <Login 
          handleLogin={ handleLogin } /> }

      { loggedIn &&
        <Logout 
          handleLogout={ handleLogout } /> }

      { loggedIn && !showNewForm && !showEditForm &&
        <button className="btn btn-primary mt-3" onClick={ toggleNewForm }>Add Transaction</button> }
      

      { showNewForm &&
        <NewForm 
          userId={ userGoogleId }
          handleAddTransaction={ handleAddTransaction }
          toggleNewForm={ toggleNewForm } /> }

      { showEditForm &&
        <EditForm 
          transaction={ selectedTransaction }
          toggleEditForm={ toggleEditForm } /> }

      {loggedIn && !showNewForm && !showEditForm &&
        <Transactions
          userId={ userGoogleId }
          getTransactions={ getTransactions }
          transactions={ transactions }
          handleEditTransaction={ handleEditTransaction }
          handleDeleteTransaction={ handleDeleteTransaction } /> }
    </div>
  )
}

