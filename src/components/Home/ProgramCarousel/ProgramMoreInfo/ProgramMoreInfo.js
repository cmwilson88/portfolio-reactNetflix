import React, {Component} from 'react';
import {getMovieInfo, getTVInfo} from '../../../../services/moreInfo'
import {CSSTransitionGroup} from 'react-transition-group'
import './movieMoreInfo.css'

import MovieOverview from './MovieOverview/MovieOverview'
import SimilarTitles from './SimilarTitles/SimilarTitles'
import DetailsSection from './DetailsSection/DetailsSection'

class ProgramMoreInfo extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			detailedProgram: props.displayProgram,
			overview: true,
			recommended: false,
			details: false,
		}

	}

	componentDidMount() {
		if(this.props.format === 'movie') {
			getMovieInfo(this.props.displayProgram.id).then(response => {
				this.setState({
					detailedProgram: response,
					images: response.images.backdrops
						.filter(img => img.width >1200 && img.width < 2000)[0],
					cast: response.credits.cast,
					directors: response.credits.crew
							.filter(item => item.job === 'Director'),
					genres: response.genres,
					similar: response.recommendations.results.splice(0,4),
					reviews: this.props.format === 'movie' && response.reviews.results.length 
							? response.reviews.results 
							: null
				})
			}).catch(err => console.log(err))
		} else {
			getTVInfo(this.props.displayProgram.id).then(response => {
				this.setState({
					detailedProgram: response,
					cast: response.credits.cast.length ? response.credits.cast : null,
					genres: response.genres,
					similar: response.recommendations.results.splice(0,4)
				})
			})
		}
	}

	calculateRuntime(x) {
		let minutes = 0;
		let hours = 0;
		while (x >= 60) {
			x = x-60
			hours++
		}
		minutes = Math.ceil(x);
		return `${hours}h ${minutes}m`
	};



	render() {
		const detailedProgram = this.state.detailedProgram
		let releaseYear
		let runtime 
		if(this.props.format === 'movie') {
			releaseYear = detailedProgram.release_date.substr(0,4)
			runtime = this.calculateRuntime(detailedProgram.runtime)
		}
		
		let match = detailedProgram.vote_average * 10
		let mainCast = [];
		let directors;
		let genres;
		let keywords;
		if(this.state.keywords) {
			keywords = this.state.keywords.splice(0,10)
							.map(keyword => ({
								...keyword, 
								name: keyword.name
											.split(' ')
											.map(word => {
												return word[0].toUpperCase() 
														+ word.substr(1)
													})
											.join(' ')
								}));
		}
							
		if(this.state.cast && typeof Array.isArray(this.state.cast)) {
			for(let i = 0; i < 5; i++) {
				mainCast.push(
						<li key={this.state.cast[i].id}>
							<a href="/">
								{this.state.cast[i].name}
							</a>
							{i < 4 ? ',\u00A0' : ''}
						</li>
				)
			}
		} else {
			mainCast = 'No cast available for this title'
		}

		if(this.state.directors) {
			directors = this.state.directors.map((director,index) => {
				return (
					<li key={director.id}>
						<a href="/">
							{director.name}
						</a>
						{index < this.state.directors.length -1 ? ',\u00A0' : ''}
					</li>
				)
			})
		}

		if(this.state.genres) {
			genres = this.state.genres.map((genre, index) => {
				return (
					<li key={genre.id}>
						<a href="/">
							{genre.name}
						</a>
						{index < this.state.genres.length -1 ? ',\u00A0' : ''}
					</li>
				)
			})
		}


		return (
	 		<section 
	 			className="moreInfo" 
	 			>
	 			<div className="moreInfoBG"
	 				style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${detailedProgram.backdrop_path})`}}>
	     			<div className={this.state.overview ? 'moreInfoOverlay' : 'moreInfoOverlayDark'}>
		     		<h1 className="movie_info_title">{detailedProgram.title || detailedProgram.name}</h1>
		     			<div className="moreInfoContent">
		     			<CSSTransitionGroup
		     				transitionName="transition_mInfoContent"
		     				transitionEnterTimeout={400}
		     				transitionLeave={false}>
			     			{this.state.overview ? (
			     				<MovieOverview 
			     					detailedProgram={detailedProgram}
			     					releaseYear={releaseYear}
			     					runtime={runtime}
			     					match={match}
			     					cast={mainCast}
			     					directors={directors}
			     					genres={genres}
			     				/>
			     			) : null}

			     			{this.state.recommended ? (
			     				<SimilarTitles
			     					similar={this.state.similar} />
			     			) : null}

			     			{this.state.details ? (
			     				<DetailsSection
			     					directors={this.state.directors}
			     					cast={this.state.cast}
			     					genres={this.state.genres}
			     					reviews={this.state.reviews}/>
			     			) : null}
			     		</CSSTransitionGroup>
		     			</div>

	     				<ul className="moreInfoNav">
	     					<li className={this.state.overview ? 'moreInfoNavItemActive' : 'moreInfoNavItem'}
	     						onClick={() => {
		     						this.setState({
		     							overview: true,
		     							recommended: false,
		     							details: false
		     						})
	     						}}
	     					>Overview</li>
	     					<li className={this.state.recommended ? 'moreInfoNavItemActive' : 'moreInfoNavItem'}
	     						onClick={() => {
		     						this.setState({
		     							overview: false,
		     							recommended: true,
		     							details: false
		     						})
	     						}}
	     					>More Like This</li>
	     					<li className={this.state.details ? 'moreInfoNavItemActive' : 'moreInfoNavItem'}
	     						onClick={() => {
		     						this.setState({
		     							overview: false,
		     							recommended: false,
		     							details: true
		     						})
	     						}}
	     					>Details</li>
	     				</ul>
	  				</div>
	 			</div>
	 		</section>
		)
	}
}

export default ProgramMoreInfo