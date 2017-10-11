import React, {Component} from 'react'

class MovieSlider extends Component {
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
          tileActive: false
        })
      } else {
        this.setState({
          tileActive: true
        })
      }
    }

    render() {
      const props = this.props
      const movies = props.movies.map((movie, index) => {
        return (
          <div 
            onMouseEnter={() => {
              props.mouseEnterInfo(props.movies[index])
            }}
            onClick={() => {
              props.displayMoreInfo(props.movies[index])
              this.setActiveMovieTile()
            }}
            className="movieTile" 
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                    outline: this.state.tileActive && this.props.moreInfoMovie.id === movie.id  
                            ? '3px solid #fff' 
                            : 'none'
                    }}
            key={index}>
              <div className="tile__details">
                <div className="tile__button">
                    <i className="fa fa-play"></i>
                </div>
                <div className="tile__title">
                  {movie.title}
                </div>
                <div className="tile__rating">
                  <span
                    style={{
                      color: movie.vote_average >= 7 ? 'green' : movie.vote_average >= 4 ? 'orange' : 'red'
                    }}>{movie.vote_average}</span> / 10
                </div> 
              </div>
          </div>
        )
      })
      return (
        <div>
            {movies}
        </div>
      );
    }
  }

export default MovieSlider
