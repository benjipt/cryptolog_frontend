import React, { Component } from 'react'

export default class NewForm extends Component {

    render() {
        return (
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="coin" className="form-label">Coin</label>
                        <input type="text" className="form-control" name="coin" id="coin" placeholder="BTC, ETH..." />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" step="any" className="form-control" name="quantity" id="quantity" placeholder="0.1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="perUnitPrice" className="form-label">Price per Unit</label>
                        <input type="number" step="0.01" className="form-control" name="perUnitPrice" id="perUnitPrice" placeholder="25.00"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exchange" className="form-label">Exchange Name</label>
                        <input type="text" className="form-control" name="exchange" id="exchange" placeholder="Coinbase, Gemini, Kraken, Binance, etc..." />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
                        <input type="date" className="form-control" name="transactionDate" id="transactionDate" />
                    </div>
                    <div className="mb-3">
                        <label className="btn btn-outline-primary me-2" for="transactionType">Buy</label>
                        <input type="radio" className="btn-check" name="transactionType" id="transactionType" value="buy" />
                        <label className="btn btn-outline-primary" for="transactionType">Sell</label>
                        <input type="radio" className="btn-check" name="transactionType" id="transactionType" value="sell" />
                    </div>
                    <input type="submit" className="btn btn-lg btn-success" value="Add Transaction" />
                </form>
            </div>
        )
    }
}
