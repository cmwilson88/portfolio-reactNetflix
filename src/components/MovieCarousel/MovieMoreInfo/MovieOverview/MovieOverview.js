import React from 'react'
import './movieOverview.css'

export default function MovieOverview(props) {
	return(
		<div className="movie_info">
			<section className="mi_section mi_year_time">
				<span style={{
				color: props.match >= 70 
				? 'green' 
				: props.match >= 40
				? 'orange' 
				: 'red'
					}}>
					{props.match}% Match
				</span>
				<span>{props.releaseYear}</span>
				<span>{props.runtime}</span>
			</section>
			<p className="mi_section movie_info_overview">{props.detailedMovie.overview}</p>
			<br/>
			<div className="mi_section">
				{props.cast ? (
 				<section className="mi_cast_crew">
 					<span className="movie_info_label">Cast:</span>
     					<ul>
     						{props.cast}
     					</ul>
 				</section>
				): null}
				{props.directors ? (
					<section className="mi_cast_crew">
						{props.directors.length > 1 ? (
							<span className="movie_info_label">Directors:</span>
						 ) : (
						 	<span className="movie_info_label">Director:</span>
						)} 
						<ul>
							{props.directors}
						</ul>
					</section>
				) : null}
				{props.genres ? (
					<section className="mi_cast_crew">
						{props.genres.length > 1 ? (
							<span className="movie_info_label">Genres:</span>
						) : (
							<span className="movie_info_label">Genre:</span>
						)}
						<ul>
							{props.genres}
						</ul>
					</section>
				) : null}
			</div>
			<p className="mi_section">{props.detailedMovie.tagline}</p>
		</div>
	)
}