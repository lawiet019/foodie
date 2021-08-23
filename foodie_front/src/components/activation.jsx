import React, { Component } from 'react';
import '../assets/css/header.css'
import { withTranslation } from 'react-i18next';
import "../assets/css/all.css";
import "../assets/css/activation.css";
import axios from "axios";
import { Button } from 'antd';
@withTranslation()
class Activation extends Component {
    login = () =>{
        this.props.history.push("../loginemail")
    }
    constructor (props) {
       super(props);
        this.state={
          seconds: 100,
        };
        
        

    }
    componentDidMount () {
      axios.get("../../v1/users/activation/" + this.props.match.params.id.toString()).then((response) => {
        if (response.data.result == 200) {
         
          this.setState({show:1 });
        }
        else if(response.data.result == 409){
          this.setState({show:2 });

        }
        else {
          this.setState({show:3 });
        };
      });

        let timer = setInterval(() => {
          this.setState((preState) =>({
            seconds: preState.seconds - 1,
          }),() => {
            if(this.state.seconds == 0){
              clearInterval(timer);
            }
          });
        }, 1000)
    }
     


   
    render() { 
    const {t} = this.props
    let message;
    if (this.state.show==1){
      message = <p>{t('activesuc')}<a onClick={this.login}>{t('clickthis')}</a></p>
    }
    else if (this.state.show ==2){
      message = <p>{t('activebef')}<a onClick={this.login}>{t('clickthis')}</a></p>
    }
    else{
      message = <p>{t('activefail')} <a href="../resendactivation"> {t('resendactive')} </a></p>
    }

    if (this.state.seconds === 0  && this.state.show !=3) {
         window.location.href='../loginemail';
    }

        return ( 
        <div className="container">
           {message}
        </div>
         
          
         );
    }
}
 
export default  Activation;