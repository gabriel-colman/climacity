const db = require("./database");

/**
 * @export
 * @function
 * @name add
 *
 * @description
 * Realiza a inserção das variáveis no banco de dados
 */
const add = async (req, res) => {
  try{
  const { city, father, temperature, temperature_max, temperature_min, weather, icon } =
    req.body;
  let query = `INSERT INTO history 
               (city, father, temperature, temperature_max, temperature_min, weather, icon) 
               VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  db.pool.query(query,
    [city, father, temperature, temperature_max, temperature_min, weather, icon],
    async (error, finish) => {
      await res.send(finish.rows);
    }
  );
  } catch(e){
    console.log(e);
  }
};

/**
 * @export
 * @function
 * @name get
 *
 * @description
 * Realiza a obetenção das inforamções presentes no banco de dados para compor o histórico
 */
const get = async (req, res) => {
  let query = `SELECT * FROM history ORDER BY id DESC LIMIT 10`;
  db.pool.query(query, async (error, finish) => {
    await res.send(finish.rows);
  });
};

/**
 * @export
 * @function
 * @name getTop5
 *
 * @description
 * Realiza a obetenção das inforamções presentes no banco de dados para compor o Top5
 */
const getTop5 = async (req, res) => {
  let query = `SELECT city FROM history
               GROUP BY city HAVING COUNT (city) >= 1
               ORDER BY COUNT(city) DESC LIMIT 5`;
  db.pool.query(query, async (error, finish) => {
    await res.send(finish.rows);
  });
};

module.exports = {
  add,
  get,
  getTop5,
};