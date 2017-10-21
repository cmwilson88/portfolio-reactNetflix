import React from 'react'
import {connect} from 'react-redux'

import './searchResults.css'


function SearchResults(props) {
		let searchMovies = props.searchMovies.map((movie, index) => {
			const releaseYear = movie.release_date.substr(0,4)
			const match = movie.vote_average * 10
			return (
				<div key={movie.id} className="similar_tile">
					<div 
						className="similar_media"
						style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}}>
						<div className="similar_media_overlay">
							<div className="tile__button">
	            				<i className="fa fa-play"></i>
	        				</div>
						</div>
					</div>
					<p>{movie.title} - {releaseYear}</p>
					<p style={{
						color: match >= 70 
						? 'green' 
						: match >= 40
						? 'orange' 
						: 'red'
							}}>
							{match}% Match
					</p>
					<p className="similar_overview">{movie.overview.substr(0,150).trim() + '...'}</p>
				</div>
			)
	})	
	
	return (
		<div style={{marginTop: '100px'}}>
			<h1>This is the results page</h1>
			<section className="searchresults">
				{searchMovies}
			</section>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		searchMovies: state.searchMovies
	}
}

export default connect(mapStateToProps)(SearchResults)