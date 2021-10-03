import React from "react";

import "./stylesheets/App.css";
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";
import requests from "../requests";

function App() {
  return (
    <div className="App">
      {/* Nav */}
      <Nav />
      {/* Banner */}
      <Banner />
      <Row
        isLargeRow
        fetchURL={requests.fetchNetflixOriginals}
        title="Netflix Originals"
      />
      <Row fetchURL={requests.fetchTrending} title="Trending Now" />
      <Row fetchURL={requests.fetchTopRated} title="Top Rated" />
      <Row fetchURL={requests.fetchActionMovies} title="Action Movies" />
      <Row fetchURL={requests.fetchComedyMovies} title="Comedy Movies" />
      <Row fetchURL={requests.fetchHorrorMovies} title="Horror Movies" />
      <Row fetchURL={requests.fetchRomanceMovies} title="Romance Movies" />
      <Row fetchURL={requests.fetchDocumentaries} title="Documentary Movies" />
    </div>
  );
}

export default App;
