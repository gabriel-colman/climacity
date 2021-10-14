import React, { useState, useEffect } from "react";
import { getHistory as getClima, getTop5 } from "../../services/WeatherApi";

import "./Clima.css";

const Clima = ({ update }) => {
  const [top5, setTop5] = useState([]);
  const [clima, setClima] = useState([]);

  useEffect(() => {
    /**
     * @export
     * @function
     * @name setInfo
     *
     * @description
     * Obtenção das informações da cidade para impressão e atualização da página
     */
    const setInfo = async () => {
      let respClima = await getClima();
      setClima(respClima);
      let respTop = await getTop5();
      setTop5(respTop);
    };
    setInfo();
  }, [update]);

  return (
    <aside>
      <div className="clima-container">
        <p>Clima</p>
        {clima &&
          clima.map((item) => {
            return (
              <div className="last-city">
                <img
                  src={`https://openweathermap.org/img/w/${item.icon}.png`}
                  alt="imgicon"
                  className="icon"
                />
                {item.city}
              </div>
            );
          })}
      </div>
      <div className="top5-container">
        <p>Cidades Mais Buscadas</p>
        {top5 != null
          ? top5.map((item) => {
              return <div className="top-city">{item.city}</div>;
            })
          : null}
      </div>
    </aside>
  );
};

export default Clima;