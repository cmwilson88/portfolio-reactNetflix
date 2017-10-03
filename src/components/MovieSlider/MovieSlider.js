// import React, { Component } from 'react'
// import Slider from 'react-slick'

// export default class MovieSlider extends Component {
//   render() {
//     var settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToScroll: 7,
//       slidesToShow: 7
//     };

//     const movies = this.props.movies.map((movie, index) => {
//       return (
//         <div className="testMovie" key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`}}></div>
//       )
//     })
//     return (
//       <div>
//         <h2>Uneven sets (infinite)</h2>
//         <Slider {...settings}>
//           {movies}
//         </Slider>
//       </div>
//     );
//   }
// }


import React from 'react'
import Whirligig from 'react-whirligig'
 
const MovieSlider = (props) => {
  let track
  const next = () => track.next()
  const prev = () => track.prev()

  const movies = props.movies.map((movie, index) => {
    return (
      <div className="testMovie" key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}></div>
    )
  })
   
  return (
    <div className="movieCarousel">
      <button onClick={prev}>Prev</button>
      <Whirligig
        gutter="1em"
        ref={(_trackInstance) => { track = _trackInstance}}
      >
        {movies}
      </Whirligig>
      <button onClick={next}>Next</button>
    </div>
  )
}

export default MovieSlider