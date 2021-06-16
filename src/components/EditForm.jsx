import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://cryptolog-api.herokuapp.com';
}

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
        this.handleUpdateTransaction = this.handleUpdateTransaction.bind(this)
    }

    componentDidMount(){
        this.setState({
            coin: this.props.transaction.coin,
            quantity: this.props.transaction.quantity.$numberDecimal,
            perUnitPrice: this.props.transaction.perUnitPrice.$numberDecimal,
            exchange: this.props.transaction.exchange,
            transactionDate: this.props.transaction.transactionDate,
            transactionType: this.props.transaction.transactionType
        })
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
      }

    handleUpdateTransaction(event) {
        fetch(`${baseURL}/transactions/${this.props.transaction._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            coin: this.state.coin,
            quantity: this.state.quantity,
            perUnitPrice: this.state.perUnitPrice,
            exchange: this.state.exchange,
            transactionDate: this.state.transactionDate,
            transactionType: this.state.transactionType
            })
        })
        .then(res => res.json())
        .then(resJson => {
        console.log(resJson);
        })
    }


    render() {
        return (
            <div className="mt-3">
                <form onSubmit={this.handleUpdateTransaction} >
                    <div className="mb-3">
                        <label htmlFor="coin" className="form-label">Coin</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" name="coin" id="coin" value={ this.state.coin } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input onChange={ this.handleChange } type="number" step="any" className="form-control" name="quantity" id="quantity" value={ this.state.quantity }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="perUnitPrice" className="form-label">Price per Unit</label>
                        <input onChange={ this.handleChange } type="number" step="0.01" className="form-control" name="perUnitPrice" id="perUnitPrice" value={ this.state.perUnitPrice }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exchange" className="form-label">Exchange Name</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" name="exchange" id="exchange" value={ this.state.exchange } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
                        <input onChange={ this.handleChange } type="date" className="form-control" name="transactionDate" id="transactionDate" />
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
