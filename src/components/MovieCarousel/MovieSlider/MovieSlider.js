import React, {Component} from 'react'
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
          // <div 
          //   key={index}>
          //     <div className="tile__details">
          //       <div className="tile__button">
          //           <i className="fa fa-play"></i>
          //       </div>
          //       <div className="tile__title">
          //         {movie.title}
          //       </div>
          //       <div className="tile__rating">
          //         <span
          //           style={{
          //             color: movie.vote_average >= 7 ? 'green' : movie.vote_average >= 4 ? 'orange' : 'red'
          //           }}>{movie.vote_average}</span> / 10
          //       </div> 
          //     </div>
          // </div>
