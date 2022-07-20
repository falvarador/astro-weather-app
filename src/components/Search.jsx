import { useState } from 'preact/hooks'
import { GeoService } from './../services/geo-service'

export const Search = ({ onSearchChange }) => {
  const geoService = new GeoService()
  const [search, setSearch] = useState(null)

  const loadOptions = async (inputValue) => {
    const { values } = await geoService.search(inputValue)

    return {
      options: values.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`
        }
      })
    }
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  return (
    <AsyncPaginate
      placeholder='Search for city'
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}
