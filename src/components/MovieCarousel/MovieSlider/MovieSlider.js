import React from 'react'

function MovieSlider(props) {
    const movies = props.movies.map((movie, index) => {
      return (
        <div 
          onMouseEnter={() => props.mouseEnterInfo(props.movies[index])}
          onClick={() => props.displayMoreInfo(props.movies[index])}
          className="movieTile" 
          key={index}>
            <div className="tile_media">
              <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" className="tile_img"/>
            </div>
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

export default MovieSlider
