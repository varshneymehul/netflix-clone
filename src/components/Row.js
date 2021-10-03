import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./stylesheets/Row.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

// ToDo
// 1. Have posters for all and on hover show Title with Backdrop poster
function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    // make a request to TMDB to load information
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchURL]); // we have to include fetchURL in dependencies because fetchURL variable is needed for async function to run.

  const opts = {
    height: "100%",
    width: "100%",
    controls: "1",
    origin: "https://www.youtube.com",
  };  

  const handleClick = (movie) => {
    //   If trailer is found clear the url
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // Search for movie trailer full url
      async function fetchVideos() {
        const videos = await axios.get(
          `${movie.media_type ? "movie" : "tv"}/${
            movie.id
          }/videos?api_key=4ba7879de7dc284639a7739f310bc0c5&language=en-US
`
        );
        const trailer = videos.data.results.filter(
          (video) => video.type === "Trailer"
        );
        
        // const finalURL = "https://www.youtube.com/watch?v="+trailer[0].key;
        setTrailerUrl(trailer[0].key);
      }
      fetchVideos();
    }
  };

  // destructuring props right here
  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>
      <div className="row__posters">
        {/* Containers with Posters */}

        {movies &&
          movies.map((movie) => {
            return (
              <img
                onClick={() => {
                  handleClick(movie);
                }}
                key={movie.id}
                className={`row__poster ${isLargeRow && `row__posterLarge`}`}
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title}
              />
            );
          })}
        {trailerUrl &&
        <div> <YouTube videoId={trailerUrl} opts={opts} />
        </div>}
      </div>
    </div>
  );
}

export default Row;
