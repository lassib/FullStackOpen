import { useState, useEffect } from "react";
import axios from "axios";

const Country = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>capital: {props.country.capital}</p>
      <p>area: {props.country.area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(props.country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <br />
      <img
        src={props.country.flags.svg}
        height={150}
        alt="Flag was not found"
      ></img>
    </div>
  );
};

const CountryFilter = (props) => {
  const handleShowButton = (event) => {
    props.setFilterCountry(event.target.value);
  };

  const countryData = props.countries.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(props.filterCountry.toLowerCase())
  );

  if (countryData.length > 9)
    return <p>Too many matches, specify another filter</p>;
  else if (countryData.length < 2) {
    return (
      <div>
        {countryData.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {countryData.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button value={country.name.common} onClick={handleShowButton}>
              Show
            </button>
          </li>
        ))}
      </div>
    );
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleCountryChange = (event) => {
    setFilterCountry(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          find countries <input onChange={handleCountryChange} />
        </div>
      </form>
      <CountryFilter
        filterCountry={filterCountry}
        countries={countries}
        setFilterCountry={setFilterCountry}
      />
    </div>
  );
}

export default App;
