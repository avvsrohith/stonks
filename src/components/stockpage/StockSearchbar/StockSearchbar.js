import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StockSearchbar.css';

function StockSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/stocks?symbol=${searchTerm.trim().toUpperCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stock-search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter stock symbol"
        className="stock-search-input"
      />
      <button type="submit" className="stock-search-button">Search</button>
    </form>
  );
}

export default StockSearch;