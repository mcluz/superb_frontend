import React, { Component } from "react";
import { Row, Col, Card, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import axios from '../../services/AxiosInstance';

class BookingForm extends Component {

    open = 0;
    close = 0;
    times = [];
    props = null;

    constructor(props) {
        super(props);
        this.props = props;
        this.getTimeRange();
        this.setTimeArray();
    }

    setDate = (date) => {
        this.date = date;
        this.forceUpdate();
    }

    setTimeArray = () => {
        for (var a = 0; a < 24; a++) {
            this.times.push({str:`${this.getNumber(a)}:00`, value:a });
        }
    }

    getNumber = (value) => {
        if (value < 10) return "0" + value;
        return value;
    }

    getTimeRange = () => {
        axios.get(`config/timerange`).then((response) => {
           console.log(response);
           this.open = response.data.open;
           this.close = response.data.close;
           this.forceUpdate();
        });
     }

    setTimeRange = () => {
        axios.post(`config/timerange`, {open:this.open, close:this.close}).then((response) => {
            this.forceUpdate();
            this.props.update();
         });
    }    

    onOpenChange = (evt) => {
        this.open = evt.target.value;
        this.setTimeRange();
    }

    onCloseChange = (evt) => {
        this.close = evt.target.value;
        this.setTimeRange();
    }
  
  
    render() {
        
        return (
            <div className="animated fadeIn">
                <div className='card'>
                    <div className='card-body'>
                        <div class="row justify-content-center">
                            <div class="">
                                <h5 className="modal-title mb-4">Time Range</h5>
                            </div>
                        </div>
                            <div class="row justify-content-center">
                                <div className='input-group mb-2' style={{ width: '200px' }}>
                                    <div className='input-group-prepend'>
                                        <label className='input-group-text'>Open</label>
                                    </div>
                                    <select defaultValue={0} value={this.open} onChange={this.onOpenChange}  className='form-control form-control-lg' >
                                        { this.times.map(item => {
                                            return (<option value={item.value}>{item.str}</option>)
                                        })}
                                    </select>
                                </div>                                
                                <div className='ml-4 input-group mb-2' style={{ width: '200px' }}>
                                    <div className='input-group-prepend'>
                                        <label className='input-group-text'>Close</label>
                                    </div>
                                    <select defaultValue={0} value={this.close} onChange={this.onCloseChange} className='form-control form-control-lg' >
                                        { this.times.map(item => {
                                            return (<option value={item.value}>{item.str}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingForm;