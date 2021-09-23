import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

import TableItem from "./TableItem";
import axios from '../../services/AxiosInstance';

class EventCalendar extends Component {

   tables = [];

   componentDidMount() {
      this.loadTables();
   }

   loadTables() {
      console.log("LOAD TABLE")
      axios.get(`tables/list`).then((response) => {
         this.tables = response.data;
         this.forceUpdate();
         console.log("UPDATED!");
         console.log(this.tables.length);
      });
   }

   addTable = async() => {
      axios.post('tables/add').then((response) => {
         this.loadTables();
      });
   }

   render() {
      return (
         <div className="animated fadeIn">
            <Row>
               <Col lg={12}>
                  <Card>
                     <Card.Body>
                         <div class="row justify-content-center">
                         <div class="">
                            <h5 className="modal-title mb-2">Current Tables: {this.tables.length}</h5>
                            <div className="d-flex" id="">
                                <button type='submit' className='btn btn-primary' onClick={this.addTable}>Add Table</button>
                            </div>
                        </div>
                        </div>
                        <div className="" id="">
                            <Row>
                              { this.tables.map(table => {
                                 return (<Col lg={2}><TableItem id={table._id} update={this.loadTables.bind(this)}/></Col>)
                              })}
                            </Row>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}

export default EventCalendar;
