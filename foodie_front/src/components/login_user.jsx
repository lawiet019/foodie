import React, { Component } from "react";
// import Logo from './login.jsx';

import LogoImage from "../assets/image/logo.png";
import "antd/dist/antd.css";
import "../assets/css/all.css";

import { Form, Input, Button, Row, Col, Avatar,Checkbox } from "antd";

import { UserOutlined, LockOutlined } from '@ant-design/icons';

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
                <h2>Login with username </h2>
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
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  
                  <a  href='../loginemail'>
                    login with email
                  </a>
                  <a className="right_float" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  Or <a href="">register now!</a>
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
