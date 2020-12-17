import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': '109b1ee2a0258736619d6d2bf9843ea1',
    }
})