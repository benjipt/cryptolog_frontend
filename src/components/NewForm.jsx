import React, { useState } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}

export default function NewForm({ userId, handleAddTransaction, toggleNewForm }) {
    // STATE HOOKS
    const [ inputValue, setInputValue ] = useState({
        coin: '',
        quantity: '',
        perUnitPrice: '',
        exchange: '',
        transactionDate: '',
        transactionType: ''
    })

    const handleChange = e => {
        const { id, value } = e.currentTarget
        setInputValue({
            ...inputValue,
            [id]: value
        })
      }

    const handleSubmit = e => {
    e.preventDefault()
    const { coin, quantity, perUnitPrice, exchange, transactionDate, transactionType } = inputValue
    fetch(baseURL + '/transactions', {
        method: 'POST',
        body: JSON.stringify({
            coin,
            quantity,
            perUnitPrice,
            exchange,
            transactionDate,
            transactionType,
            userId
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(resJson => {
        handleAddTransaction(resJson)
        // Reset Form fields: https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        // After changing format of form via datepicker and radio buttons -> can update to a react controlled form, and the above will not be needed.
        setInputValue({
            coin: '',
            quantity: '',
            perUnitPrice: '',
            exchange: '',
            transactionDate: '',
            transactionType: '',
        })
        toggleNewForm()
        })
        .catch(error => console.log({ 'Error': error }))
    }

    return (
        <div className="mt-3 text-start">
            <form onSubmit={ handleSubmit }>
                <div className="mb-3">
                    <label htmlFor="coin" className="form-label">Coin</label>
                    <input onChange={ handleChange } type="text" className="form-control" name="coin" id="coin" placeholder="BTC, ETH..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input onChange={ handleChange } type="number" step="any" className="form-control" name="quantity" id="quantity" placeholder="0.1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="perUnitPrice" className="form-label">Price per Unit</label>
                    <input onChange={ handleChange } type="number" step="0.01" className="form-control" name="perUnitPrice" id="perUnitPrice" placeholder="25.00" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exchange" className="form-label">Exchange Name</label>
                    <input onChange={ handleChange } type="text" className="form-control" name="exchange" id="exchange" placeholder="Coinbase, Gemini, Kraken, Binance, etc..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
                    <input onChange={ handleChange } type="date" className="form-control" name="transactionDate" id="transactionDate" />
                </div>
                <div className="mb-3">
                    <label className="me-2" htmlFor="transactionType">Buy</label>
                    <input className="me-2" onChange={ handleChange } type="radio" name="transactionType" id="transactionType" value="Buy" />
                    <label className="me-2" htmlFor="transactionType">Sell</label>
                    <input onChange={ handleChange } type="radio" name="transactionType" id="transactionType" value="Sell" />
                </div>
                <div className="d-grid gap-2">
                    <input type="submit" className="btn btn-lg btn-success" value="Submit" />
                </div>
            </form>
        </div>
    )
}
