import React, { Component } from "react";
// import Logo from './login.jsx';

import LogoImage from "../assets/image/logo.png";
import "antd/dist/antd.css";
import "../assets/css/all.css";

import { Form, Input, Button, Row, Col, Avatar,Checkbox } from "antd";

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
@withTranslation()
class LoginUser extends Component {
  render() {
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
                <h2>{this.props.t('loginuser')} </h2>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
            
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: this.props.t('warningusername'),
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder={this.props.t('username')}
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
                  
                  <a  href='../loginemail'>
                  {this.props.t('loginemail')}
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

export default LoginUser;
