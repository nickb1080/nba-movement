
// These "constructors" are to help destructuring movement data in to meaningful
// semantic fields. The NBA's format is extremely concise but is a pain in the neck
// without a way to assign meaning to fields.

const Moment = data => ({
  quarter: data[0],
  timestamp: data[1],
  gameClock: data[2],
  shotClock: data[3],
  // [4] is always(?) null
  coordinates: data[5].map(Coordinate),
});

const Ball = tuple => ({
  type: "ball",
  // [0] is -1 for ball
  // [1] is -1 for ball
  x: tuple[2],
  y: tuple[3],
  radius: tuple[4],
});

const Player = tuple => ({
  type: "player",
  teamId: tuple[0],
  playerId: tuple[1],
  x: tuple[2],
  y: tuple[3],
  // [4] is 0 for player
});

const PlayerDetail = data => ({
  lastName: data.lastname,
  firstName: data.firstname,
  playerId: data.playerId,
  jersey: data.jersey,
  position: data.position,
});

const isBall = tuple => tuple[0] === -1;

const Coordinate = tuple => isBall(tuple) ? Ball(tuple) : Player(tuple);

const Event = data => ({
  gameId: data.gameid,
  gameDate: data.gameDate,
  visitor: {
    name: data.visitor.name,
    teamId: data.visitor.teamId,
    abbreviation: data.visitor.abbreviation,
    players: data.visitor.players.map(PlayerDetail),
  },
  home: {
    name: data.home.name,
    teamId: data.home.teamId,
    abbreviation: data.home.abbreviation,
    players: data.home.players.map(PlayerDetail),
  },
  moments: data.moments.map(Moment),
});

module.exports = { Event, Moment, Coordinate };