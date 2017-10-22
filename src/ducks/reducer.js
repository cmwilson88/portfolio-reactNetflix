import axios from 'axios'
import {searchMovies} from '../services/moreInfo'

const initialState = {
	searchMovies: [],
	searchTerm: '',
	selectedMovie: null
}


export default function reducer(state=initialState, action) {
	switch(action.type) {
		case SEARCH_MOVIES + '_PENDING':
			console.log('search movies pending');
			return Object.assign(
				{},
				state,
				{
					searchTerm: 'Loading'
				}
			)	
		case SEARCH_MOVIES + '_FULFILLED':
			console.log(action.payload)
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
			break;
		default: 
			return state;
	}
}

const SEARCH_MOVIES = 'SEARCH_MOVIES';

export function search(term) {
	console.log('search fired from reducer')
	let promise = searchMovies(term)
	console.log(`promise: ${promise}`)
	return {
		type: SEARCH_MOVIES,
		payload: promise
	}
}