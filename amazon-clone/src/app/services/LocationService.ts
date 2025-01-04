export const LocationService = {
  async fetchLocation() {
    const response = await fetch(
      `/api/location`
    );
    return response.json();
  },
};
