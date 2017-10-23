import React from 'react'
import MovieTile from './MovieTile/MovieTile'

function MovieSlider(props){
    const movies = props.movies.map((movie) => {
      return (
        <MovieTile
          movie={movie} 
          moreInfoActive={props.moreInfoActive}
          moreInfoMovie={props.moreInfoMovie}
          mouseEnterInfo={props.mouseEnterInfo}
          displayMoreInfo={props.displayMoreInfo}
          key={movie.id}/>
      )
    })
    return (
      <div>
          {movies}
      </div>
    );
  }

export default MovieSlider
