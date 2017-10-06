import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import MovieSlider from './MovieSlider/MovieSlider'
import '../App.css'
class MovieCarousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			leftMargin: 0,
			moreInfoActive: false
		}

    	this.moveRowRight = this.moveRowRight.bind(this)
    	this.moveRowLeft = this.moveRowLeft.bind(this)
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

  displayMoreInfo() {
  	this.setState({
  		moreInfoActive: !this.state.moreInfoActive
  	})
  }

	render() {
		const testMovie = this.props.movies[0]
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
		            <div className="moviesCarousel" style={{marginLeft: `${this.state.leftMargin}px`}}>
		              <MovieSlider displayMoreInfo={this.displayMoreInfo} movies={this.props.movies}/>
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
				      // transitionAppear={true}
				      // transitionAppearTimeout={500}
				      transitionEnterTimeout={500}
				      transitionLeaveTimeout={500}>
	     				{this.state.moreInfoActive ? (
			     		<section 
			     			className="moreInfo" 
			     			key={testMovie.id} 
			     			style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${testMovie.backdrop_path})`}}
			     			>
			     			<div className="moreInfoOverlay">

			  				</div>
			     		</section>
	     		) : null}
		     		</CSSTransitionGroup>
	     </div>
		) : 'Loading'
	}
}

export default MovieCarousel