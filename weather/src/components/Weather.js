import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import './Weather.css';


export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [searchText, setSearchText] = useState(null);



    const fetchData = async () => {

        await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: '0f173d69811d4934bac172441211012',
                q: 'Spain'
            }
        }).then(response => {
            console.log(response.data)
            setWeather(response.data.location);
        }).catch(error => {
            console.error(error.message)
        })

    }

    const onButtonClick = async () => {

        await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: '0f173d69811d4934bac172441211012',
                q: searchText.toString()
            }
        }).then(response => {
            console.log(response.data)
            setWeather(response.data);
        }).catch(error => {
            console.error(error)
            if (error.response.status == 400) {
                window.alert("Shteti/qyteti nuk u gjet")
            }

        })
    }

    return (
        <div className='main-Container'>
            <div className="box1">
                <input type="text" placeholder='Kerko shtetin...' onChange={(event) => setSearchText(event.target.value)} onKeyPress={(event) => {
                    if (event.key == 'Enter') {
                        onButtonClick();
                    }
                }} />
                <button onClick={onButtonClick}>Kerko</button>
            </div>
           

            {
                weather && (
                    <div className='weather-box'>
                        <div className='image-box'>
                            <img src={weather.current?.condition?.icon} style={{ width: '80%' }} />
                        </div>
                        <div className='contry-name'>
                            <h3>{weather.location?.country + " - " + weather.location?.name}</h3>
                        </div>
                        <div className='temperature'>
                            <h1>{`${weather.current?.temp_c ? weather.current?.temp_c + '°C' : ''} / ${weather.current?.temp_f ? weather.current?.temp_f + '°F' : ''}`}</h1>
                        </div>
                        <div>
                            <p>{weather.location?.localtime}</p>
                        </div>
                    </div>
                )
            }

        </div>
    )


}
