import React, { Component } from "react";
// import Logo from './login.jsx';

import LogoImage from "../assets/image/logo.png";
import "antd/dist/antd.css";
import "../assets/css/all.css";
import "../assets/css/register.css";

import { Form, Input, Button, Row, Col, Avatar,message } from "antd";

import {  LockOutlined,MailFilled } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import axios from "axios";
import qs from "qs";
@withTranslation()
class LoginEmail extends Component {
  login = (values) =>{
    axios.post("/v1/users/loginbyemail", qs.stringify({password:values.password,email:values.email }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then(response =>{
      if (response.data.result ==200){
        this.props.history.push({ pathname:'../userresult',query:{stage:"register200",email:values.email} })

      }
     else if (response.data.result==403){
       message.info(this.props.t("loginemailinactive"))
        
     }
     else if(response.data.result ==401){
      message.info(this.props.t("loginemailinvalid"))


     }
     else{

     }
    }

    );

  }
  render() {
    const {t} = this.props
    const onFinish  = (values) => {
      axios.post("../v1/users/loginbyemail", qs.stringify({password:values.password,email:values.email }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then(response =>{
        if (response.data.result ==200){
          this.props.history.push({ pathname:'./userresult',state:{stage:"login200"} })
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('expiredTime',new Date(Date.now() + (30 * 60 * 1000)))
  
        }
       else if (response.data.result==403){
         message.info(this.props.t("loginemailinactive"))
          
       }
       else if(response.data.result ==401){
        message.info(this.props.t("loginemailinvalid"))
  
  
       }
       else{
  
       }
      }
  
      );
  
    }
    const onFinishFailed = (errInfo) =>{
      console.log("FailInfo",errInfo)
      
    }
    
    return (
      <div className="container">
        <Row>
          <Col
            xs={{ span: 1 }}
            sm={{ span: 3 }}
            md={{ span: 6 }}
            lg={{ span: 8 }}
          >
            1 col-order-responsive
          </Col>
          <Col
            xs={{ span: 22 }}
            sm={{ span: 18 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <div className="form_div">
              <div className="inner_center">
                <Avatar
                  size={{
                    xs: 60,
                    sm: 70,
                    md: 80,
                    lg: 90,
                    xl: 100,
                    xxl: 110,
                  }}
                  src={LogoImage}
                />
                <h2>{this.props.t('loginemail')} </h2>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                onFinish = {onFinish}
                onFinishFailed = {onFinishFailed}
            
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: this.props.t('warningemail1'),
                    },
                    {
                      required: true,
                      message: this.props.t('warningemail2'),
                    },
                  ]}
                >
                  <Input
                    prefix={<MailFilled className="site-form-item-icon" />}
                    placeholder={this.props.t('email')}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: this.props.t('warningpassword'),
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder={this.props.t('password')}
                  />
                </Form.Item>
                
                <Form.Item>
                  
                  <a  href='../loginusername'>
                    {this.props.t('loginuser')}
                  </a>
                  <a className="right_float" href="">
                  {this.props.t('forgetpassword')}
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {this.props.t('login')}
                  </Button>
                  {this.props.t('or')} <a href="">{this.props.t('register')}</a>
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col
            xs={{ span: 1 }}
            sm={{ span: 3 }}
            md={{ span: 6 }}
            lg={{ span: 8 }}
          >
            1 col-order-responsive
          </Col>
        </Row>

       
      </div>
    );
  }
}

export default LoginEmail;
