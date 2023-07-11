const getEpisodes = (req, res) => {
  const db = req.app.get('db');
  const { series } = req.query;

  if (series) {
    db.episodes.get_episodes_by_category([`%${series}%`]).then(response => {
      res.status(200).send(response);
    });

    return;
  }

  db.episodes
    .get_episodes()
    .then(resp => {
      res.status(200).send(resp);
    })
    .catch(err => {
      res.status(500).send('Episode err >>>', err);
    });
};

const getEpisodesById = (req, res) => {
  const db = req.app.get('db');

  db.episodes
    .get_episodes_by_id([req.params.id])
    .then(resp => {
      res.status(200).send(resp);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  getEpisodes,
  getEpisodesById
};
