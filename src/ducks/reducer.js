import {searchPrograms} from '../services/moreInfo'

const initialState = {
	searchResults: [],
	searchTerm: ''
}

export default function reducer(state=initialState, action) {
	switch(action.type) {
		// Promise Middleware.  When search promise is resolving, search term = 'Loading'
		case SEARCH_MOVIES + '_PENDING':
			return Object.assign(
				{},
				state,
				{
					searchTerm: 'Loading'
				}
			)	
		/* Promise Middelware.  When search is fulfilled, capitalize each word in the search term 
		and filter programs that have a backdrop image and an overview to make the display look nicer*/
		case SEARCH_MOVIES + '_FULFILLED':
			return Object.assign(
				{}, 
				state, 
				{
					searchResults: action.payload.programs.filter(program => program.backdrop_path && program.overview ? true : false),
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
	let promise = searchPrograms(term)
	// Set payload equal to the response object returned from the searchPrograms axios request.
	return {
		type: SEARCH_MOVIES,
		payload: promise
	}
}