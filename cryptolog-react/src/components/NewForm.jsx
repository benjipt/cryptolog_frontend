import React, { Component } from 'react'

const baseURL = 'http://localhost:3003'

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
        console.log(event.currentTarget.id);
        console.log(event.currentTarget.value);
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
            transactionType: this.state.transactionType
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(resJson => {
            // Need to update this below
        this.props.handleAddHoliday(resJson)
        this.setState({
            coin: '',
            quantity: '',
            perUnitPrice: '',
            exchange: '',
            transactionDate: '',
            transactionType: ''
        })
        })
        .catch(error => console.log({ 'Error': error }))
    }

    render() {
        return (
            <div>
                <form>
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
                        <label className="btn btn-outline-primary me-2" htmlFor="transactionType">Buy</label>
                        <input onChange={ this.handleChange } type="radio" className="btn-check" name="transactionType" id="transactionType" value="buy" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="transactionType">Sell</label>
                        <input onChange={ this.handleChange } type="radio" className="btn-check" name="transactionType" id="transactionType" value="sell" autoComplete="off" />
                    </div>
                    <input type="submit" className="btn btn-lg btn-success" value="Add Transaction" />
                </form>
            </div>
        )
    }
}
