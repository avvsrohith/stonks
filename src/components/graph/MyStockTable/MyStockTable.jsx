import './MyStockTable.css';
import React from 'react';


const MyStockTable = ({ data, onDelete }) => {
    // console.log('On delete:',onDelete); 
    const getProfitLossClass = (value) => {
        if (value > 0) {
            return 'profit'; // Profit
        } else if (value < 0) {
            return 'loss'; // Loss
        }
        return 'neutral'; // Neutral
    };

    console.log(data);


    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Volume</th>
                        <th>Amount</th>
                        <th>Total Value</th>
                        <th>Profit or Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        const totalBuyValue = item.buyPrice * item.volume;
                        const totalActualValue = item.sellPrice * item.volume;
                        const profitOrLoss = totalActualValue - totalBuyValue;

                        return (
                            <tr key={item.id}>
                                <td>{item.symbol}</td>
                                <td>{item.volume}</td>
                                <td>{item.buyPrice}</td>
                                <td>{totalBuyValue}</td>
                                <td id='lp' className={getProfitLossClass(profitOrLoss)}>
                                    {profitOrLoss.toFixed(2)}
                                    <br/>
                                    <button onClick={() => onDelete(item.id)} aria-label={`Sell ${item.symbol}`}>
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MyStockTable;
