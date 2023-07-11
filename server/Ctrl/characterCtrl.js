const { all } = require('../Data/url');
// const moment = require('moment');
const { capitalizeFirstLetter } = require('../utils/character');

const getPeople = (req, res) => {
  const db = req.app.get('db');
  let { limit, name, offset, category } = req.query;

  if ((limit && isNaN(parseInt(limit))) || (offset && isNaN(parseInt(offset)))) {
    res.status(400).send('Bad Request');
    return;
  } else {
    limit = !limit || parseInt(limit) > 10 ? 10 : parseInt(limit);
    offset = !offset || parseInt(offset) < 0 ? 0 : parseInt(offset)
  }

  if (category) {
    db.characters.get_char_by_category([`%${category}%`]).then((response) => {
      res
        .status(200)
        .send(limit || offset ? response.splice(offset || 0, limit) : response);
    });
    return;
  }

  let newName =
    name &&
    name
      .split(' ')
      .map((e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
      })
      .join(' ');

  !name
    ? db.characters.get_characters().then((response) => {
        res
          .status(200)
          .send(
            limit || offset ? response.splice(offset || 0, limit) : response
          );
      })
    : db.characters.get_char_by_name([newName]).then((response) => {
        if (!response.length) {
          const percentName = newName
            ? `%${capitalizeFirstLetter(newName)}%`
            : '%%';
          db.characters.get_char_closest(percentName).then((secondResponse) => {
            res.status(200).send(
              limit || offset
                ? secondResponse.splice(offset || 0, limit)
                : secondResponse
            );
          });
          return;

        } else {
          res.status(200).send(response);
          return;
        }
      });
};

const getPeopleFooter = (req, res) => {
  const db = req.app.get('db');
  const { limit, name, offset } = req.query;

  let newName =
    name &&
    name
      .split(' ')
      .map((e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
      })
      .join(' ');

  !name
    ? db.characters.get_characters().then((response) => {
        res
          .status(200)
          .send(
            limit || offset ? response.splice(offset || 0, limit) : response
          );
      })
    : db.characters.get_char_by_name([newName]).then((response) => {
        res.status(200).send(response);
      });
};

const getPeopleById = (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;

  db.characters
    .get_char_by_id([id])
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getRandomChar = (req, res) => {
  const db = req.app.get('db');
  const { limit } = req.query;
  const o = [];
  const a = [];

  db.characters
    .get_random_char([1])
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getHomePage = (req, res) => {
  const db = req.app.get('db');
  const { limit, category, offset } = req.query;
  const o = [];
  const a = [];
  const betterCallA = [];

  if (category) {
    db.characters
      .get_char_by_category_homepage([`%${category}%`, limit || 1])
      .then((resp) => {

        res
          .status(200)
          .send(limit || offset ? resp.splice(offset || 0, limit) : resp);
      });
    // .then(response => {
    //   charactersFunc(response);
    //   res.status(200)
    //   .send(
    //     limit || offset ? response.splice(offset || 0, limit) : response
    //   )
    // })
    return;
  }

  db.characters
    .get_random_char([limit || 1])
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  return;
};

module.exports = {
  getPeople,
  getPeopleById,
  getRandomChar,
  getHomePage,
  getPeopleFooter,
};
