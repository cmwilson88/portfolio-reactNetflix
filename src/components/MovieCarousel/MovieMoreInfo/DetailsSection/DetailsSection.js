import React from 'react'

export default function DetailsSection(props) {
	let moreCast = [];
	let directors;
	let detail_directors;
	let genres;
	let detail_genres;
	let detail_keywords = [];
	let reviews;

	let limit = 0;
		if(props.cast.length >=10) {
			limit = 10
		} else {
			limit = props.cast.length
		}
		for(let i = 0; i < limit; i++) {
			moreCast.push(
				<li key={props.cast[i].id}>
					<a href="#">
						{props.cast[i].name}
					</a>
				</li>
			)
		}


		if(props.directors) {
			detail_directors = props.directors.map(director => {
				return (
					<li key={director.id}>
						<a href="#">{director.name}</a>
					</li>
				)
			})
		}

		if(props.genres) {
			detail_genres = props.genres.map((genre,index) => {
				return (
					<li key={genre.id}>
						<a href="#">
							{genre.name}
						</a>
					</li>
				)	
			})
		}

		if(props.keywords) {
			
			let limit = 0;
			if(props.keywords.length >=10) {
				limit = 10
			} else {
				limit = props.keywords.length
			}
			
			for(let i = 0; i < limit; i++) {
				detail_keywords.push(
					<li key={i}>
						<a href="#">
							{props.keywords[i]}
						</a>
					</li>
					)
			}
		}

		if(props.reviews) {
			reviews = props.reviews.map((review, index) => {
				return (
					<div key={review.id}>
						<pre>{review.content}</pre>
						<p className="detail_review_author">{review.author}</p>
						{index < props.reviews.length -1 ? (
							<div className="detail_hr"/>
						) : null}
					</div>
				)
			})
		}

	return (
		<section className="details_container">
			<div className="details_column">
				{detail_directors &&detail_directors.length > 1 ? (
				<h1 className="movie_info_label">Directors:</h1>
			) : (
				<h1 className="movie_info_label">Director:</h1>
			)}
			<ul>
				{detail_directors}
			</ul>

				<h1>Cast</h1>
				<ul>
					{moreCast}
				</ul>
			
			</div>
			<div className="details_column">
				{detail_genres.length > 1 ? (
				<h1 className="movie_info_label">Genres:</h1>
			) : (
				<h1 className="movie_info_label">Genre:</h1>
			)}
			<ul>
				{detail_genres}
			</ul>


				{detail_keywords.length > 1 ? (
				<h1 className="movie_info_label">Keywords:</h1>
			) : (
				<h1 className="movie_info_label">Keyword:</h1>
			)}
			<ul>
				{detail_keywords}
			</ul>

			</div>

			<div className="details_column">
				<h1>Member Reviews</h1>
				<div className="detail_reviews">
				{reviews  
					? reviews
					: 'There are no reviews for this movie!'
				}
				</div>
			</div>
		</section>
	)
}