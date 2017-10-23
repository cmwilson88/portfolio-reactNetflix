import {searchMovies} from '../services/moreInfo'

const initialState = {
	searchMovies: [],
	searchTerm: ''
}

export default function reducer(state=initialState, action) {
	switch(action.type) {
		case SEARCH_MOVIES + '_PENDING':
			return Object.assign(
				{},
				state,
				{
					searchTerm: 'Loading'
				}
			)	
		case SEARCH_MOVIES + '_FULFILLED':
			return Object.assign(
				{}, 
				state, 
				{
					searchMovies: action.payload.movies.filter(movie => movie.backdrop_path ? true : false),
					searchTerm: action.payload.searchTerm.split(' ')
										.map(word => word[0].toUpperCase() + word.substr(1))
										.join(' ')
				}
			)
		default: 
			return state;
	}
}

const SEARCH_MOVIES = 'SEARCH_MOVIES';

export function search(term) {
	let promise = searchMovies(term)
	return {
		type: SEARCH_MOVIES,
		payload: promise
	}
}