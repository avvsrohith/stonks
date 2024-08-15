import StockInfo from "../StockInfo/StockInfo";
import StockSearch from "../StockSearchbar/StockSearchbar";
import { Card } from "reactstrap";
import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getStockQuote } from "../../../api/finnhub";
import { getCompanyProfile } from "../../../api/finnhub";
import StockChart from "../StockChart/StockChart";
import BuySellForm from "../BuySellForm/BuySellForm";
import {Row,Col} from "reactstrap";


const StockCard = () => {

  const [stockData, setStockData] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const symbol= searchParams.get('symbol')
  

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const [quote, profile] = await Promise.all([
          getStockQuote(symbol),
          getCompanyProfile(symbol)
        ]);

        setStockData(quote);
        console.log(profile);
        
        
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

  if (!stockData || !companyProfile) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <StockSearch className="searchcont"></StockSearch>
      {symbol && stockData && companyProfile && 
        <div>
          <StockInfo data={stockData} profile={symbol} ></StockInfo>
          <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
        <StockChart className="chart" symbol={symbol}></StockChart>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
        <BuySellForm className="form" symbol={symbol} currentPrice={stockData.c.toFixed(2)}></BuySellForm>
        </Col>
      </Row>
          </div>
        }
      

    </div>
  );
}

export default StockCard;