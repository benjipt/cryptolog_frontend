import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}

export default class NewForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            coin: '',
            quantity: '',
            perUnitPrice: '',
            exchange: '',
            transactionDate: '',
            transactionType: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
      }

    handleSubmit(event) {
    event.preventDefault()
    fetch(baseURL + '/transactions', {
        method: 'POST',
        body: JSON.stringify({
            coin: this.state.coin,
            quantity: this.state.quantity,
            perUnitPrice: this.state.perUnitPrice,
            exchange: this.state.exchange,
            transactionDate: this.state.transactionDate,
            transactionType: this.state.transactionType,
            userId: this.props.userId,
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(resJson => {
        this.props.handleAddTransaction(resJson)
        // Reset Form fields: https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        this.setState({
            coin: '',
            quantity: '',
            perUnitPrice: '',
            exchange: '',
            transactionDate: '',
            transactionType: '',
        })
        this.props.toggleNewForm()
        })
        .catch(error => console.log({ 'Error': error }))
    }

    render() {
        return (
            <div className="mt-3 text-start">
                <form onSubmit={ this.handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="coin" className="form-label">Coin</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" name="coin" id="coin" placeholder="BTC, ETH..." />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input onChange={ this.handleChange } type="number" step="any" className="form-control" name="quantity" id="quantity" placeholder="0.1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="perUnitPrice" className="form-label">Price per Unit</label>
                        <input onChange={ this.handleChange } type="number" step="0.01" className="form-control" name="perUnitPrice" id="perUnitPrice" placeholder="25.00" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exchange" className="form-label">Exchange Name</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" name="exchange" id="exchange" placeholder="Coinbase, Gemini, Kraken, Binance, etc..." />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
                        <input onChange={ this.handleChange } type="date" className="form-control" name="transactionDate" id="transactionDate" />
                    </div>
                    <div className="mb-3">
                        <label className="me-2" htmlFor="transactionType">Buy</label>
                        <input className="me-2" onChange={ this.handleChange } type="radio" name="transactionType" id="transactionType" value="Buy" />
                        <label className="me-2" htmlFor="transactionType">Sell</label>
                        <input onChange={ this.handleChange } type="radio" name="transactionType" id="transactionType" value="Sell" />
                    </div>
                    <div className="d-grid gap-2">
                        <input type="submit" className="btn btn-lg btn-success" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}
