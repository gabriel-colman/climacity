import axios from "axios";
import Db from "../components/dataBase/db";

const url = "https://api.openweathermap.org/data/2.5/weather?";
const key = "dd6bf1aab8b1d27bce7879191c7ac85a";

/**
 * @async
 * @export
 * @function
 * @name weatherApi
 *
 * @description
 * Realiza a obtenção dos dados da OpenWeatherAPI
 */
const weatherApi = async (cityName) => {
    try {
        const { data } = await axios.get(url + `q=${cityName}&appid=${key}`);
        requestAPI(data);
        return data;
    } catch (error) {
        return null;
    }
};

/**
 * @async
 * @export
 * @function
 * @name requestAPI
 *
 * @description
 * Solicita a rota para salvamento das informações no banco de dados
 */
const requestAPI = async (weather) => {
    await Db.add(
        weather.name,
        weather.father,
        weather.main.temp.toFixed(1) - 273.15,
        weather.main.temp_max.toFixed(1) - 273.15,
        weather.main.temp_min.toFixed(1) - 273.15,
        weather.weather[0].main,
        weather.weather[0].icon
    );
};

/**
 * @async
 * @export
 * @function
 * @name getClima
 *
 * @description
 * Solicita a rota dos dados já armazenados para demonstração do Histórico
 */
const getClima = async () => {
    let { data } = await Db.get();
    return data;
};

/**
 * @async
 * @export
 * @function
 * @name getTop5
 *
 * @description
 * Solicita a rota dos dados já armazenados para demonstração do Top5
 */
const getTop5 = async () => {
    let { data } = await Db.getTop5();
    return data;
};

export { weatherApi, requestAPI, getClima as getHistory, getTop5 };