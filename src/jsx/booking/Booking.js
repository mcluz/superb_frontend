import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap'

import Calendar from "./Calendar";
import BookingForm from "./BookingForm";

class BookTable extends Component {

    currentDate = null;
    bookingForm = null;
    calendar = null;
    modalVisible = false;
    

    constructor(props) {
        super(props);
        this.calendar = React.createRef();
        this.bookingForm = React.createRef();
    }
  
    calendarClick = (date) => {
        this.currentDate = date;
        this.bookingForm.current.setDate(date);
    }

    bookingUpdate = () => {
        this.calendar.current.listBookings();
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
            <div class="w-75 justify-content-center booking-container">
                <div className="row mt-4 justify-content-center">
                    <div className="col-lg-7">
                        <Calendar ref={this.calendar} click={this.calendarClick}/>
                        <BookingForm ref={this.bookingForm} update={this.bookingUpdate} success={this.bookingSuccess}/>
                    </div>
                </div>
                <Modal className="fade justify-content-center text-center" ref={this.modal} show={this.modalVisible}>
                    <Modal.Body>Your booking has been confirmed.</Modal.Body>
                    <Modal.Footer class="justify-content-center row">
                        <Button variant="primary mb-4 mt-4" onClick={() => {this.showModal(false)}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


export default BookTable;
