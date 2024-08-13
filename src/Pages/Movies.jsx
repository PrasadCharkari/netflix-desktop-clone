import React from "react";
import useMoviesData from "../Hooks/useMoviesData";
import Row from "../Components/Row";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "8e834877d3687bad9ae0275838524cb9";
const url = "https://api.themoviedb.org/3";
const endpoints = {
  upcoming: "upcoming",
  nowPlaying: "now_playing",
  popular: "popular",
  topRated: "top_rated",
};
const imgUrl = "https://image.tmdb.org/t/p/original";

const Movies = () => {
  const { upcoming, nowPlaying, popular, topRated, loading, error } =
    useMoviesData(apiKey, url, endpoints, 3);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="home" style={{ backgroundColor: "black" }}>
      <div
        className="banner"
        style={{
          backgroundImage: popular[8]
            ? `url(${imgUrl}/${popular[8].poster_path})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popular[8] && <h1>{popular[8].original_title}</h1>}
        {popular[8] && <p>{popular[8].overview}</p>}
        <div>
          <button>
            <BiPlay />
            Play
          </button>
          <button>
            My List
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title="Upcoming" arr={upcoming} />
      <Row title="Now Playing" arr={nowPlaying} />
      <Row title="Popular" arr={popular} />
      <Row title="Top Rated" arr={topRated} />
    </section>
  );
};

export default Movies;
