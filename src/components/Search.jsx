import { useState } from "preact/hooks";
import { AsyncPaginate } from "react-select-async-paginate";

import { HttpHelper } from "../helpers/HttpHelper";

const Search = ({ onSearchChange }) => {
  const httpHelper = HttpHelper();  
  const [search, setSearch] = useState(null);
  
    const loadOptions = (inputValue) => {
      httpHelper.httpGet(`${import.meta.env.GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, {
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.GEO_API_KEY}`,
          "X-RapidAPI-Host": `${import.meta.env.GEO_API_HOST}`,
      })
      
      return fetch(
        ``,
        geoApiOptions
      )
        .then((response) => response.json())
        .then((response) => {
          return {
            options: response.data.map((city) => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
        });
    };
  
    const handleOnChange = (searchData) => {
      setSearch(searchData);
      onSearchChange(searchData);
    };
  
    return (
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    );
  };
  
  export default Search;
  