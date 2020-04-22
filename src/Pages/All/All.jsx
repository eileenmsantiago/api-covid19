import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

let BASE_API = '/';
if(process.env.NODE_ENV !== "development") {  
    BASE_API = '/.netlify/functions/server/';
}

const All = (props) => {

    const [cases, setCases] = useState([]);

    const getAll = async (countryCode) => {
        const response = await fetch(`${BASE_API}api/covid/all`);
        const body = await response.json();
        
        if(body.data.length > 0) {
            const dataSet = body.data.map(location => {
                return {
                    code: location.country_code,
                    country: location.country,
                    confirmed: location.latest.confirmed,
                    deaths: location.latest.deaths,
                    recovered: location.latest.recovered
                }
            })
            setCases(dataSet)
        }
    };

    useEffect(() => {
        getAll();
    }, []);
    
    return(
        <div className="all">
            <h1>All COVID-19 Cases</h1>
            <table>
                <thead>
                    <th>Country</th>
                    <th>Confirmed Cases</th>
                    <th>Deaths</th>
                    <th>Recovered</th>
                </thead>
                <tbody>
                    {cases.map(c => {
                        return (
                            <tr>
                                <td>
                                    <img
                                        style={{
                                            width: '25px',
                                            marginTop: '3px',
                                            marginRight: '8px'
                                        }}
                                        src={`https://www.countryflags.io/${c.code}/flat/64.png`}></img>
                                    {c.country}
                                </td>
                                <td>{c.confirmed}</td>
                                <td>{c.deaths}</td>
                                <td>{c.recovered}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default All;