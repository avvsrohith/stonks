import React, { useState,useEffect } from "react";
import { Card,Button } from "reactstrap";
import { getStockQuote,getCompanyProfile } from "../../../api/finnhub";
import "./OwnedStock.css";
import { deleteStock,fetchData } from "../../../api/api";

const OwnedStock = ({stock,alterData}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentPrice,setCurrentPrice] = useState(stock.buyprice)
  const [error, setError] = useState(null);
  const [data,setData] = useState(null);


  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const [quote, profile] = await Promise.all([
          getStockQuote(stock.symbol),
          getCompanyProfile(stock.symbol)
        ]);

        setCurrentPrice(quote.c);
        console.log(stock);
        
        
        setError(null);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to fetch stock data. Please try again later.');
      }
    };

    fetchStockData();
  }, [stock]);

  const handleDelete = async(index) => {
    try{
      const newData = await deleteStock(index);
      const res = await fetchData();
      alterData(res);
    }
    catch(error){
      setError(error.message);
    }
};

  stock = stock.stock;
  return (
    <Card className="stockCard">
      <div className="stockContainer">
        <div className="stockName">{stock.symbol}</div>
        <div className="rowflex">
          <div className="leftflex">Quantity</div>
          <div className="rightflex">{stock.volume}</div>
        </div>
        <div className="horizontalDivider" />
        <div className="rowflex">
          <div className="leftflex">Buy Price</div>
          <div className="rightflex">${stock.buyPrice}</div>
        </div>
        <div className="horizontalDivider" />

        <div className="rowflex">
          <div className="leftflex">Buy Value</div>
          <div className="rightflex">${stock.buyPrice * stock.volume}</div>
        </div>
        <div className="horizontalDivider" />

        <div className="rowflex">
          <div className="leftflex">Current Price</div>
          <div className="rightflex">{currentPrice}</div>
        </div>

        <div className="rowflex">
          <label className="leftflex">Sell:</label>
          <input
            type="number"
            id="quantity"
            className="selector"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            max={stock.volume}
          />
        </div>

        <div className="rowflex">
        <Button className="sellbtn" color="success" onClick={handleDelete}>
        Sell for ${((currentPrice-stock.buyPrice) * quantity).toFixed(2)} profit
                </Button>
                
        </div>
      </div>
    </Card>
  );
};

export default OwnedStock;
