import React, { Component } from "react";
import Calendar from "./Calendar";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import Tables from "./Tables";
import TimeRange from "./TimeRange";
import { Modal, Button } from 'react-bootstrap'

class BookingManager extends Component {

    currentDate = null;
    bookingForm = null;
    bookingList = null;
    calendar = null;
    timeRange = null;
    
    modalVisible = false;

    constructor(props) {
        super(props);
        this.bookingForm = React.createRef();
        this.bookingList = React.createRef();
        this.timeRange = React.createRef();
        this.calendar = React.createRef();
    }
  
    calendarClick = (date) => {
        this.currentDate = date;
        this.bookingForm.current.setDate(date);
        this.bookingList.current.setDate(date);
    }

    timeChange = () => {
        this.bookingForm.current.getTimeRange();
        this.calendar.current.getTimeRange();
    }

    bookingUpdate = () => {
        this.calendar.current.listBookings();
        this.bookingList.current.listBookings();
    }

    bookingSuccess = () => {
        this.showModal(true);
    }

    showModal = (value) => {
        this.modalVisible = value;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div class="w-75 justify-content-center booking-container">
                    <div className="row mt-4 justify-content-center">
                        <div className="col-lg-7">
                            <Calendar ref={this.calendar} click={this.calendarClick}/>
                            <BookingForm ref={this.bookingForm} update={this.bookingUpdate} success={this.bookingSuccess}/>
                        </div>
                        <div className="col-lg-5">
                            <BookingList ref={this.bookingList} update={this.bookingUpdate}/>
                            <Tables/>
                            <TimeRange update={this.timeChange}/>
                        </div>
                    </div>
                </div>
                <Modal className="fade justify-content-center text-center" ref={this.modal} show={this.modalVisible}>
                    <Modal.Body>Your booking has been confirmed.</Modal.Body>
                    <Modal.Footer class="justify-content-center row">
                        <Button variant="primary mb-4 mt-4" onClick={() => {this.showModal(false)}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BookingManager;