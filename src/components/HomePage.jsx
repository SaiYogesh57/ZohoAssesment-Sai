import React, { useContext } from "react";
import { AppContext } from "../App";
import "./styles/HomePage.scss";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../assets/heart-icon.png";
import { Carousel } from "react-bootstrap";

const HomePage = () => {
  const moviesList = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Carousel>
        {moviesList?.theatre?.slice(0, 3).map((theatre) => (
          <Carousel.Item interval={3000}>
            <img
              src={theatre.thumbnail_url}
              className="banner-image"
              alt="theatre-logo"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="carousel-container">
        <p className="quote">Experience the Art, Experience the Life</p>
        <p className="zoho-movies">- Zoho Movies</p>
      </div>

      <div class="section-header">
        <p class="title">Top Rated Movies</p>
        <button
          type="button"
          onClick={() => navigate("/movies")}
          class="view-all-button btn btn-primary"
        >
          View All
        </button>
      </div>
      <div className="row section-contents">
        {moviesList?.movies?.sort((a,b)=>b.imdb_rating-a.imdb_rating).slice(0, 4).map((movie) => (
          <div class="card-container col-xl-3 col-6">
            <div class="display-card  card">
              <div class="card-image">
                <img src={movie.thumbnail_url} alt="card" class="image" />
              </div>
              <div class="card-content">
                <p class="title">{movie.movie_name}</p>
                <p class="subtitle">
                  <img className="rating-image" alt="rating" src={HeartIcon} />
                  IMDB Ratings: {movie.imdb_rating}/10
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div class="section-header mt-3">
        <p class="title">Theatres</p>
        <button
          onClick={() => navigate("/theatres")}
          type="button"
          class="view-all-button btn btn-primary"
        >
          View All
        </button>
      </div>
      <div className="row section-contents mb-4">
        {moviesList?.theatre?.sort((a,b)=>b.customer_rating-a.customer_rating).slice(0, 4).map((theatre) => (
          <div class="card-container col-xl-3 col-6">
            <div class="display-card  card">
              <div class="card-image">
                <img src={theatre.thumbnail_url} alt="card" class="image" />
              </div>
              <div class="card-content">
                <p class="title">{theatre.theatre_name}</p>
                <p class="subtitle">
                  <img className="rating-image" alt="rating" src={HeartIcon} />
                  Customer Ratings: {theatre.customer_rating}/5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
