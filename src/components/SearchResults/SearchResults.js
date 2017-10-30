import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './searchResults.css'


function SearchResults(props) {
		let searchResults = props.searchResults.map((program, index) => {
			const releaseYear = program.release_date ? program.release_date.substr(0,4) : null
			const format = program.release_date ? 'movie' : 'tv'
			const match = program.vote_average * 10
			return (
				<div key={program.id} className="similar_tile search_tile">
					<div 
						className="similar_media"
						style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${program.backdrop_path}`}}>
						<div className="similar_media_overlay">
							<Link className="video_link" to={`/${format}/${program.id}`}>
								<div className="tile__button">
		            				<i className="fa fa-play"></i>
		        				</div>
	        				</Link>
						</div>
					</div>
					{releaseYear ? (
						<p>{program.title} - {releaseYear}</p>
					) : (
						<p>{program.name}</p>
					)}
					<p style={{
						color: match >= 70 
						? 'green' 
						: match >= 40
						? 'orange' 
						: 'red'
							}}>
							{match}% Match
					</p>
					<p className="similar_overview">{program.overview.substr(0,150).trim() + '...'}</p>
				</div>
			)
	})	
	
	return (
		<div id="search_content">
			<h1 className="search_header">
				Found {props.searchResults.length} results for {props.searchTerm}
			</h1>
			<section className="searchresults">
				{searchResults}
			</section>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		searchResults: state.searchResults,
		searchTerm: state.searchTerm
	}
}

export default connect(mapStateToProps)(SearchResults)