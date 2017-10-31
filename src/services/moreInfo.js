import axios from 'axios'
import config from '../config'

export function getMovieInfo(id) {
	return axios.get(`${config.url}/3/movie/${id}?api_key=${config.API_KEY}&language=en-US&append_to_response=recommendations,credits,images,reviews&include_image_language=en,null`)
			.then(response => {
				return response.data}).catch(err => console.log(err))
}

export function getTVInfo(id) {
	return axios.get(`${config.url}/3/tv/${id}?api_key=${config.API_KEY}&append_to_response=credits,recommendations,images`)
	.then(response => {
				return response.data}).catch(err => console.log(err))
}

export function getProgramVideos(format,id) {
	return axios.get(`${config.url}/3/${format}/${id}?api_key=${config.API_KEY}&language=en-US&append_to_response=videos`)
			.then(response => response.data).catch(err => console.log(err))
}
export function searchPrograms(searchTerm) {
	return axios.get(`${config.url}/3/search/multi?api_key=${config.API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
				.then(response => ({
					searchTerm,
					programs: response.data.results
				})).catch(err=> console.log(err))
}