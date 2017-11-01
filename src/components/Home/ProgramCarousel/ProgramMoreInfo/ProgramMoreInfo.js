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

			backdropImg: null
		}

		let interval = null;

	}

	componentDidMount() {
		if(this.props.format === 'movie') {
			getMovieInfo(this.props.displayProgram.id).then(response => {
				console.log(response.images)
				this.setState({
					detailedProgram: response,
					images: response.images.backdrops
						.filter(img => img.width >1200 && img.width < 2000).splice(1,5)
						.map(img => (new Image()).src = `https://image.tmdb.org/t/p/w780${img.file_path}`),
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
				console.log(response)
				this.setState({
					detailedProgram: response,
					cast: response.credits.cast.length ? response.credits.cast : null,
					genres: response.genres,
					images: response.images.backdrops
						.filter(img => img.width >1200 && img.width < 2000).splice(1,5)
						.map(img => (new Image()).src = `https://image.tmdb.org/t/p/w780${img.file_path}`),
					similar: response.recommendations.results.splice(0,4)
				})
			})
		}
		this.cycleImages()
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

	cycleImages() {
		let i = 0;
		let arr = [];
		this.interval = setInterval(() => {
			if(this.state.images.length < 2) {
				clearInterval(this.interval)
			} else {
				this.setState({
					backdropImg: this.state.images[i]
				})
				console.log(this.state.detailedProgram.title || this.state.detailedProgram.name)
				console.log(this.state.backdropImg)
				if(i === this.state.images.length-1) {
					i = 0;
				} else {
					i++
				}
			}
		},3000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}



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
		// REMOVED UNTIL I CAN FIGURE OUT WHAT'S GOING ON WITH API REQUEST
		// let keywords;
		// if(this.state.keywords) {
		// 	keywords = this.state.keywords.splice(0,10)
		// 					.map(keyword => ({
		// 						...keyword, 
		// 						name: keyword.name
		// 									.split(' ')
		// 									.map(word => {
		// 										return word[0].toUpperCase() 
		// 												+ word.substr(1)
		// 											})
		// 									.join(' ')
		// 						}));
		// }
							
		if(this.state.cast && typeof Array.isArray(this.state.cast)) {
			let limit = this.state.cast.length < 5 ? this.state.cast.length : 5
			for(let i = 0; i < limit; i++) {
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

		let moreInfoBackgroundImg;
		if(this.state.backdropImg && this.state.overview) {
			moreInfoBackgroundImg = this.state.backdropImg
		} else {
			moreInfoBackgroundImg = `https://image.tmdb.org/t/p/w780${detailedProgram.backdrop_path}`
		}

		return (
	 		<section 
	 			className="moreInfo" 
	 			>
	 			<div className="moreInfoBG"
	 				style={{backgroundImage: `url(${moreInfoBackgroundImg})`}}>
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