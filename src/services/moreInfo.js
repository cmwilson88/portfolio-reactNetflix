import axios from 'axios'
import config from '../config'

export function getMovieInfo(id) {
	console.log(`movie`)
	return axios.get(`${config.url}/3/movie/${id}?api_key=${config.API_KEY}&language=en-US&append_to_response=recommendations,credits,images,reviews`)
			.then(response => {
				return response.data}).catch(err => console.log(err))
}

export function getTVInfo(id) {
	console.log(`tv`)
	return axios.get(`${config.url}/3/tv/${id}?api_key=${config.API_KEY}&append_to_response=credits,recommendations`)
	.then(response => {
				return response.data}).catch(err => console.log(err))
}

export function getMovieVideos(id) {
	return axios.get(`${config.url}/3/movie/${id}?api_key=${config.API_KEY}&append_to_response=videos`)
			.then(response => response.data).catch(err => console.log(err))
}
export function searchMovies(searchTerm) {
	return axios.get(`${config.url}/3/search/movie?api_key=${config.API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
				.then(response => ({
					searchTerm,
					movies: response.data.results
				})).catch(err=> console.log(err))
}