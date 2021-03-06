import React, { useEffect } from 'react'
import { format } from 'date-fns'

export default function Transactions({ getTransactions, userId, transactions, handleEditTransaction, handleDeleteTransaction }) {

    useEffect(() => {
        getTransactions(userId)
    }, [transactions, userId, getTransactions])

    return (
        <div className="container mt-5">
            <table className="table table-borderless transactionList">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Coin</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Exchange</th>
                    </tr>
                </thead>
                <tbody>
                    { transactions.map(transaction => {
                        // Uses date-fns to convert transaction.transactionDate from ISO to readable format
                        const formattedDate = format(new Date(transaction.transactionDate), 'MM-dd-yyyy')
                        return (
                            <tr key={ transaction._id }>
                                <td>
                                    { formattedDate }
                                </td>
                                <td>{ transaction.transactionType }</td>
                                <td>{ transaction.coin }</td>
                                <td>{ transaction.quantity.$numberDecimal }</td>
                                <td>{ transaction.perUnitPrice.$numberDecimal }</td>
                                <td>{ transaction.exchange }</td>
                                <td><button 
                                    onClick={ handleEditTransaction }
                                    id={ transaction._id } 
                                    className="btn btn-outline-secondary btn-sm">EDIT</button></td>
                                <td><button 
                                    onClick={ handleDeleteTransaction }
                                    id={ transaction._id } 
                                    className="btn btn-outline-danger btn-sm">DELETE</button></td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}
