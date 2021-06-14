import React, { Component } from 'react'

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
    }

    handleChange(event) {
        console.log(event.currentTarget.id)
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
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
                    <div>
                        <label htmlFor="transactionType">Buy</label>
                        <input onChange={ this.handleChange } type="radio" name="transactionType" id="transactionType" value="buy" autoComplete="off" />

                        <label htmlFor="transactionType">Sell</label>
                        <input onChange={ this.handleChange } type="radio" name="transactionType" id="transactionType" value="sell" autoComplete="off" />
                    </div>
                    <input type="submit" className="btn btn-lg btn-success" value="Add Transaction" />
                </form>
            </div>
        )
    }
}
