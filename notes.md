# Project 3 - Benjamin, Benji, Mitch

## Crypto Transaction Log

### MVP
User Stories:
- Users can add purchase transactions of their respective currency unit at a specific price and time.
- Users can add sell transactions and add the sell price at a specific price and time.
- Users can update and delete any previously added transactions.

Stretch Features:
- User can see their current holdings as a reflection of previous transactions.
- User can see the tax burden of transaction based on short-term vs. long-term capital gains (1 year).

Models:
- Users
    - Username (email): String | (email?)
    - Password: String

- Transactions
    - Coin: String (btc, eth)
    - Exchange: String
    - TransactionType: String (buy/sell)
    - Quantity: Float or Number (0.3)
    - perUnitPrice: Float or Number (250.00)
    - transactionDate: Date

All are required: true