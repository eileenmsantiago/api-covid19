import React, { useState } from 'react';
import randomColor from 'randomcolor/randomColor';
import LineGraph from '../../Components/LineGraph/LineGraph';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';

const Country = (props) => {

    const [chartData, setChartData] = useState({});
    const [hasData, setHasData] = useState(true);

    const countrySelected = async (countryCode) => {
        const response = await fetch(`/api/covid/country?code=${countryCode}`);
        const body = await response.json();
        
        if(body.data.length > 0) {
            const dataSet = body.data.slice(0, 10).map(location => {
                return {
                    label: location.province,
                    data: Object.values(location.timelines.confirmed.timeline),
                    borderColor: randomColor(),
                    fill: false
                }
            }) 
            setHasData(true)
            setChartData({
                x: Object.keys(body.data[0].timelines.confirmed.timeline),
                dataSet: dataSet
            }) 
        } else {
            setHasData(false)
            setChartData({})
        }
    };

    return (
        <div className="COVID">
            <header className="COVID-header">
                <h1>Latest COVID Data</h1>
            </header>
            <CountrySelector onCountrySelected={countrySelected}/>
            <p>{!hasData ? 'No data found for country!' : ''}</p>
            <div className="graph">
                <div className="graph__wrapper">
                    <div className="graph__header">
                        <h2>COVID-19 Graph</h2>
                    </div>
                    <LineGraph
                        dataSet={chartData.dataSet}
                        xData={chartData.x}
                    />
                </div>
            </div>
        </div>
    )
}

export default Country;