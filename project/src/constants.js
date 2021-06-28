export const AppRoute = {
  LOGIN: '/login',
  ROOT: '/',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id?',
};

export const ratingForm = [
  {
    numberValue: 5,
    definition: 'perfect',
  },
  {
    numberValue: 4,
    definition: 'good',
  },
  {
    numberValue: 3,
    definition: 'not bad',
  },
  {
    numberValue: 2,
    definition: 'badly',
  },
  {
    numberValue: 1,
    definition: 'terribly',
  },
];

export const Cities = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const ApiRoute = {
  HOTELS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
};
