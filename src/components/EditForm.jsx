import React, { useState } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}

export default function EditForm({ transaction, toggleEditForm,  }) {
    // STATE HOOKS
    const [ inputValue, setInputValue ] = useState({
        coin: transaction.coin,
        quantity: transaction.quantity.$numberDecimal,
        perUnitPrice: transaction.perUnitPrice.$numberDecimal,
        exchange: transaction.exchange,
        transactionDate: transaction.transactionDate,
        transactionType: transaction.transactionType
    })

    const handleChange = e => {
        const { id, value } = e.currentTarget
        setInputValue({
            ...inputValue,
            [id]: value
        })
      }

    const handleUpdateTransaction = e => {
        e.preventDefault()
        fetch(`${baseURL}/transactions/${transaction._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coin: inputValue.coin,
                quantity: inputValue.quantity,
                perUnitPrice: inputValue.perUnitPrice,
                exchange: inputValue.exchange,
                transactionDate: inputValue.transactionDate,
                transactionType: inputValue.transactionType
            })
        })
        // Refactor this ->
        .then(res => res.json())
        .then(resJson => {
        toggleEditForm()
        })
        // <- Refactor this
    }

    return (
        <div className="mt-3 text-start">
            <div className="d-grid gap-2 mt-4 mb-2">
                <button className="btn btn-lg btn-secondary" onClick={ toggleEditForm } >Back</button>
            </div>
            <form onSubmit={ handleUpdateTransaction } >
                <div className="mb-3">
                    <label htmlFor="coin" className="form-label">Coin</label>
                    <input onChange={ handleChange } type="text" className="form-control" name="coin" id="coin" value={ inputValue.coin } />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input onChange={ handleChange } type="number" step="any" className="form-control" name="quantity" id="quantity" value={ inputValue.quantity }/>
                </div>
                <div className="mb-3">
                    <label htmlFor="perUnitPrice" className="form-label">Price per Unit</label>
                    <input onChange={ handleChange } type="number" step="0.01" className="form-control" name="perUnitPrice" id="perUnitPrice" value={ inputValue.perUnitPrice }/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exchange" className="form-label">Exchange Name</label>
                    <input onChange={ handleChange } type="text" className="form-control" name="exchange" id="exchange" value={ inputValue.exchange } />
                </div>
                <div className="mb-3">
                    <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
                    <input onChange={ handleChange } type="date" className="form-control" name="transactionDate" id="transactionDate" />
                </div>
                <div className="mb-3">
                    <label className="me-2" htmlFor="transactionType">Buy</label>
                    <input className="me-2" onChange={ handleChange } type="radio" name="transactionType" id="transactionType" value="buy" />
                    <label className="me-2" htmlFor="transactionType">Sell</label>
                    <input onChange={ handleChange } type="radio" name="transactionType" id="transactionType" value="sell" />
                </div>
                <div className="d-grid gap-2">
                    <input type="submit" className="btn btn-lg btn-success " value="Update Transaction" />
                </div>
            </form>
        </div>
    )
}
