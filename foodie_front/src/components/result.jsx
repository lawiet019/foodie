import React, { Component  } from 'react';
import { Result, Button, message} from 'antd';
import { withTranslation } from 'react-i18next';
import axios from "axios";
import qs from "qs";

@withTranslation()
class UserResult extends Component {
  
    constructor(props) {
        super(props);
        if (this.props.location.state.stage =="register200"){
                this.state ={
                title : this.props.t('successregtitle'),
                subtitle: this.props.t('successregsubtitle'),
                status: "success",
                button1:this.props.t('resendactive'),
                action1: this.resendactive,
            }
            
        }
        else if (this.props.location.state.stage =="login200"){
            this.state ={
                title : this.props.t('successregtitle'),
                subtitle: this.props.t('successregsubtitle'),
                status: "success",
                button1:this.props.t('redirectindex'),
                action1: this.redirectindex,
            }


        }
       
    }
    resendactive = () =>{
        
        axios.post("../v1/users/resendactive", qs.stringify({email:this.props.location.query.email }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }).then(response =>{
            if (response.data.result ==200){
                message.info(this.props.t('resendactivesuc'));
            }
            else{
                message.info(this.props.t('requesterr'))
            }
            
          }
      
          );
    }
    redirectindex = () =>{
        this.props.history.push({ pathname:'../' })
    }



   

    render() { 
    

    
        
        return (
         
            <Result
            status={this.state.status}
            title= {this.state.title}
            subTitle={this.state.subtitle}
            className="container"
            extra={[
                <Button type="primary" key="console" onClick={this.state.action1}>
                {this.props.t(this.state.button1)}
                </Button>
               
              
               
              
            ]}
          />
         
     
          );
    }
}
 
export default UserResult;