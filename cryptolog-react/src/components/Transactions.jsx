import React, { Component } from 'react'

export default class Transactions extends Component {
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
                                    <td>{ transaction.transactionDate }</td>
                                    <td>{ transaction.transactionType }</td>
                                    <td>{ transaction.coin }</td>
                                    <td>{ transaction.quantity.$numberDecimal }</td>
                                    <td>{ transaction.perUnitPrice.$numberDecimal }</td>
                                    <td>{ transaction.exchange }</td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table>
            </div>
        )
    }
}
