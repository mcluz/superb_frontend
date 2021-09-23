import React, { Component } from "react";
import { Row, Col, Card, Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import icon from "../../images/icons/table-icon.png";
import axios from '../../services/AxiosInstance';

class EventCalendar extends Component {

   constructor(props) {
      super(props);
   }

   removeTable = (item) => {
      axios.post(`tables/remove/${this.props.id}`).then((response) => {
         this.props.update();
      });
   }

   render() {
      return (
         <div className="animated fadeIn">
            <Card>
               <Card.Body>
                  <div className="profile-photo row justify-content-center">
                     <img src={icon} className="img-fluid rounded-circle"/>
                     <Button href="#" className="btn-sm btn-danger mt-2 ml-1" onClick={this.removeTable}>X</Button>
                  </div>
               </Card.Body>
            </Card>
         </div>
      );
   }
}

export default EventCalendar;
