import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const initialMovieList = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState(initialMovieList);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.state) {
      setMovie(location.state);
    } else {
      axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
          setMovie(res.data);
        })
        .catch(err => console.log("goofin hard bud... ", err));
    }
  }, []);

  const handleChanges = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
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
        type="string"
        name="title"
        onChange={handleChanges}
        placeholder="title"
        value={movie.title}
      />
      <input
        type="string"
        name="director"
        onChange={handleChanges}
        placeholder="director"
        value={movie.director}
      />
      <input
        type="string"
        name="metascore"
        onChange={handleChanges}
        placeholder="metascore"
        value={movie.metascore}
      />
      <input
        type="string"
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
