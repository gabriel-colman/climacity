import React, { useState } from "react";
import { weatherApi, requestAPI, getClimaByCidade } from "../../services/WeatherApi";

import "./Search.css";

/**
 * @export
 * @component
 * @name Search
 *
 * @description
 * Compõe um item de busca para o nome da determinada cidade e impressão das
 * informações referentes a mesma
 */
const Search = ({ onUpdate, update }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  /**
   * @function
   * @name handleInputChange
   *
   * @description
   * Responsável por obter os dados digitados pelo usuário
   */
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  /**
   * @function
   * @name handleSearchData
   *
   * @description
   * Responsável pelas solicitações das informações da API, do salvamento no banco de dados
   * e da atualização da página
   */
  const handleSearchData = async (e) => {
    if (e.keyCode === 13) {
      const forecast = await weatherApi(city);
      console.log(forecast);
      setWeather(forecast);
      await onUpdate(!update);
      setCity("");
    }
  };

  return (
    <div>
      <div className="city-input">
        <input
          className="add-city-input"
          onChange={handleInputChange}
          onKeyUp={handleSearchData}
          placeholder="Digite o nome da Cidade"
          value={city}
          type="search"
        ></input>
      </div>
      {weather != null ? (
        <div>
          <div className="city-name">
            {weather.name} |{" " + weather.sys.country}
          </div>
          <div className="city-temp">
            {parseFloat(weather.main.temp - 273.15).toFixed(1)}&deg; C
          </div>
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="imgicon"
              className="icon"
            />
          </div>
          <div className="city-weather">{weather.weather[0].main}</div>
          <div className="city-humity">
            Umidade:
            {" " + weather.main.humidity}%
          </div>
          <div className="weather-info">
            Máx: {parseFloat(weather.main.temp_min - 273.15).toFixed(1)} &deg;C
            / Min:{" " + parseFloat(weather.main.temp_max - 273.15).toFixed(1)}{" "}
            &deg;C
          </div>
        </div>
      ) : (
        <div className="title">
          Pesquise por uma cidade existente e pressione Enter
        </div>
      )}
    </div>
  );
};

export default Search;