import hot_bg from './assets/Hot.jpg'
import cold_bg from './assets/Cold.jpg'
import Descriptions from './components/Descriptions';


function App() {
  return (
    <div className="App" style={{ backgroundImage: `url{${cold_bg}}` }}>


      <div className="overlay">

        <div className="container">

          <div className="section section__input">

            <input type="text" className="Zip" placeholder="Enter Your zip code..." />
            <button>°C</button>
            <button>°F</button>

          </div>

          <div className="section section__temp">

            <div className="icon">

              <h3>Brakpan, ZA</h3>
              <img src="" alt="weather icon that displays the current weather" />
              <h3>Light Rain</h3>

            </div>
            <div className="temp">
              <h1>14°C</h1>
            </div>

          </div>
          {/*bottom discription*/}
          <Descriptions />
        </div>

      </div>


    </div>

  );
}

export default App;
