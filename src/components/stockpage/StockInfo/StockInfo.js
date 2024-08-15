import { Card } from "reactstrap"
import './StockInfo.css'

const StockInfo=({data,symbol})=>{


    
    return (
        <Card>
        <div className="stock-card">
          <div className="info">
            <div className="cardcol">
              <div className="title">
                {symbol}
              </div>
              <div className="smoltxt">
                Current price
              </div>
              <div className="currenttxt">
              ${data.c.toFixed(2)}
              </div>
              <p className="smoltxt">
                ${data.d.toFixed(2)} ⬆️
              </p>
            </div>
            <div className="cardcol">
              <div className="smoltxt">
                {/* {profile.name} */}
                High
              </div>
              <div className="moneytxt">
                ${data.h.toFixed(2)}
              </div>
              <div className="whitedivider" />
              <div className="smoltxt">
                Low
              </div>
              <div className="moneytxt">
              ${data.h.toFixed(2)}
              </div>
            </div>
            <div className="cardcol">
              <div className="smoltxt">
                {/* {profile.name} */}
                Open
              </div>
              <div className="moneytxt">
                ${data.o.toFixed(2)}
              </div>
              <div className="whitedivider" />

              <div className="smoltxt">
                Previous close
              </div>
              <div className="moneytxt">
              ${data.pc.toFixed(2)}
              </div>
            </div>

          </div>
        </div>
      </Card>
    )
}

export default StockInfo;