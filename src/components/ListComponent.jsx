import React, { useContext, useEffect, useState } from "react";
import "./styles/ListComponent.scss";
import { AppContext } from "../App";

const ListComponent = () => {
  const moviesList = useContext(AppContext);
  const [filteredMoviesList, setFilteredMoviesList] = useState(
    moviesList?.movies
  );
  const [selectedFiltertag, setSelectedFiltertag] = useState("");
  const [selectedLanguagetag, setSelectedLanguagetag] = useState("");
  useEffect(() => {
    setFilteredMoviesList(moviesList?.movies);
  }, [moviesList]);
  useEffect(() => {
    const result = filteredMoviesList?.filter((movie) => {
      return movie.tags.indexOf(selectedFiltertag) > -1;
    });
    setFilteredMoviesList(result);
  }, [selectedFiltertag]);
  useEffect(() => {
    const result = filteredMoviesList?.filter((movie) => {
      return movie.language.indexOf(selectedLanguagetag) > -1;
    });
    setFilteredMoviesList(result);
  }, [selectedLanguagetag]);

  const tagsArray = [];
  const languagesArray = [];
  moviesList?.movies?.map((movie) =>
    movie.tags.split(",").map((tag) => tagsArray.push(tag))
  );
  moviesList?.movies?.map((movie) =>
    movie.language.split(",").map((language) => languagesArray.push(language))
  );
  console.log(moviesList);
  return (
    <div className="movies-list-page">
      <p className="header">Currently Showing</p>
      <div className="filters col-10 mx-auto">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <p className="heading">Filters</p>
          <p
            className="clear-filter"
            onClick={() => {
              setSelectedLanguagetag("");
              setSelectedFiltertag("");
              setFilteredMoviesList(moviesList?.movies);
            }}
          >
            Clear Filters
          </p>
        </div>
        <div className="d-flex flex-column align-items-start  mb-3">
          <p className="me-3 mb-2">Genre: </p>
          <div className="d-flex tags">
            {[...new Set(tagsArray)]?.map((tag) => (
              <div
                className={`tag ${
                  selectedFiltertag === tag ? "selected-tag" : ""
                }`}
                onClick={() => setSelectedFiltertag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          .
        </div>
        <div className="d-flex flex-column align-items-start mb-3 ">
          <p className="me-3 mb-2">Language:</p>
          <div className="d-flex tags">
            {[...new Set(languagesArray)]?.map((tag) => (
              <div
                className={`tag ${
                  selectedLanguagetag === tag ? "selected-tag" : ""
                }`}
                onClick={() => setSelectedLanguagetag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="movies-list col-12">
        {filteredMoviesList?.map((listItem) => (
          <div className="card" key={listItem?.movie_name}>
            <div className="image">
              <img src={listItem?.thumbnail_url} alt="movie logo" />
            </div>
            <div className="slide-content">
              <p className="title">{listItem?.movie_name}</p>
              <p className="tag">{listItem?.tags}</p>
              <div className="stars-section">
                <span className="stars">★</span>
                <span className="reviews">IMDB: {listItem.imdb_rating}/10</span>
              </div>
              <p className="release-date">
                {listItem?.release_date} , {listItem?.running_time}
              </p>
              <i className="mb-3">Languages: {listItem?.language}</i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
