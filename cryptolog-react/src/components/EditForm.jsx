import React, { Component } from 'react'
import Moment from 'react-moment'

export default class EditForm extends Component {
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

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
      }

    render() {
        return (
            <div className="mt-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="coin" className="form-label">Coin</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" name="coin" id="coin" value={ this.props.transaction.coin } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input onChange={ this.handleChange } type="number" step="any" className="form-control" name="quantity" id="quantity" value={ this.props.transaction.quantity.$numberDecimal }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="perUnitPrice" className="form-label">Price per Unit</label>
                        <input onChange={ this.handleChange } type="number" step="0.01" className="form-control" name="perUnitPrice" id="perUnitPrice" value={ this.props.transaction.perUnitPrice.$numberDecimal }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exchange" className="form-label">Exchange Name</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" name="exchange" id="exchange" value={ this.props.exchange } value={ this.props.transaction.exchange } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
                        <input onChange={ this.handleChange } type="date" className="form-control" name="transactionDate" id="transactionDate" value={ this.props.transaction.transactionDate } />
                    </div>
                    <div className="mb-3">
                        <label className="me-2" htmlFor="transactionType">Buy</label>
                        <input className="me-2" onChange={ this.handleChange } type="radio" name="transactionType" id="transactionType" value="buy" />
                        <label className="me-2" htmlFor="transactionType">Sell</label>
                        <input onChange={ this.handleChange } type="radio" name="transactionType" id="transactionType" value="sell" />
                    </div>
                    <input type="submit" className="btn btn-lg btn-success" value="Update Transaction" />
                </form>
            </div>
        )
    }
}
