import React, { Component, Suspense } from "react";
import { Modal, Button, Table } from 'react-bootstrap'
import axios from '../../services/AxiosInstance';

class BookingList extends Component {

    open = 0;
    close = 0;
    times = [];
    props = null;
    dayBookings = [];
    bookings = [];
    currentDate = null;

    modalVisible = false;

    constructor(props) {
        super(props);
        this.props = props;
        this.listBookings();
        setInterval(() => { this.listBookings() }, 1000);
    }

    listBookings = () => {
        axios.get(`booking`).then((response) => {
            this.bookings = response.data;
            if (this.currentDate) this.dayBookings = this.getDailyBookings();
            this.forceUpdate();
         });
    }

    setDate = (date) => {
        this.currentDate = date;
        this.dayBookings = this.getDailyBookings();
        this.forceUpdate();
    }

    getDailyBookings = () => {
        var length = this.bookings.length;
        var arr = [];
        for (var a = 0; a < length; a++) {
            if (this.bookings[a].date == this.currentDate.dateStr) arr.push(this.bookings[a]);
        }
        return arr;
    }

    cancelBooking = (bookingItem) => {
        console.log(bookingItem);
        axios.delete(`booking/${bookingItem._id}`).then((response) => {
            this.modalVisible = true;
            this.forceUpdate();
            this.props.update();
        });
    }

    getNumber = (value) => {
        if (value < 10) return "0" + value;
        return value;
    }

    showModal = (value) => {
        this.modalVisible = value;
        this.forceUpdate();
    }
  
    render() {
        
        return (
            <div className="animated fadeIn">
                <div className='card'>
                    <h3 class="mt-4 ml-4">Booking List {this.currentDate ? ' | ' + this.currentDate.dateStr : ''}</h3>
                    { !this.currentDate ? <strong class="m-4 text-center">SELECT A DATE TO CHECK BOOKINGS</strong> : (this.currentDate && !this.dayBookings.length) ?
                        <strong class="m-4 text-center">NO BOOKINGS FOR THIS DATE</strong>
                        :
                    <Table responsive>
                        <tr class="text-center">
                            <th>
                                <strong>NAME</strong>
                            </th>
                            <th>
                                <strong>TIME</strong>
                            </th>
                            <th>
                                <strong>GUESTS</strong>
                            </th>
                            <th></th>
                        </tr>
                        <tbody class="text-center">
                        {
                            this.dayBookings.map(item => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{this.getNumber(item.time) + ":00"}</td>
                                        <td>{item.guests}</td>
                                        <td>
                                            <Button href="#" className="btn-sm btn-danger mt-2 ml-1" onClick={() => { this.cancelBooking(item)}}>CANCEL</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                    }
              </div>
              <Modal className="fade justify-content-center text-center" ref={this.modal} show={this.modalVisible}>
                    <Modal.Body>Remove booking request has been added to queue.</Modal.Body>
                    <Modal.Footer class="justify-content-center row">
                        <Button variant="primary mb-4 mt-4" onClick={() => {this.showModal(false)}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default BookingList;