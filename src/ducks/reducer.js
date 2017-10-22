import axios from 'axios'

const initialState = {
	searchMovies: [],
	searchTerm: '',
	selectedMovie: null
}


export default function reducer(state=initialState, action) {
	switch(action.type) {
		default: 
			return state;
	}
}