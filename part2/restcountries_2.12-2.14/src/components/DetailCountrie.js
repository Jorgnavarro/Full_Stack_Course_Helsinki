import axios from "axios";
import { useEffect, useState } from "react";
import { getId } from "../utils/getId";

/**
 * 
 * @param countrie Receives the object with the country information brought from the country Rest API. 
 * @returns A card with the details of the two APIS, weather and Rest countries.
 */
export function DetailCountrie({ countrie }) {
    console.log(countrie);
    const api_key = process.env.REACT_APP_API_WEATHER
    const languagesArr = Object.values(countrie.languages);
    console.log(languagesArr);
    const [dataWheater, setDataWheater] = useState({})
    console.log(dataWheater);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countrie.name.common}`)
            .then(response => {
                setDataWheater(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data: ", error);
                setLoading(false);
            })
    }, [api_key, countrie.name.common])
    console.log(loading);
    return (
        <div className="container m-2 row justify-content-center">
            <div className="card " id="card-countrie" style={{ width: "18rem" }}>
                <img src={countrie.flags.png} className="card-img-top" alt="Countrie Flag" id="img-card" />
                <div className="card-body">
                    <h5 className="card-title">{countrie.name.common}</h5>
                    <p className="card-text">Capital: {countrie.capital} </p>
                    <p className="card-text">Population: {countrie.population}</p>
                    <h6>Languages</h6>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        languagesArr.map((language) => {
                            return <li key={getId()} className="list-group-item">{language}</li>
                        })
                    }
                </ul>
                <div className="card-body">
                    <h5 className="card-title">
                        Weather in {countrie.capital}
                    </h5>
                    {loading ? 
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :<>
                            <p className="card-text">Temperature: {dataWheater?.current?.temperature} Celcius</p>
                            <img src={dataWheater?.current?.weather_icons[0]} alt="Weather Icon"/>
                            <p>Wind: {dataWheater?.current?.wind_speed} mph direction {dataWheater?.current?.wind_dir}</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}