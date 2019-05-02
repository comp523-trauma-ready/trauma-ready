/**
 * @jest-environment node
 */

const axios = require('axios');

const fetch = (url) => {
  return axios.get(url);
}

it('finds nearby hospitals when in Chapel Hill', () => {
  return fetch('https://statt-portal.herokuapp.com/mobile/hospitals/full/35.898800/-79.041267')
    .then(response => {
      let data = response.data;
      expect(data.length).toBeGreaterThan(0);
    });
});

it('finds no nearby hospitals when in Nairobi, Kenya', () => {
  return fetch('https://statt-portal.herokuapp.com/mobile/hospitals/full/-1.292066/36.821945')
    .then(response => {
      let data = response.data;
      expect(data.length).toBe(0);
    });
});