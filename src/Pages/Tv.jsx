import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";



const apiKey = "8e834877d3687bad9ae0275838524cb9";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Tv = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=5`);
      setUpcomingMovies(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=5`);
      setNowPlayingMovies(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&page=5`);
      setPopularMovies(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&page=5`);
      setTopRatedMovies(results);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <section className="home" style={{backgroundColor:"black"}}>
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[4]
            ? `url(${`${imgUrl}/${popularMovies[4].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[4] && <h1>{popularMovies[4].original_title}</h1>}
        {popularMovies[4] && <p>{popularMovies[4].overview}</p>}

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
      
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Upcoming"} arr={upcomingMovies} />

      <Row title={"Top Rated"} arr={topRatedMovies} />
    </section>
  );
};

export default Tv;
