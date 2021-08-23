import React, { Component } from 'react';
import { Result, Button } from 'antd';
import "../assets/css/not_found.css";
import { withTranslation } from 'react-i18next';
@withTranslation()
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
            subTitle={this.props.t('404')}
            extra={<Button type="primary" onClick={this.backHome}>{this.props.t('backhome')}</Button>}
        />
          
          );
    }
}
 
export default NotFound;

