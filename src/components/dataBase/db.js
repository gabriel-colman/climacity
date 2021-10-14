import axios from "axios";
import { URL } from "../../API";

export default class Db {
  /**
   * @async
   * @export
   * @function
   * @name add
   *
   * @description
   * Envia um objeto com as informações para a rota de post
   */
  static add = async (
    city,
    father,
    temperature,
    temperature_max,
    temperature_min,
    weather,
    icon
  ) => {
    let result = await axios.post(URL + "/", {
      city: city,
      father: father,
      temperature: temperature,
      temperature_max: temperature_max,
      temperature_min: temperature_min,
      weather: weather,
      icon: icon,
    });
    return result;
  };

  /**
   * @async
   * @export
   * @function
   * @name get
   *
   * @description
   * Realiza a ligação entre a rota de get
   */
  static get = async () => {
    let infos = await axios.get(URL + "/");
    return infos;
  };

  /**
   * @async
   * @export
   * @function
   * @name getTop5
   *
   * @description
   * Realiza a ligação entre a rota de getTop5
   */
  static getTop5 = async () => {
    let infos = await axios.get(URL + "/top5");
    return infos;
  };
}