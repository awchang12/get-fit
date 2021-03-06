import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import { Form, Button} from 'semantic-ui-react'

import 'react-datepicker/dist/react-datepicker.css';

export default class LogForm extends Component {
    state={
        date: moment()
    }

    handleChange = (date) => {
        console.log(date)
        this.setState({
          date: date
        });
      }

    
    
    render() {
        return(
    <Form className="signup" size='tiny' onSubmit={(event, date) => this.props.onSubmit(event, this.state.date )}>
        <Button basic size="small" color="teal" onClick={this.props.toggle}>back to Logs</Button> 
        <Form.Group widths='equal'>
          <Form.Input required type='number' fluid label='weight'  name="weight" placeholder='Weight' />  
        </Form.Group>
        <Form.Group widths='equal'> 
          <DatePicker required onChange={this.handleChange} name="date" maxDate={new Date()} selected={this.state.date}/>
        </Form.Group>
        <Form.Button basic size="small" color="teal">Submit</Form.Button>
      </Form>
    )
    }
}