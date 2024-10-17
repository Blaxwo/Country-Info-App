import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CountryList() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/country/available-countries')
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Country List</h1>
            <ul>
                {countries.map(country => (
                    <li key={country.countryCode}>
                        <Link to={`/country/${country.countryCode}`}>
                            {country.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CountryList;
