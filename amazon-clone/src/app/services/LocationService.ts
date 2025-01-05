export const LocationService = {
  async fetchLocation(coords: GeolocationCoordinates) {
    const response = await fetch(
      `/api/location?lat=${coords.latitude}&lon=${coords.longitude}`
    );
    return response.json();
  }
};