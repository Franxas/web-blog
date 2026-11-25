import { useState, useEffect } from "react"

export default function Weather() {


    const [ city, setCity ] = useState("");
    const [ weatherData, setWeatherData ] = useState({});
    const [ locations, setLocations ] = useState([]);

    useEffect(() => {

        getLocation();
    }, []);

    async function getLocation() {

        let res = await fetch("/api/weather/locations");
        const data = await res.json();
        console.log("testing locations api");
        console.log(data.data);
        setLocations(data.data);
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
        console.log(lat);
        console.log(lon);

        // TODO -> Finish this get weather data logic
        const weatherRes = await fetch(`/api/weather/data/${lat}/${lon}`)
        const weatherJson = await weatherRes.json();
        const weatherData = weatherJson.data;
        console.log("testing fetching weather data")
        console.log(weatherData);

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

            

        </div>
    )
}