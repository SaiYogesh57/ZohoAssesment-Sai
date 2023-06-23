import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import TheatreSeatEmpty from "../assets/theatre-seat-empty.png"
import TheatreSeatOccupied from "../assets/theatre-seat-occupied.png"
import TheatreStage from "../assets/theatre-stage.png"
import "./styles/BookingModal.scss"

const BookingModal = ({ show, onClose, bookingObject, showCount,fetchList }) => {

    const EmptySeats = [...Array(100).keys()]
    const [newlyBookedSeats, setNewlyBookedSeats] = useState([])
    const [bookingResponse, setBookingResponse] = useState("")
    const [alreadyBookedSeats, setAlreadyBookedSeats] = useState([])
    const [bookingDate, setBookingDate] = useState(new Date())
    const datesArray = [...Array(5).keys()].map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date;
    })
console.log(bookingObject,'list')
    const handleBookedSeats = (seatNo) => {
        const newSeats = JSON.parse(JSON.stringify(newlyBookedSeats))
        const findIndex = newSeats.findIndex((seat) => seat === seatNo)
        newSeats?.includes(seatNo) ? newSeats.splice(findIndex, 1) : newSeats.push(seatNo)
        setNewlyBookedSeats(newSeats)
    }
    useEffect(()=>{
        setBookingDate(new Date())
    },[])
    useEffect(() => {
        if (showCount > 0) {
            const bookedDate = new Date(bookingDate).toJSON()?.slice(0, 10)?.split('-').reverse().join('/')
            const bookedSeats = bookingObject?.booked_seats?.find((booking) => booking.date === bookedDate)
            const bookedSeatsObj = bookedSeats?.[`show${showCount}_booked_seats`]?.split(",").map((seat) => seat.replace(/[\[, \]]/g, '')).filter((seat) => seat !== "").map((seat) => Number(seat))
            setAlreadyBookedSeats(bookedSeatsObj)
        }
    }, [bookingDate,showCount,bookingObject])
    const handleSubmitBooking = () => {
        const requestObj = {
            show_time:bookingObject[`show${showCount}_time`],
            movie_name:bookingObject[`show${showCount}_movie`],
            theatre_name:bookingObject.theatre_name,
            user_mail_id:"sample@gmail.com",
            date:bookingDate.toJSON()?.slice(0, 10)?.split('-').reverse().join('/'),
            booked_seats:newlyBookedSeats
        }
        axios.post("https://zincubate.in/api/MovieTicketChecker?action=bookSeats",requestObj).then( (response)=>{
            setBookingResponse(response.data.message)
            setNewlyBookedSeats([])
          
          fetchList(bookingObject.theatre_name)
        })
    }
    console.log(alreadyBookedSeats)

    return (
        <Modal size='xl' centered show={show} onHide={() => onClose()}>
            {showCount > 0 && <Modal.Body>
                <p className='movie_name'>{bookingObject[`show${showCount}_movie`]}</p>
                <p>Show Timing: {bookingObject[`show${showCount}_time`]}</p>
                <div className='d-flex'>
                    {datesArray.map((date)=>
                        <div className={`booking-date ${bookingDate.setHours(0,0,0,0)===date.setHours(0,0,0,0)?"booked-today":""}`} onClick={()=>{
                            setBookingDate(date);setBookingResponse("");setNewlyBookedSeats([])}}>{date.toJSON()?.slice(0, 10)?.split('-').reverse().join('/')}</div>
                    )}
                </div>
            {bookingResponse&&<p className={`booking-response`}>{bookingResponse}</p>}
                <div className='seats-container'>
                    <div className='seats-box'>

                        {EmptySeats.slice(0, 50).map((seat) => <>
                            {(newlyBookedSeats?.includes(seat + 1) || alreadyBookedSeats?.includes(seat + 1)) ?

                                <div className='d-flex flex-column align-items-center'>
                                    <img onClick={() => handleBookedSeats(seat + 1)} className={alreadyBookedSeats?.includes(seat + 1) ? "cursor-not-allowed" : ""} src={TheatreSeatOccupied} />
                                    <p>{seat + 1}</p>
                                </div> :
                                <div className='d-flex flex-column align-items-center'>
                                    <img src={TheatreSeatEmpty} onClick={() => handleBookedSeats(seat + 1)} />
                                    <p>{seat + 1}</p>
                                </div>
                            }
                        </>)}
                    </div>
                    <div className='seats-box'>
                        {EmptySeats.slice(50, 100).map((seat) => <>
                            {(newlyBookedSeats?.includes(seat + 1) || alreadyBookedSeats?.includes(seat + 1)) ?

                                <div className='d-flex flex-column align-items-center'>
                                    <img onClick={() => handleBookedSeats(seat + 1)} className={alreadyBookedSeats?.includes(seat + 1) ? "cursor-not-allowed" : ""} src={TheatreSeatOccupied} />
                                    <p>{seat + 1}</p>
                                </div> :
                                <div className='d-flex flex-column align-items-center'>
                                    <img src={TheatreSeatEmpty} onClick={() => handleBookedSeats(seat + 1)} />
                                    <p>{seat + 1}</p>
                                </div>
                            }
                        </>)}
                    </div>
                </div>
                <div className='d-flex justify-content-center mt-2'>
                    <img src={TheatreStage} alt="stage" />
                </div>
                <div className='d-flex justify-content-end mt-2'>
                    <Button onClick={()=>handleSubmitBooking()} className='book-button'>Book </Button>
                </div>
            </Modal.Body>}
        </Modal>
    )
}

export default BookingModal