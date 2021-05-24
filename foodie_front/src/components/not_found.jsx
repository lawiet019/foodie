import React, { Component } from 'react';
import { Result, Button } from 'antd';
import "../assets/css/not_found.css";
class NotFound extends Component {
   
    backHome = () =>{
        this.props.history.push({path:''})
    }
    render() { 
        
        return (
            <Result
            status="404"
            title="404"
            className="container"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={this.backHome}>Back Home</Button>}
        />
          
          );
    }
}
 
export default NotFound;

