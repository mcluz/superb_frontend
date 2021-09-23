import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import Alert from "sweetalert2";
import axios from '../../services/AxiosInstance';

class EventCalendar extends Component {

    props = null;
    bookings = [];
    times = [];
    open = 0;
    close = 23;
    bookingLoaded = false;
    timesLoaded = false;

    AVAILABLE = '#328052'
    ALMOST_FULL = "#c95910"
    FULL = "#ad2210";
    PAST = "#454545";
    CLOSED = "#323232";

    dayItems = [];

    constructor(props) {
        super();
        this.props = props;
        this.listBookings();
        this.getTimeRange();
    }

    getTimeRange = () => {
        axios.get(`config/timerange`).then((response) => {
            this.open = response.data.open;
            this.close = response.data.close;
            this.timesLoaded = true;
            this.setTimeArray();
            this.updateDayItems();
        });
    }

    setTimeArray = () => {
        this.times = new Array();
        var length = this.close < this.open ? 24 - this.open + this.close : this.close - this.open;
        for (var a = 0; a < length; a++) {
            var time = (a + this.open) % 24;
            this.times.push({ value:time, available:true });
        }
    }

   state = {
      calendarEvents: [
         /*{
            title: "4 Guests",
            start: new Date("2021-09-04 00:00"),
            id: "99999998",
         },
         {
            title: "4 Guests",
            start: new Date("2021-09-04 01:00"),
            id: "99999998",
         },
         {
            title: "4 Guests",
            start: new Date("2021-09-04 02:00"),
            id: "99999998",
         },
         {
            title: "4 Guests",
            start: new Date("2021-09-04 03:00"),
            id: "99999999",
         },*/
      ],
      events: [
         { title: "Event 1", id: "1" },
         { title: "Event 2", id: "2" },
         { title: "Event 3", id: "3" },
         { title: "Event 4", id: "4" },
         { title: "Event 5", id: "5" },
      ],
   };

   /**
    * adding dragable properties to external events through javascript
    */
   componentDidMount() {
      
   }

   /**
    * when we click on event we are displaying event details
    */
   eventClick = (eventClick) => {
      console.log(this.props);
      console.log(eventClick);
      Alert.fire({
         title: eventClick.event.title,
         html:
            `<div className="table-responsive">
      <table className="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
            eventClick.event.title +
            `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
            eventClick.event.start +
            `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Remove Event",
         cancelButtonText: "Close",
      }).then((result) => {
         if (result.value) {
            eventClick.event.remove(); // It will remove event from the calendar
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });
   };

   handleDateClick = (item) => { // bind with an arrow function
      if (!item.dayEl.getAttribute('available')) return;
      //<div onClick={click}></div>
      this.props.click(item);
      return;
      Alert.fire({
         title: "Select ",
         html:
            `<div className="table-responsive">
               <table className="table">
                  <tbody>
                     <tr >
                        <td>Title</td>
                        <td><strong>${'Titulo'}</strong></td>
                     </tr>
                     <tr >
                        <td>Start Time</td>
                        <td><strong>${'Start'}</strong></td>
                     </tr>
                  </tbody>
               </table>
            </div>`,
         showCancelButton: true,
         confirmButtonColor: "#52b69a",
         cancelButtonColor: "#ffadad",
         confirmButtonText: "Reserve",
         cancelButtonText: "Close",
      }).then((result) => {
         if (result.value) {
            Alert.fire("Thanks!", "Your reserve has been made.", "success");
         }
      });
   }

    getDateNumber = (value) => {
        if (value < 10) return "0" + value;
        return value;
    }

    dayRendering = (data, a, b, c) => {
        if (data.dow == 0 || data.dow == 6) {
            data.el.style.backgroundColor = this.CLOSED;
        } else if (data.isPast) {
            data.el.style.backgroundColor = this.PAST;
        } else {
            this.dayItems.push(data);
            data.el.classList.add("calendar-item");
            data.el.setAttribute('available', true);
            data.el.style.backgroundColor = this.getDayColor(data);//Math.random() > 0.25 ? available : Math.random() > 0.35 ? almostFull : full;
        }
    }

    updateDayItems = () => {
        var length = this.dayItems.length;
        for (var a = 0; a < length; a++) {
            this.dayItems[a].el.style.backgroundColor = this.getDayColor(this.dayItems[a]);
        }
    }

    getDayColor = (data) => {
        if (!this.bookingLoaded) return this.AVAILABLE;
        if (!this.timesLoaded) return this.AVAILABLE;
        var date = new Date(data.date);
        var dateStr = `${date.getFullYear()}-${this.getDateNumber(date.getMonth() + 1)}-${this.getDateNumber(date.getDate())}`;
        var bookingsArr = this.getDailyBookings(dateStr);
        if (!bookingsArr.length) return this.AVAILABLE;
        if (bookingsArr.length >= this.times.length) return this.FULL;
        if (bookingsArr.length >= this.times.length / 2) return this.ALMOST_FULL;
        return this.AVAILABLE;
    }

    getDailyBookings = (dayStr) => {
        var length = this.bookings.length;
        var arr = []
        for (var a = 0; a < length; a++) {
            if (this.bookings[a].date == dayStr) arr.push(this.bookings[a]);
        }
        return arr;
    }

    listBookings = () => {
        axios.get(`booking`).then((response) => {
            this.bookings = response.data;
            this.bookingLoaded = true;
            this.updateDayItems();
        });
    }

   render() {
      return (
         <div className="animated fadeIn">
            <Row>
               <Col lg={12}>
                  <Card>
                     <Card.Body>
                        <div>
                           <FullCalendar
                              defaultView="dayGridMonth"
                              headerToolbar={{
                                 left: "title",
                                 center: "",
                                 right:"today,prev,next",
                              }}
                              rerenderDelay={0.1}
                              eventDurationEditable={true}
                              editable={false}
                              //droppable={true}
                              plugins={[
                                 dayGridPlugin,
                                 timeGridPlugin,
                                 interactionPlugin
                              ]}
                              
                              dayCellDidMount={this.dayRendering}
                              dateClick={this.handleDateClick}
                              weekends={true}
                           />
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
