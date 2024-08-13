import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  upcoming: [],
  nowPlaying: [],
  popular: [],
  topRated: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        [action.payload.key]: action.payload.data,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const useMoviesData = (apiKey, url, endpoints, page = 1) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          upcomingResponse,
          nowPlayingResponse,
          popularResponse,
          topRatedResponse,
        ] = await Promise.all([
          axios.get(
            `${url}/movie/${endpoints.upcoming}?api_key=${apiKey}&page=${page}`
          ),
          axios.get(
            `${url}/movie/${endpoints.nowPlaying}?api_key=${apiKey}&page=${page}`
          ),
          axios.get(
            `${url}/movie/${endpoints.popular}?api_key=${apiKey}&page=${page}`
          ),
          axios.get(
            `${url}/movie/${endpoints.topRated}?api_key=${apiKey}&page=${page}`
          ),
        ]);

        dispatch({
          type: "FETCH_SUCCESS",
          payload: { key: "upcoming", data: upcomingResponse.data.results },
        });
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { key: "nowPlaying", data: nowPlayingResponse.data.results },
        });
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { key: "popular", data: popularResponse.data.results },
        });
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { key: "topRated", data: topRatedResponse.data.results },
        });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error });
      }
    };

    fetchMovies();
  }, [apiKey, url, endpoints, page]);

  return state;
};

export default useMoviesData;
