import axios from 'axios'
import {searchMovies} from '../services/moreInfo'

const initialState = {
	searchMovies: [],
	searchTerm: '',
	selectedMovie: null
}


export default function reducer(state=initialState, action) {
	switch(action.type) {
		case SEARCH_MOVIES + '_FULFILLED':
			return Object.assign(
				{}, 
				state, 
				{
					searchMovies: action.payload,
					searchTerm: action.searchTerm
				})
		default: 
			return state;
	}
}

const SEARCH_MOVIES = 'SEARCH_MOVIES';

export function search(term) {
	let promise = searchMovies(term)
	return {
		type: SEARCH_MOVIES,
		payload: promise,
		searchTerm: term
	}
}