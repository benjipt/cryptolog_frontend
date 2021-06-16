import React, { Component } from 'react'
import Moment from 'react-moment'

const baseURL = 'http://localhost:3003'

export default class Transactions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editTransaction: false,
            transaction: {}
        }

        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(event) {
        fetch(`${baseURL}/transactions/${event.target.id}`)
        .then(data => { return data.json()}, err => console.log(err))
        .then(parsedData => this.setState({
            editTransaction: !this.state.editTransaction,
            transaction: parsedData
        }), err => console.log(err))
    }

    render() {
        return (
            <div className="container mt-5">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Transaction Date</th>
                            <th>Transaction Type</th>
                            <th>Coin</th>
                            <th>Quantity</th>
                            <th>Price per Unit</th>
                            <th>Exchange</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.transactions.map(transaction => {
                            return (
                                <tr key={ transaction._id }>
                                    <td>
                                        <Moment format="MM/DD/YYYY">
                                        { transaction.transactionDate }
                                        </Moment>
                                    </td>
                                    <td>{ transaction.transactionType }</td>
                                    <td>{ transaction.coin }</td>
                                    <td>{ transaction.quantity.$numberDecimal }</td>
                                    <td>{ transaction.perUnitPrice.$numberDecimal }</td>
                                    <td>{ transaction.exchange }</td>
                                    <td><button onClick={ this.handleEdit } id={ transaction._id } className="btn btn-outline-secondary btn-sm">EDIT</button></td>
                                    <td><button id={ transaction._id } className="btn btn-outline-danger btn-sm">DELETE</button></td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table>
            </div>
        )
    }
}
