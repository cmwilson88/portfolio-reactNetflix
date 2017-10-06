import React, {Component} from 'react'
import MovieSlider from './MovieSlider/MovieSlider'

class MovieCarousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			leftMargin: 0
		}

    	this.moveRowRight = this.moveRowRight.bind(this)
    	this.moveRowLeft = this.moveRowLeft.bind(this)
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

	render() {
		return (
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
		              <MovieSlider movies={this.props.movies}/>
		            </div>
		          </div>
		          
		          <span
		          	role="button" 
		            className="rowButton rightRowButton"
		            onClick={() => this.moveRowRight()}>
		            	<i className="fa fa-chevron-right"></i>
		          </span>
	          
	          </div>
	        </div>
		)
	}
}

export default MovieCarousel