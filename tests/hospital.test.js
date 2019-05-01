/**
 * @jest-environment node
 */

const axios = require('axios');

const fetch = (url) => {
    return axios.get(url);
}

it('returns a valid hospital given a correct id', () => {
    return fetch('https://statt-portal.herokuapp.com/hospital/0')
        .then(response => {
            let data = response.data; 
            expect(data).toHaveProperty('services')
            expect(data).toHaveProperty('rac')
            expect(data).toHaveProperty('name')
        });
});

it('returns null value if hospital id does not exist in database', () => {
    return fetch('https://statt-portal.herokuapp.com/hospital/-5')
        .then(response => {
            let data = response.data;
            expect(data).toBeNull();
        });
});

it('returns a 404 if hospital id is not a number at all', () => {
    return fetch('https://statt-portal.herokuapp.com/hospital/bob')
        .catch(error => {
            expect(error.response.status).toBe(404);
        });
});

it('has at least one hospital in the database', () => {
    return fetch('https://statt-portal.herokuapp.com/mobile/hospitals')
        .then(response => {
            let data = response.data;
            expect(data.length).toBeGreaterThan(0);
        });
});