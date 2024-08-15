
import NetPriceChart from '../../graph/Graph/NetPriceChart';
import ComparisonBarChart from '../../graph/BarGraph/BarGraph';
import SharesPieChart from '../../graph/PieChart/PieChart';
import Modal from '../../graph/Modal/Modal';
import lineimg from '../../../assets/images/data/line-chart-icon.png';
import pieimg from '../../../assets/images/data/pie-chart-icon.png';
import barimg from '../../../assets/images/data/bar-chart-icon.png';
import { useState } from 'react';
import './DataDisplay.css';




const DataDisplay=(data)=>{

    data=data.data
    const [openModal, setOpenModal] = useState(null);

    const openModalHandler = (modalType) => () => {
        setOpenModal(modalType);
    };

    const closeModalHandler = () => {
        setOpenModal(null);
    };

    return (
        <div className="graphrow">
        <button className="graph-button" onClick={openModalHandler('analysis')}><img className='iconimg' src={lineimg} alt="Line Chart" />
        <span> Analysis Line Graph</span></button>
        <button className="graph-button" onClick={openModalHandler('profitLoss')}><img className='iconimg' src={barimg} alt="Bar Chart" /><span> Profit Loss Comparison</span></button>
        <button className="graph-button" onClick={openModalHandler('shares')}><img className='iconimg' src={pieimg} alt="Pie Chart" /><span> Share Distribution</span></button>

        <Modal isOpen={openModal === 'analysis'} onClose={closeModalHandler}>
            <h2>Analysis Line Graph:</h2>
            <NetPriceChart data={data} />
        </Modal>

        <Modal isOpen={openModal === 'profitLoss'} onClose={closeModalHandler}>
            <h2>Profit Loss Comparison Bar Chart</h2>
            <ComparisonBarChart data={data} />
        </Modal>

        <Modal isOpen={openModal === 'shares'} onClose={closeModalHandler}>
            <h2>Share Distribution Pie Chart</h2>
            <SharesPieChart data={data} />
        </Modal>
        </div>
    )
}

export default DataDisplay;