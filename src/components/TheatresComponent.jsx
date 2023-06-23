import React, { useContext, useState } from "react";
import { Accordion } from "react-bootstrap";
import "./styles/TheatreComponent.scss";
import Pin from "../assets/pin.png";
import Link from "../assets/link-icon.png";
import Rating from "../assets/rating-icon.png";
import TheatreSeat from "../assets/theatre-seat.png";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";
import BookingModal from "./BookingModal";
import axios from "axios";

const TheatresList = () => {
  const [showBookingModal,setShowBookingModal]=useState(false)
  const [bookingObject,setShowBookingObject]=useState()
  const [showCount,setShowCount]=useState(0)
  const {moviesList,setMoviesList} = useContext(AppContext);
  console.log(moviesList);
const {search}=useLocation()
const query=new URLSearchParams(search)
const movieName=query.get('movie')
console.log(movieName)
  const ShowDisplayContainer = ({ showCount, movieName, showTime,handleClick }) => {
    return (
      <div className="d-flex align-items-start flex-column show-box">
        <p className="mb-0">Show {showCount}:</p>
        <img
          className="show-image"
          src={
            moviesList?.movies.find((movie) => movie.movie_name === movieName)
              ?.thumbnail_url
          }
          alt=""
        />
        <p className="movie-name">{movieName}</p>
        <div className="show-time-box" onClick={()=>handleClick()}>
          <p className="show-time">{showTime}</p>
        </div>
      </div>
    );
  };
  const BookedShows = ({ showCount, show_booked_seats }) => {
    const bookedSeats=show_booked_seats.split(",").map((seat) => seat.replace(/[\[, \]]/g,'')).filter((seat)=>seat!=="")
    return (
      <div className="booked-seats-box">
        <p className="show-count">Show {showCount}:{" "}</p>
        <p className="booked-seats">{bookedSeats.map(seat=>seat).join(",")}</p>
      </div>
    );
  };
  const fetchList=(theatre_name)=>{
    const body = {
      user_mail_id: "sample@gmail.com",
    };
     axios.post(
      "https://zincubate.in/api/MovieTicketChecker?action=getAllDetails",
      body
    ).then((response)=>{
    setMoviesList(response.data)
    setShowBookingObject(response.data?.theatre?.find(theatre=>theatre.theatre_name===theatre_name))
    })
  }
  return (
    <div className="col-12 col-md-10 mx-0 theatres-list mx-md-auto">
      <BookingModal show={showBookingModal} fetchList={fetchList} onClose={()=>setShowBookingModal(false)} bookingObject={bookingObject} showCount={showCount}  />
      {moviesList?.theatre?.filter(theatre=>movieName?Object.values(theatre).includes(movieName):true).map((theatre) => (
        <div key={theatre.theatre_name} className="theatre-card">
          <div className="d-flex col-12 col-md-6 col-lg-4 flex-column align-items-start me-3 align-self-start">
            <img
              className="theatre-image"
              src={theatre.thumbnail_url}
              alt={"theatre"}
            />
            <p className="theatre-name mt-2">{theatre.theatre_name}</p>
            <p className="rating">
              <img src={Rating} alt="rating" />
              Customer Ratings: {theatre.customer_rating}/5
            </p>
            <p className="address">
              <img src={Link} className="me-1" alt="link" />
              <a href={theatre.website} rel="noreferrer" target="_blank">
                {theatre.website}
              </a>
            </p>
            <p className="address">
              <img src={Pin} alt="location" /> {theatre.address}
            </p>
          </div>
          <div className="d-flex flex-column align-items-start">
            <p className="show-timings">Show Timings</p>
            <div className="d-flex shows-container  ">
              {(!movieName||movieName==theatre.show1_movie)&&<ShowDisplayContainer
                showCount={1}
                movieName={theatre.show1_movie}
                showTime={theatre.show1_time}
                handleClick={()=>{setShowBookingModal(true);setShowBookingObject(theatre);setShowCount(1)}}
              />}
              {(!movieName||movieName==theatre.show2_movie)&&<ShowDisplayContainer
               showCount={2}
                movieName={theatre.show2_movie}
                showTime={theatre.show2_time}
                handleClick={()=>{setShowBookingModal(true);setShowBookingObject(theatre);setShowCount(2)}}

              />}
              {(!movieName||movieName==theatre.show3_movie)&&<ShowDisplayContainer
                showCount={3}
                movieName={theatre.show3_movie}
                showTime={theatre.show3_time}
                handleClick={()=>{setShowBookingModal(true);setShowBookingObject(theatre);setShowCount(3)}}

              />}
              {(!movieName||movieName==theatre.show4_movie)&&<ShowDisplayContainer
                showCount={4}
                movieName={theatre.show4_movie}
                showTime={theatre.show4_time}
                handleClick={()=>{setShowBookingModal(true);setShowBookingObject(theatre);setShowCount(4)}}

              />}
            </div>
            {theatre?.booked_seats && (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <p className="show-timings mt-3">Booked Seats</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    {theatre?.booked_seats?.map((show) => (
                      <div className="d-flex flex-column align-items-start booked-dates">
                        <p className="show-date">
                          <img src={TheatreSeat} alt="seat" /> {show.date}:
                        </p>
                        <div className="booked-seats-container">
                        {show?.show1_booked_seats && (
                          <BookedShows
                            showCount={1}
                            show_booked_seats={show?.show1_booked_seats}
                          />
                        )}
                        {show?.show2_booked_seats && (
                          <BookedShows
                            showCount={2}
                            show_booked_seats={show?.show2_booked_seats}
                          />
                        )}
                        {show?.show3_booked_seats && (
                          <BookedShows
                            showCount={3}
                            show_booked_seats={show?.show3_booked_seats}
                          />
                        )}
                        {show?.show4_booked_seats && (
                          <BookedShows
                            showCount={4}
                            show_booked_seats={show?.show4_booked_seats}
                          />
                        )}
                        </div>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}

           
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheatresList;
