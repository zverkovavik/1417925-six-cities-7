import { renderHook } from '@testing-library/react-hooks';
import { useMap } from './use-map';

let cityMock = null;
let testMapRef = null;

describe('Hook: useMap', () => {
  beforeAll(() => {
    testMapRef = {
      current: true,
    };

    jest.mock('leaflet', () => ({
      map: () => {},
    }));

    cityMock = {
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10,
        },
      },
    };
  });

  it('should return map object', () => {
    const {result} = renderHook(() =>
      useMap(testMapRef, cityMock),
    );

    expect(result).toBeInstanceOf(Object);
  });
});
