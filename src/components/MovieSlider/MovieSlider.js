import React from 'react'
// import './movieSlider.css'

function MovieSlider(props)  {
    const movies = props.movies.map((movie, index) => {
      return (
        <div className="testMovie" key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}></div>
      )
    })
    return (
      <div className="moviesCarousel">{movies}</div>
    );
  }

export default MovieSlider
