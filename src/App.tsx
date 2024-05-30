import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
declare var bootstrap: any;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


function App() {

  const [StockPrice, setStockPrice] = useState({ "description": "", "icon": "", "name": "", "last_price": "", "price_diff": 0, "price_diff_perc": "", "last_close": 0, "ytd_prices": [], "ytd_labels": [], "revenues_labels": [], "revenues": [], "net_income_loss_labels": [], "net_income_loss": [] });
  const [Ticker, setTicker] = useState("");
  const [isTickerSearched, setIsTickerSearched] = useState(false)
  const [Status, setStatus] = useState("Search a symbol above");
  const [Modal, setModal] = useState(null);
  const [ModalTitle, setModalTitle] = useState("")

  var data = {
    labels: StockPrice.ytd_labels,
    datasets: [
      {
        fill: true,
        label: 'Price',
        data: StockPrice.ytd_prices,
        borderColor: '#6aa84f',
        backgroundColor: '#93c47d'
      },
    ],
  };

  var rev_data = {
    labels: StockPrice.revenues_labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: StockPrice.revenues,
        borderColor: '#ffe599',
        backgroundColor: '#ffe599'
      },
    ],
  };

  var income_data = {
    labels: StockPrice.net_income_loss_labels,
    datasets: [
      {
        fill: true,
        label: 'Net Income',
        data: StockPrice.net_income_loss,
        borderColor: '#ffe599',
        backgroundColor: '#ffe599'
      },
    ],
  };


  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: 'white',
          fontSize: 12,
        }
      },
      x: {
        ticks: {
          color: 'white',
          fontSize: 12,
        }
      },
    }
  };

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

  function expandModal(chart: any, modalTitle: string) {
    setModal(chart);
    setModalTitle(modalTitle);
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
    myModal.toggle();
  }

  return (
    <main>
      <div  className="container">
        <div className="row">
          <div className="col" id="MainContent" >

            <div className="input-group p-3">
              <div className="input-group-prepend">
                <div id="searchicon" className="input-group-text p-3 mb-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></div>
              </div>
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
                    {StockPrice.price_diff > 0 ? (<span id="badgex" className="badge text-bg-success">{StockPrice.price_diff} ({StockPrice.price_diff_perc}%)</span>) : (<span id="badgex" className="badge text-bg-danger">[{StockPrice.price_diff}] ({StockPrice.price_diff_perc}%)</span>)}</h2>
                  <h5 className="text-center">Last Close Price: ${StockPrice.last_close}</h5>
                </div>
                <div className="row p-3 mb-2 text-white">
                  <p>{StockPrice.description}</p>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div id="ChartCard" className="card">
                        <div className="card-body">
                          <button id="ExpandCard" type="button" className="btn btn-dark" onClick={() => expandModal(<Line options={options} data={data} />, "Price YTD")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707" />
                          </svg></button>
                          <h5 className="card-title">Price YTD</h5>
                          <div id="Chart">
                            <Line options={options} data={data} />
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="col">
                      <div id="ChartCard" className="card">
                        <div className="card-body">
                          <button id="ExpandCard" type="button" className="btn btn-dark" onClick={() => expandModal(<Bar options={options} data={rev_data} />, "Revenue")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707" />
                          </svg></button>
                          <h5 className="card-title">Revenue</h5>
                          <div id="Chart2">
                            <Bar options={options} data={rev_data} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      <div id="ChartCard" className="card">
                        <div className="card-body">
                          <button id="ExpandCard" type="button" className="btn btn-dark" onClick={() => expandModal(<Bar options={options} data={income_data} />, "Net Income/Loss")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707" />
                          </svg></button>
                          <h5 className="card-title">Net Income/Loss</h5>
                          <div id="Chart3">
                            <Bar options={options} data={income_data} />
                          </div>
                        </div>
                        <div id="myModal" className="modal" tabIndex={-1}>
                          <div className="modal-dialog modal-xl">
                            <div id="ChartModal" className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">{ModalTitle}</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <div id="Chart3">
                                  {Modal}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="col">
                      <div id="Chart2">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>{Status == "Loading..." ? (<div className="text-center p-3 mb-2 text-white">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              ) : (<div className="text-center p-3 mb-2 text-white">Enter a symbol above to start</div>)}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
