import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


function App() {

  const [StockPrice, setStockPrice] = useState(0);
  const [Ticker, setTicker] = useState("");

  function GetTicker() {
      setStockPrice("Loading...");
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
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <input className="form-control" id="Ticker" placeholder="Stock" onKeyDown={handleTest} onInput={e=> setTicker(e.target.value)} />
        </div>
      </form>


      <div className="card text-center">
        <h1 >{Ticker}</h1>
         Last Closing Price: {StockPrice}
      </div>

    </main>
  );
}

export default App;
