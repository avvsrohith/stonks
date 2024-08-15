import { Card, CardBody } from "reactstrap";
import SalesChart from "../../components/dashboard/SalesChart";
import StockChart from "../../components/stockpage/StockChart/StockChart";
import StockSearch from "../../components/stockpage/StockSearchbar/StockSearchbar";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import StockChart from '../components/StockChart';
// import StockInfo from '../components/StockInfo';
// import BuySellForm from '../components/BuySellForm';
import { getStockQuote, getCompanyProfile } from '../../api/finnhub'; // Assuming we're still using Finnhub for other data
// import './StockDetails.css';
import StocksCard from "../../components/stockpage/StockCard/StockCard";


const StocksPage=()=>{

    const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchStockData = async () => {
      try {
        const [quote, profile] = await Promise.all([
          getStockQuote(symbol),
          getCompanyProfile(symbol)
        ]);

        setStockData(quote);
        setCompanyProfile(profile);
        setError(null);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to fetch stock data. Please try again later.');
      }
    };

    fetchStockData();
  }, [symbol]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // if (!stockData || !companyProfile) {
  //   return <div>Loading...</div>;
  // }

    return (
        <div>
            {/* <Card>
                <CardBody> */}
                    <StocksCard symbol={symbol}/>
                {/* </CardBody>
            </Card> */}
        </div>
    )
}

export default StocksPage;