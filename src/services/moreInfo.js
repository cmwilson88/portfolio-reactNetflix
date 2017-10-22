import axios from 'axios'
import config from '../config'

export function getMovieInfo(id) {
	return axios.get(`${config.url}/3/movie/${id}?api_key=${config.API_KEY}&append_to_response=videos,recommendations,credits,keywords,reviews,images`)
			.then(response => response.data).catch(err => console.log(err))
}

export function searchMovies(searchTerm) {
	return axios.get(`${config.url}/3/search/movie?api_key=${config.API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
				.then(response => ({
					searchTerm,
					movies: response.data.results
				})).catch(err=> console.log(err))
}