import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import MovieSlider from './MovieSlider/MovieSlider'
import '../App.css'
class MovieCarousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			leftMargin: 0,
			moreInfoActive: false,
			moreInfoMovie: null
		}

    	this.moveRowRight = this.moveRowRight.bind(this)
    	this.moveRowLeft = this.moveRowLeft.bind(this)
    	this.moreInfoMouseEnter = this.moreInfoMouseEnter.bind(this)
    	this.displayMoreInfo = this.displayMoreInfo.bind(this)
	}

	moveRowRight() {
    let newMargin = this.state.leftMargin - 1008
    this.setState({
      leftMargin: newMargin
    })
  }

	moveRowLeft() {
    let newMargin = this.state.leftMargin + 1008
    if(newMargin > 0) {
      newMargin = 0
    }
    this.setState({
      leftMargin: newMargin
    })
  }

  displayMoreInfo(movie) {
  	this.setState({
  		moreInfoActive: !this.state.moreInfoActive,
  		moreInfoMovie: movie
  	})
  }

  moreInfoMouseEnter(movie) {
		setTimeout(() => {
			this.setState({
				moreInfoMovie: movie
			})
		}, 500)
  }

	render() {
		const testMovie = this.props.movies[0]
		const displayMovie = this.state.moreInfoMovie
		return testMovie ? (
			<div className='movieCategoryRow'>
	          <h3 className="rowHeader">{this.props.category}</h3>
	          <div className="movieRow">
		          <span 
		            className="rowButton leftRowButton"
		            onClick={() => this.moveRowLeft()}>
		            	<i className="fa fa-chevron-left"></i>
		            </span>
		          
		          <div className="row">
		            <div className={this.state.moreInfoActive ? 'moviesCarousel-active' : 'moviesCarousel'} style={{marginLeft: `${this.state.leftMargin}px`}}>
		              <MovieSlider moreInfoActive={this.state.moreInfoActive} mouseEnterInfo={this.moreInfoMouseEnter} displayMoreInfo={this.displayMoreInfo} movies={this.props.movies}/>
		            </div>
		          </div>
		          
		          <span
		          	role="button" 
		            className="rowButton rightRowButton"
		            onClick={() => this.moveRowRight()}>
		            	<i className="fa fa-chevron-right"></i>
		          </span>
	          
	          </div>
	     			<CSSTransitionGroup
				      transitionName="example"
				      transitionAppear={true}
				      transitionAppearTimeout={500}
				      transitionEnterTimeout={500}
				      transitionLeave={false}
				      transitionLeaveTimeout={500}>
	     				{this.state.moreInfoActive ? (
			     		<section 
			     			className="moreInfo" 
			     			key={this.state.moreInfoMovie.id} 
			     			>
			     			<div className="moreInfoBG"
			     				style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${displayMovie.backdrop_path})`}}>
				     			<div className="moreInfoOverlay">
				     				<h1 className="hero_title">{displayMovie.title}</h1>
				     				<p>{displayMovie.overview}</p>
				  				</div>
			     			</div>
			     		</section>
	     		) : null}
		     		</CSSTransitionGroup>
	     </div>
		) : 'Loading'
	}
}

export default MovieCarousel