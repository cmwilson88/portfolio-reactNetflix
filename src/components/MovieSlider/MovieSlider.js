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


// import React from 'react'
// import Whirligig from 'react-whirligig'
 
// const MovieSlider = (props) => {
//   let track
//   const next = () => track.next()
//   const prev = () => track.prev()

//   const movies = props.movies.map((movie, index) => {
//     return (
//       <div className="testMovie" key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}></div>
//     )
//   })
   
//   return (
//     <div className="movieCarousel">
//       <button onClick={prev}>Prev</button>
//       <Whirligig
//         // gutter="1em"
//         visibleSlides={5}
//         slideTo={4}
//         ref={(_trackInstance) => { track = _trackInstance}}
//       >
//         {movies}
//       </Whirligig>
//       <button onClick={next}>Next</button>
//     </div>
//   )
// }

export default MovieSlider
