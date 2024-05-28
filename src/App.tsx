import { useState } from "react";

function App() {

  const [StockPrice, setStockPrice] = useState({"description": "", "icon": "", "name": "", "last_price": ""});
  const [Ticker, setTicker] = useState("");

  function GetTicker() {
    setStockPrice({"description": "Loading...", "icon": "Loading", "name": "Loading...", "last_price": "Loading..."});
    fetch("https://794kdtq270.execute-api.us-east-1.amazonaws.com/prod/ticker/" + Ticker).then(response => response.json())
      .then(data => setStockPrice(data))
  }

  function handleTest(e: any) {
    if (e.key == "Enter") {
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

            <div className="input-group">
            <input className="form-control p-3 mb-2 bg-dark text-white" id="Ticker" placeholder="Stock" onKeyDown={handleTest} onInput={e => setTicker((e.target as HTMLInputElement).value)} />
                <div className="input-group-append">
                  <button id="searchButton" className="btn bg-dark text-white form-control p-3 mb-2" type="button">Search</button>
                </div>
            </div>

          <div className="row p-3 mb-2 bg-dark text-white">
            <div className="text-center p-3 mb-2 bg-dark text-white">
              <h1 ><img className="img" id="Bullicon" src={StockPrice.icon}  /> {StockPrice.name}</h1>
              <h2 className="text-center">${StockPrice.last_price}</h2>
            </div>


          </div>
          <div className="row p-3 mb-2 bg-dark text-white ">
            <h3>Description</h3> <p>{StockPrice.description}</p>

          </div>

        </div>
      </div>
      </div>

    </main>
  );
}

export default App;
