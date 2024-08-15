
import React, { useState } from 'react';
import './BuySellForm.css';
import axios from 'axios';

function BuySellForm({ symbol, currentPrice }) {
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState('buy');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = 'http://localhost:8080/api/ownings/buy';

    const input = {
      symbol,
      date: new Date().toISOString(), 
      volume: Number(quantity),                
      buyPrice: parseFloat(currentPrice),
      sellPrice: parseFloat(currentPrice),
      stockid: symbol
    };
  
    try {
      // Use await to handle the asynchronous axios request
      const response = await axios.post(url, input);
  
      // Log the response for debugging purposes
      console.log('Response:', response.data);
  
      // Implement buy/sell logic here
      console.log(`${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${symbol} at $${currentPrice}`);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="buy-sell-form">
      <h2 className='charttitle'>Buy or Sell Stocks</h2>
      <div className='rowform'>
        <label htmlFor="quantity" className='leftform'>Quantity:</label>
        <input
        className='inpform'
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          max={10}
        />
      </div>
      <div className='rowform'>
        <label htmlFor="action" className='leftform'>Action:</label>
        <select  className="inpform" id="action" value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <p className='total'>Total: ${(quantity * currentPrice).toFixed(2)}</p>
      <button type="submit" className='buybtn'>{action === 'buy' ? 'Buy' : 'Sell'}</button>
    </form>
  );
}

export default BuySellForm;