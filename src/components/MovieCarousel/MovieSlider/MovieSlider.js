import React from 'react'
import Slider from 'react-slick'

function MovieSlider(props) {
    const movies = props.movies.map((movie, index) => {
      return (
        <div 
          className="movieTile" 
          key={index}>
            <div className="tile_media">
              <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" className="tile_img"/>
            </div>
            <div className="tile__details">
              <div className="tile__title">
                {movie.title}
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
