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
                        <tr>
                            <td>6/15/21</td>
                            <td>Buy</td>
                            <td>BTC</td>
                            <td>0.05</td>
                            <td>$37500</td>
                            <td>Kraken</td>
                        </tr>
                        <tr>
                            <td>6/14/21</td>
                            <td>Sell</td>
                            <td>ETH</td>
                            <td>3.6</td>
                            <td>$1450</td>
                            <td>Gemini</td>
                        </tr>
                        <tr>
                            <td>6/13/21</td>
                            <td>Buy</td>
                            <td>DOGE</td>
                            <td>65.6</td>
                            <td>$0.80</td>
                            <td>Binance</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
