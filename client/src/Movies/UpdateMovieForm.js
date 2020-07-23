import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialMovieVals = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState(initialMovieVals);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    console.log(props.movieList);
    const movieToUpdate = props.movieList.find(items => `${items.id}` === id);
    console.log(movieToUpdate);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, id]);

  const handleChanges = e => {
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value);
    } else if (e.target.name === "stars") {
      value = value.split(",");
      console.log(value);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  // put
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        const newMovieList = [...props.movieList];
        props.setMovieList(newMovieList);
        history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        onChange={handleChanges}
        placeholder="title"
        value={movie.title}
      />
      <input
        type="text"
        name="director"
        onChange={handleChanges}
        placeholder="director"
        value={movie.director}
      />
      <input
        type="number"
        name="metascore"
        onChange={handleChanges}
        placeholder="metascore"
        value={movie.metascore}
      />
      <input
        type="text"
        name="stars"
        onChange={handleChanges}
        placeholder="stars"
        value={movie.stars}
      />
      <button>UPDATE</button>
    </form>
  );
};

export default UpdateMovieForm;
