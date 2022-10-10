import React, {useState, useEffect}  from "react";
import { useParams } from 'react-router-dom';
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails/";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovie, getMovieImages } from "../api/tmdb-api";

const MoviePage = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getMovie(id).then((movie) => {
      setMovie(movie);
    });
  }, [id]);

  useEffect(() => {
    getMovieImages(id).then((images) => {
      setImages(images);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {movie ? (
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}>
              <ImageList
                cellHeight={500}
                sx={{
                  height: "100vh",
                }}
                cols={1}
                >
                {images.map((image) => (
                  <ImageListItem
                  key={image.file_path}
                  cols={1}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.file_path}
                      />
                  </ImageListItem>
                ))}
              </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;