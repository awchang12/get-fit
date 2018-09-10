import React, { Component } from 'react'

import { Line } from '@nivo/line'
import LogForm from './addLogForm'

export default class LogsGraph extends Component {
    state= {
        addLog: false,
        logs: [{color: 'hsl(288, 70%, 50%)',x: "2018-8-28",y: this.props.user.startingWeight}]
    }
    componentDidMount(){
        console.log("hello")
        let token = localStorage.getItem("token")
        fetch("http://localhost:3000/logs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            let logInfo=[]
            data.map(log => {
                logInfo.push({color: 'hsl(288, 70%, 50%)', x: log.date, y: log.weight})
            })
            this.setState({
                logs: [...this.state.logs, ...logInfo]
            })
        })
        .catch(e => console.error(e))
    }

    onClick = () => {
        this.setState({
            addLog: !this.state.addLog
        })
    }

    onSubmit = event => {
        event.preventDefault()
        console.log(event.currentTarget.date.value)
        let newDate=event.currentTarget.date.value.split("/")
        let year = newDate.pop()
        newDate.unshift(year)
        newDate = newDate.join('-')
        console.log(newDate)

        let data = {
                date: newDate,
                weight: event.currentTarget.weight.value,
                user_id: this.props.user.id
        }
        const token = localStorage.getItem("token")
        fetch('http://localhost:3000/logs',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            let dataInfo = [{color: 'hsl(288, 70%, 50%)', x: data.date, y: data.weight}]
            this.setState({
                logs: [...this.state.logs, ...dataInfo],
                addLog: false
            })
            console.log(this.state.logs)
        })
    }

    render(){
        return(<React.Fragment>{this.state.addLog ? <LogForm onSubmit={this.onSubmit} user={this.props.user} toggle={this.onClick}/> : <React.Fragment><button className="ui button blue" onClick={this.onClick}>Add Log</button><Line
          width={900}
          height={400}
          margin={{
            top: 20,
            right: 30,
            bottom: 60,
            left: 80
          }}
          data={[
            {id: 'Logs',color: 'hsla(183, 100%, 35%, 1)',data: this.state.logs}
          ]}
        /></React.Fragment>}</React.Fragment>
            
    )
    }
}

// [
//     {color: 'hsl(288, 70%, 50%)',x: 'HN',y: 47},
//     {color: 'hsl(304, 70%, 50%)',x: 'SB',y: 7},
//     {color: 'hsl(95, 70%, 50%)',x: 'TK',y: 9},
//     {color: 'hsl(95, 70%, 50%)',x: 'BY',y: 9}
//   ]