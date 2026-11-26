import { useState, useEffect, useRef } from "react"
import { Sketch } from "./p5/Sketch.jsx";

export default function Weather() {


    const [ city, setCity ] = useState("");
    const [ weatherData, setWeatherData ] = useState();
    const [ locations, setLocations ] = useState([]);
    const elemRef = useRef(null);

    useEffect(() => {

        getLocation();
    }, []);

    function displayData() {

        return (
            <div className="weather-params">  
                <div className="weather-param-section">
                    <p>current temperature: </p>
                    <p> {weatherData.temp}</p>
                </div>
                <div className="weather-param-section">
                    <p>cloudiness: </p>
                    <p> {weatherData.clouds}</p>
                </div>
                <div className="weather-param-section">
                    <p>wind speed: </p>
                    <p> {weatherData.wind.speed}</p>
                </div>
                <div className="weather-param-section">
                    <p>wind degrees: </p>
                    <p> {weatherData.wind.deg}</p>
                </div>
                
                <div className="weather-param-section">
                    <p>rain: </p>
                    <p> {weatherData.rain ? weatherData.rain: "---"}</p>
                </div>
                
                
                <div className="weather-param-section">
                    <p>snow: </p>
                    <p>
                        {weatherData.snow ? weatherData.snow : "---"}
                    </p>
                </div>

                <div className="weather-param-section">
                    <p>current time: </p>
                    <p> {weatherData.currtime.toISOString()}</p>
                </div>
                <div className="weather-param-section">
                    <p>sunrise: </p>
                    <p> {weatherData.sunrise.toISOString()}</p>
                </div>
                <div className="weather-param-section">
                    <p>sunset: </p>
                    <p> {weatherData.sunset.toISOString()}</p>
                </div>
                
                
            </div>
        )

    }

    async function getLocation() {

        let res = await fetch("/api/weather/locations");
        const data = await res.json();
        console.log("testing locations api");

        const orderedLoc = data.data.sort((a, b) =>
            a.capital.localeCompare(b.capital)
        );
        
        setLocations(orderedLoc);
    }

    async function getWeatherData(selCity) {

        console.log("testing selection");
        console.log(selCity);
        const coordinatesResponse = await fetch(`/api/weather/coordinates/${selCity}`);
        const coordinatesData = await coordinatesResponse.json();
        const {lat, lon} = {
            lat: coordinatesData.data[0].lat,
            lon: coordinatesData.data[0].lon
        }

        
        const resWeather = await fetch(`/api/weather/data/${lat}/${lon}`)
        const resWeatherJson = await resWeather.json();
        const resWeatherData = resWeatherJson.data;
        console.log("testing fetching weather data")
        console.log(resWeatherData);
        resWeatherData.main.temp -= 273.15;
        resWeatherData.main.temp = Math.round(resWeatherData.main.temp)

        

        const filteredData = {
            temp: resWeatherData.main.temp,
            clouds: resWeatherData.clouds.all,
            wind: {
                speed: resWeatherData.wind.speed,
                deg: resWeatherData.wind.deg
            },
            currtime: getLocalTime(resWeatherData.timezone),
            sunrise: new Date(resWeatherData.sys.sunrise * 1000),
            sunset: new Date(resWeatherData.sys.sunset * 1000)
        }

        filteredData.rain = resWeatherData.rain ? resWeatherData.rain["1h"] : null;
        filteredData.snow = resWeatherData.snow ? resWeatherData.snow["1h"] : null;

        console.log("filtered data: ")
        console.log(filteredData);


        setWeatherData(filteredData);
    }

    function getLocalTime(timezone) {
        const utc = Date.now();

        const localTime = new Date(
            utc + timezone * 1000
        );
        return localTime;
    }

    return (
        <div className = "weather-page">
            <p>Testing Weather</p>
            
            <select 
                name="locations" 
                id="locations-select"
                onChange={async (e) => {

                        let sel = e.target.value;
                        setCity(sel); 
                        await getWeatherData(sel);
                    }                    
                        
                }
            >
            <option value="">--Select a location--</option>
            {locations && locations.map((l, index) => {
                if (l.capital) {
                    return <option key={index} value={l.capital}>{l.capital}, {l.name}</option>
                }
            })}
            </select>
            {weatherData && displayData()}
            <Sketch />
        </div>
    )
}