import { Container, Row,Col,Card,CardBody } from "reactstrap"
import BuySellForm from "../../components/stockpage/BuySellForm/BuySellForm"
import OwnedStock from "../../components/stockpage/OwnedStock/OwnedStock";
import DataDisplay from "../../components/stockpage/DataDisplay/DataDisplay";
import { fetchData, deleteStock } from "../../api/api";
import { useEffect, useState } from "react";



const stockList=[          //dummy data
    {
        symbol: "AMZN",
        volume: "2",
        buyPrice: "172.26",

    },
    {
        symbol: "AAPL",
        volume: "2",
        buyPrice: "172.26",
        
    },
    {
        symbol: "GOOGL",
        volume: "2",
        buyPrice: "172.26",
        
    },
    {
        symbol: "GOOGL",
        volume: "2",
        buyPrice: "172.26",
        
    },
    {
        symbol: "GOOGL",
        volume: "2",
        buyPrice: "172.26",
    }
]

const calculateTotalBuyValue = stockList.reduce((acc, item) => acc + (item.buyPrice * item.volume),0);


const MyStocksPage=()=>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                // const result = await fetchData();
                // setData(result);                  // Commented out to use the dummy data
                setData(stockList);                  
                
            }
            catch(error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        getData();

    }, []);

    // Function to handle row deletion
    const handleDelete = async(index) => {
      try{
        const newData = await deleteStock(index);
        const res = await fetchData();
        setData(res);
      }
      catch{
        setError(error.message);
      }
  };

  const alterData = (newData)=>{
    data=newData;
  }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Card >
        <CardBody >
          <h4 className="totalstocks" >Total Stock Value: ${calculateTotalBuyValue}</h4>
          <DataDisplay data={data}/>
        </CardBody>
      </Card>
            <div className="grid-container">
            {data.map((stock, index) => (
              <OwnedStock stock={stock} alter={alterData}/>
            ))}
                  </div>
        </div>
    )
}

export default MyStocksPage;