import axios from 'axios'
import config from '../config'

export function getPopularMovies() {
	return axios.get(`${config.url}/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`)
				.then(response => response.data.results)
}

export function getUpcomingMovies() {
	return axios.get(`${config.url}/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1`)
				.then(response => response.data.results)
}

export function getMoviesByCategory(format, type, category_id) {
	return axios.get(`${config.url}/3/discover/${format}?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_${type}s=${category_id}`)
				.then(response => response.data.results)	
}

export function getTopFantasyMovies() {
	return axios.get(`${config.url}/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878`)
				.then(response => response.data.results)
}

export function getTopComedyMovies() {
	return axios.get(`${config.url}/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`)
				.then(response => response.data.results)
}

export function getTopHorrorMovies() {
	return axios.get(`${config.url}/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`)
				.then(response => response.data.results)
}

export function getTopMysteryMovies() {
	return axios.get(`${config.url}/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=9648`)
				.then(response => response.data.results)
}