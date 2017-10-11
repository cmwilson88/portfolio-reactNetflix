import React, {Component} from 'react'

class movieTile extends Component {
	constructor(props) {
      super(props)

      this.state = {
        tileActive: false
      }

      this.setActiveMovieTile = this.setActiveMovieTile.bind(this)
    }

    setActiveMovieTile() {
      if(this.props.moreInfoActive) {
        this.setState({
          tileActive: true
        })
      } else {
        this.setState({
          tileActive: true
        })
      }
    }
    render() {
    	const props = this.props;
		return (
		  <section  
		  	  onMouseEnter={() => {
		  	  	props.mouseEnterInfo(props.movie)
		  	  	if(props.moreInfoActive) {
		  	  		this.setActiveMovieTile()
		  	  	}
		  	  }}
		  	  onClick={() => {
		  	  	props.displayMoreInfo(props.movie)
		  	  	this.setActiveMovieTile()
		  	  }}
		  	  className={this.state.tileActive && props.moreInfoMovie.id === props.movie.id
	                        ? 'movieTile-active' : 'movieTile'} 
	          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`}}>
		      <div className="tile__details">
		        <div className="tile__button">
		            <i className="fa fa-play"></i>
		        </div>
		        <div className="tile__title">
		          {props.movie.title}
		        </div>
		        <div className="tile__rating">
		          <span
		            style={{
		              color: props.movie.vote_average >= 7 ? 'green' : props.movie.vote_average >= 4 ? 'orange' : 'red'
		            }}>{props.movie.vote_average}</span> / 10
		        </div> 
		      </div>
		  </section>
		)	
    }
}

export default movieTile