import React, { Component } from "react";
import { Button } from 'react-bootstrap'
import axios from '../../services/AxiosInstance';

class BookingForm extends Component {

    name = null;
    mail = null;
    date = null;
    time = null;
    guests = 0;
    times = [];
    open = 0;
    close = 23;
    bookings = [];
    lastButton = null;

    nameInput = null;
    mailInput = null;
    guestsInput = null;

    props = null;

    constructor(props) {
        super(props);
        this.props = props;
        this.nameInput = React.createRef();
        this.mailInput = React.createRef();
        this.guestsInput = React.createRef();
        this.listBookings();
        this.getTimeRange();
    }

    listBookings = () => {
        axios.get(`booking`).then((response) => {
            this.bookings = response.data;
            this.forceUpdate();
         });
    }

    setDate = (date) => {
        this.date = date;
        this.setTimeArray();
        this.forceUpdate();
    }

    setTimeArray = () => {
        if (!this.date) return;
        this.times = new Array();
        var length = this.close < this.open ? 24 - this.open + this.close : this.close - this.open;
        for (var a = 0; a < length; a++) {
            var time = (a + this.open) % 24;
            var available = this.getDailyBookings(this.date.dateStr, time) ? false : true;
            this.times.push({title:`${this.getNumber(time)}:00`, value:time, available:available });
        }
    }

    getDailyBookings = (dayStr, time) => {
        var length = this.bookings.length;
        for (var a = 0; a < length; a++) {
            if (this.bookings[a].date == dayStr && this.bookings[a].time == time) return this.bookings[a];
        }
        return null;
    }

    getTimeRange = () => {
        axios.get(`config/timerange`).then((response) => {
           this.open = response.data.open;
           this.close = response.data.close;
           this.setTimeArray();
           this.forceUpdate();
        });
     }

    getNumber = (value) => {
        if (value < 10) return "0" + value;
        return value;
    }

    onSubmitClick = () => {
        if (!this.name || !this.mail || !this.guests || this.guests <= 0 || !this.time) return;
        var data = { name:this.name, mail:this.mail, date:this.date.dateStr, time:this.time, guests:this.guests }
        axios.post(`booking`, data).then((response) => {
            this.clean();
            this.listBookings();
            this.props.success();
            this.props.update();
        });
    }

    clean = () => {
        this.date = null;
        this.time = null;
        this.name = "";
        this.mail = "";
        this.guests = "";        
        this.nameInput.current.value = "";
        this.mailInput.current.value = "";
        this.guestsInput.current.value = 0;
    }
    
    nameChange = (evt) => {
        this.name = evt.target.value;
    }

    mailChange = (evt) => {
        this.mail = evt.target.value;
    }

    guestsChange = (evt) => {
        this.guests = evt.target.value;
    }

    timeClick = (evt) => {
        this.time = evt.target.value;
        evt.target.selected = true;
        if (this.lastButton != null) {
            this.lastButton.classList.remove("btn-success");
        }
        this.lastButton = evt.target;
        this.lastButton.classList.add("btn-success");
    }
  
    render() {
        
        return (
            <div className="animated fadeIn">
                <div className='card'>
                    <div className='card-body'>
                        <div className='basic-form'>
                            <form onSubmit={(e) => e.preventDefault()}>
                            { this.date != null ? 
                                <div className='form-group mr-0 animated fadeIn'>
                                    <label className='col-sm-12 m-0 row justify-content-center'><b>{this.date.dateStr}</b></label>
                                    <label className='col-sm-12 m-0 mt-2 row justify-content-center'>Choose a time</label>                                    
                                    <div className='card-body row justify-content-center'>
                                        { this.times.map(item => {
                                        return (<Button className='m-2 col-sm-2 animated fadeIn' value={item.value} onClick={this.timeClick} block={!item.available} disabled={!item.available ? 'disabled' : ''} variant={item.available ? 'primary btn-rounded' : 'light btn-rounded'}>{item.title}</Button>)
                                        })}
                                    </div>
                                </div> : null }
                                <div className='form-group row'>
                                    <label className='col-sm-2 col-form-label'>Name</label>
                                    <div className='col-sm-10'>
                                        <input className='form-control' ref={this.nameInput} onChange={this.nameChange} placeholder='Name'/>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-sm-2 col-form-label'>E-Mail</label>
                                    <div className='col-sm-10'>
                                        <input type='email' onChange={this.mailChange} ref={this.mailInput} className='form-control' placeholder='E-mail'/>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-sm-2 col-form-label'>Guests</label>
                                    <div className='col-sm-10'>
                                        <input type='number' onChange={this.guestsChange} ref={this.guestsInput} className='form-control' placeholder='How many guests?'/>
                                    </div>
                                </div>
                                <div className='form-group row justify-content-center'>
                                    <div className=''>
                                        <button type='submit' disabled={this.date == null} onClick={this.onSubmitClick} className='btn btn-primary'>Booking</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingForm;