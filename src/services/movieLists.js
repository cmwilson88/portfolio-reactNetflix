import axios from 'axios'
import config from '../config'

/*
	format = movie or tv
	type = genre, network, etc
	category_id = id of genre, network, etc
*/
export function getProgramsByType(format, type, category_id) {
	return axios.get(`${config.url}/3/discover/${format}?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_${type}s=${category_id}`)
	.then(response => response.data.results)	
}

export function getPopularMovies() {
	return axios.get(`${config.url}/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`)
				.then(response => response.data.results)
}

export function getUpcomingMovies() {
	return axios.get(`${config.url}/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1`)
				.then(response => response.data.results)
}

export function getTVTopRated() {
	return axios.get(`${config.url}/3/tv/top_rated?api_key=${config.API_KEY}&language=en-US&page=1`)
				.then(response => response.data.results)
}