import axios from 'axios'
import config from '../../config'

export function getPopularMovies() {
	return axios.get(`${config.url}/3/movie/popular/?api_key=${config.API_KEY}&language=en-US&page=1`)
				.then(response => response.data.results)
}