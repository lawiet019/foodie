import React, { Component } from 'react';
import { Result, Button } from 'antd';
class UserResult extends Component {
    state ={
        title : this.props.location.data.title,
        subtitle: this.props.location.data.subtitle
        // title : "title",
        // subtitle: "subtitle"
    }
    forward = () =>{
        this.props.history.push({path:'../loginemail'})
    }
    render() { 
        
        return (
            <Result
            status="success"
            title= {this.state.title}
            subTitle={this.state.subtitle}
            className="container"
            extra={[
                <Button type="primary" key="console" onClick={this.forward}>
                    Log in
                </Button>
              
            ]}
          />
          
          );
    }
}
 
export default UserResult;