import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const UpcomingMoviesPage = (props) => {

  // const [movies, setMovies] = useState([]);
  const {  data, error, isLoading, isError }  = useQuery('discoverUpcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  // const addToFavorites = (movieId) => {
  //   const updatedMovies = movies.map((m) =>
  //     m.id === movieId ? { ...m, favorite: true } : m
  //   );
  //   setMovies(updatedMovies);
  // };

  // useEffect(() => {
  //   getUpcomingMovies().then(movies => {
  //     setMovies(movies);
  //   });
  // }, []);
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}    />
  );
};

export default UpcomingMoviesPage;