import { useState } from "react";

function App() {

  const [StockPrice, setStockPrice] = useState({ "description": "", "icon": "", "name": "", "last_price": "", "price_diff": 0, "price_diff_perc": "", "last_close": 0});
  const [Ticker, setTicker] = useState("");
  const [isTickerSearched, setIsTickerSearched] = useState(false)
  const [Status, setStatus] = useState("Search a symbol above");

  function GetTicker() {
    setIsTickerSearched(false);
    setStatus("Loading...")
    fetch("https://794kdtq270.execute-api.us-east-1.amazonaws.com/prod/ticker/" + Ticker).then(response => response.json())
      .then(function (data) {
        setStockPrice(data);
        setIsTickerSearched(true)
      })
  }

  function handleTest(e: any) {
    if (e.key == "Enter" || e.type == "click") {
      setIsTickerSearched(false);
      e.preventDefault();
      GetTicker();
      console.log(e);
    }
  }

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col">

            <div className="input-group p-3">
              <input className="form-control p-3 mb-2 text-white" id="Ticker" placeholder="Stock" onKeyDown={handleTest} onInput={e => setTicker((e.target as HTMLInputElement).value)} />
              <div className="input-group-append">
                <button id="searchButton" className="btn bg-dark text-white form-control p-3" type="button" onClick={handleTest} >Search</button>
              </div>
            </div>

            {isTickerSearched == true ? (
              <div id="MainWindow" className="row p-3 mb-2 text-white">
                <div className="text-center p-3 mb-2 text-white">
                  <h1 ><img className="img" id="Bullicon" src={StockPrice.icon} /> {StockPrice.name}</h1>

                  <h2 className="text-center">${StockPrice.last_price} 
                    {StockPrice.price_diff > 0 ? ( <span id="badgex" className="badge text-bg-success">{StockPrice.price_diff} ({StockPrice.price_diff_perc}%)</span>) : (<span id="badgex" className="badge text-bg-danger">[{StockPrice.price_diff}] ({StockPrice.price_diff_perc}%)</span>)}</h2>
                  <h5 className="text-center">Last Close Price: ${StockPrice.last_close}</h5>
                </div>
                <div className="row p-3 mb-2 text-white">
                  <h3>Description</h3>
                  <p>{StockPrice.description}</p>
                </div>
              </div>
            ) : (
              <div className="text-center p-3 mb-2 text-white">{Status}</div>
            )}
          </div>
        </div>
      </div>

    </main>
  );
}

export default App;
