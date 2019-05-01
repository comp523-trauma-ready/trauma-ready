/**
 * @jest-environment node
 */

const axios = require('axios');

const fetch = (url) => {
    return axios.get(url);
}

it('returns a valid RAC for a valid id', () => {
    return fetch('https://statt-portal.herokuapp.com/rac/0')
        .then(response => {
            let data = response.data; 
            expect(data).toHaveProperty('name')
            expect(data).toHaveProperty('activationCodes')
        });
});

it('returns null value if given an invalid RAC id', () => {
    return fetch('https://statt-portal.herokuapp.com/rac/-5')
        .then(response => {
            let data = response.data;
            expect(data).toBeNull();
        });
});

it('throws a 404 if rac id is not even a number', () => {
    return fetch('https://statt-portal.herokuapp.com/rac/bob')
        .catch(error => {
            expect(error.response.status).toBe(404);
        });
});