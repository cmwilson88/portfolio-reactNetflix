import React from 'react';
import {Link} from 'react-router-dom'
import './similarTitles.css';

export default function SimilarTitles(props) {
	let similar = props.similar.map((program, index) => {
		let releaseYear = program.release_date ? program.release_date.substr(0,4) : null
		const match = program.vote_average * 10
		return (
			<div key={program.id} className="similar_tile">
				<div 
					className="similar_media"
					style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${program.backdrop_path}`}}>
					<div className="similar_media_overlay">
						<Link className="video_link" to={`/${program.id}`}>
							<div className="tile__button">
	            				<i className="fa fa-play"></i>
	        				</div>
        				</Link>
					</div>
				</div>
				{program.title ? (
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
		<div className="similar_container">
			{similar}
		</div>
	)
}
