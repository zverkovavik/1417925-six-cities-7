export const AppRoute = {
  LOGIN: '/login',
  ROOT: '/',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id?',
  NOT_FOUND: '/not-found',
};

export const ratingForms = [
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

export const City = {
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
  FAVORITE: '/favorite',
  COMMENTS: '/comments',
};

export const SortType = {
  POPULAR: 'Popular',
  HIGH_TO_LOW: 'Price: high to low',
  LOW_TO_HIGH: 'Price: low to high',
  TOP_RATED_FIRST: 'Top rated first',
};

export const sortTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const Status = {
  FAVORITE: 1,
  UNFAVORITE: 0,
};

export const Toast = {
  POSITION: 'top-center',
  AUTO_CLOSE_TIME: 3000,
  USUAL_ERROR_MESSAGE: 'Something went wrong. Please try again later.',
  SPACE_PASSWORD_ERROR: 'Password cannot start with a space or consist only of spaces.',
  LENGTH_PASSWORD_ERROR: 'Password should contain more then 3 symbols.',
  EMAIL_ERROR: 'Please enter correct email.',
};
