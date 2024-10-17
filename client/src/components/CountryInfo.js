import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function CountryInfo() {
    const { code } = useParams();
    const [countryData, setCountryData] = useState(null);
    const [populationData, setPopulationData] = useState(null);
    const [flagData, setFlagData] = useState(null);
    let countryName = '';
    let flagsUrl = '';

    useEffect(() => {
        axios.get(`http://localhost:3001/country/country-info/${code}`)
            .then(response => {
                setCountryData(response.data);
                countryName = response.data.countryName;
                flagsUrl = response.data.flagUrl;
                return axios.get(response.data.populationUrl);
            })
            .then(populationResponse => {
                setPopulationData(populationResponse.data.data.find(country => country.country === countryName));
                return axios.get(flagsUrl);
            })
            .then(flagResponse => {
                setFlagData(flagResponse.data.data.find(flag => flag.name === countryName))

            })
            .catch(error => console.error(error));
    }, [code]);

    if (!countryData || !populationData || !flagData) return <div>Loading...</div>;

    const chartData = {
        labels: populationData.populationCounts.map(data => data.year),
        datasets: [{
            label: 'Population',
            data: populationData.populationCounts.map(data => data.value),
            fill: false,
            borderColor: 'blue',
        }]
    };

    return (
        <div>
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
                {countryData.countryName}
                <img
                    src={flagData.flag}
                    alt={`Flag of ${countryData.countryName}`}
                    style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
                />
            </h1>

            <h2>Border Countries</h2>
            <ul>
                {countryData.borders.map(border => (
                    <li key={border.countryCode}>
                        <Link to={`/country/${border.countryCode}`}>
                            {border.commonName}
                        </Link>
                    </li>
                ))}
            </ul>

            <h2>Population Chart</h2>
            <Line data={chartData} />
        </div>

    );
}

export default CountryInfo;
