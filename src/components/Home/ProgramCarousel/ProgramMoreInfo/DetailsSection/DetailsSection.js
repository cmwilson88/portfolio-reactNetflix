import React from 'react'
import './detailsSection.css'

export default function DetailsSection(props) {
	let moreCast = [];
	let limit = 0;
	if(props) {
		if(props.cast.length >=10) {
			limit = 10
		} else {
			limit = props.cast.length
		}
		for(let i = 0; i < limit; i++) {
			moreCast.push(
				<li key={props.cast[i].id}>
					<a href="/">
						{props.cast[i].name}
					</a>
				</li>
			)
		}
	}

	return (
		<section className="details_container">
			<div className="details_column">
			{props.directors ? (
				<DetailContent
					content={props.directors}
					title="Director"/>
			) : null}

				<h1>Cast</h1>
				<ul>
					{moreCast}
				</ul>
			
			</div>

			<div className="details_column">
				<DetailContent 
					content={props.genres}
					title="Genre"/>
			</div>

			<div className="details_column">
				<h1>Member Reviews</h1>
				<DetailReviews 
					reviews={props.reviews}/>
			</div>
		</section>
	)
}

function DetailContent(props) {
	let content = props.content.map((item,index) => {
		return (
			<li key={index}>
				<a href="/">
					{item.name}
				</a>
			</li>
		)	
	})
	return (
		<div>
			{content.length > 1 ? (
				<h1 className="movie_info_label">{props.title}s</h1>
			) : (
				<h1 className="movie_info_label">{props.title}:</h1>
			)}
			<ul>
				{content}
			</ul>
		</div>
	)
}

function DetailReviews(props) {
	let reviews;
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
		<div className="detail_reviews">
			{reviews  
				? reviews
				: 'There are no reviews for this program!'
			}
		</div>	

	) 
}