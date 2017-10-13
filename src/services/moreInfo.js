import axios from 'axios'
import config from '../config'

export function getMovieInfo(id) {
	return axios.get(`${config.url}/3/movie/${id}?api_key=${config.API_KEY}&append_to_response=videos,similar,credits,keywords,reviews`)
			.then(response => response.data).catch(err => console.log(err))
}