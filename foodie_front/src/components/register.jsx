import React, { Component } from "react";
// import Logo from './login.jsx';

import LogoImage from "../assets/image/logo.png";
import "antd/dist/antd.css";
import "../assets/css/all.css";
import RefreshImage from "../assets/image/refresh-icon.svg";

import { Form, Input, Button, Row, Col, Avatar, message, Checkbox,Modal } from "antd";
import { withTranslation } from 'react-i18next';


import {
  UserOutlined,
  LockOutlined,
  MailFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import qs from "qs";

@withTranslation()
class Register extends Component {
  
  
  constructor(props) {
    super(props);
    

    // this.refreshCaptha = this.refreshCaptha.bind(this)
    this.state = {
      captcha: "",
      
      isModalVisible:false , 
      setIsModalVisible:false 
    };
    
  
    
  }
  showModal = () => {
    console.log("arrive there")
    this.setState({isModalVisible:true})
 
  };

  handleOk = () => {
    this.setState({isModalVisible:false})
    
  };

  handleCancel = () => {
    this.setState({isModalVisible:false})
    
  };
  
  componentDidMount() {
    this.getCaptha();
  }

  getCaptha = () => {
    axios.get("../v1/users/getcaptcha").then((response) => {
      if (response.data.result == 200) {
        let img_base64 = "data:image/png;base64," + response.data.captcha;
        this.setState({ captcha: img_base64 });
      }
    });
  };
  refreshCaptha = () =>{
  let refreshIcon = document.getElementById("refresh-icon")
  let refreshButton = document.getElementById("refresh-button")
  refreshButton.removeAttribute("class")
  refreshButton.disabled = true
  setTimeout(()=>{

    refreshIcon.addEventListener("animationiteration", () =>{
    refreshButton.setAttribute("class", "refresh-end")
    refreshButton.disabled = false
    this.getCaptha()
  })
  },100)


  }
  

  render() {
    const { t, i18n } = this.props
    const onFinish =  (values) => {
      console.log("arrive there")
      axios.post("../v1/users/register", qs.stringify({username: values.username,password:values.password,email:values.email }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then(response =>{
        if (response.data.result ==200){
        
          this.props.history.push({ pathname:'./userresult',state:{"stage":"register200"}})
  
        }
        else if(response.data.result==409){
          message.info(t('registerused'))
         }
        else{
          message.info(t('requesterr'))
        }
  
  
      }
  
      );

    }
    const onFinishFailed = (errorInfo) =>{
     
      console.log("Fails",errorInfo)
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
                <h2>{t('register')} </h2>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                // initialValues={{
                //   remember: true,
                // }}
              >
                <Form.Item
                  validateTrigger={["onChange", "onBlur"]}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: this.props.t('warningusername'),
                    },
                    {
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (value) {
                            axios
                              .post(
                                "../v1/users/checkusername",
                                qs.stringify({ username: value }),
                                {
                                  headers: {
                                    "Content-Type":
                                      "application/x-www-form-urlencoded;charset=utf-8",
                                  },
                                }
                              )
                              .then((response) => {
                                if (response.data.result == 200) {
                                  resolve();
                                } else {
                                  reject(response.data.msg);
                                }
                              });
                          } else {
                            reject();
                          }
                        });
                      },
                      validateTrigger: "onBlur",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder={t('username')}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      type: "email",
                      message: t('warningemail1'),
                    },
                    {
                      required: true,
                      message: t('warningemail2'),
                    },
                    {
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (value) {
                            axios
                              .post(
                                "../v1/users/checkemail",
                                qs.stringify({ email: value }),
                                {
                                  headers: {
                                    "Content-Type":
                                      "application/x-www-form-urlencoded;charset=utf-8",
                                  },
                                }
                              )
                              .then((response) => {
                                if (response.data.result == 200) {
                                  resolve();
                                } else {
                                  reject(response.data.msg);
                                }
                              });
                          } else {
                            reject();
                          }
                        });
                      },
                      validateTrigger: "onBlur",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailFilled className="site-form-item-icon" />}
                    placeholder={t('email')}
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
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: this.props.t('warningpassword'),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder= {this.props.t('confirmpassword')}
                  />
                </Form.Item>
                <Form.Item extra= {t('captchaextra')}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="captcha"
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: this.props.t('captchawarning'),
                          },
                          {
                            validateTrigger: "onBlur",
                            validator: (_, value) => {
                              return new Promise((resolve, reject) => {
                                if (value) {
                                  axios
                                    .post(
                                      "../v1/users/verifycaptcha",
                                      qs.stringify({ code: value }),
                                      {
                                        headers: {
                                          "Content-Type":
                                            "application/x-www-form-urlencoded;charset=utf-8",
                                        },
                                      }
                                    )
                                    .then((response) => {
                                      if (response.data.result == 200) {
                                        resolve();
                                      } else {
                                        reject("your captcha is wrong");
                                      }
                                    });
                                } else {
                                  reject();
                                }
                              });
                            },
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <img src={this.state.captcha} />
                      <a onClick={this.refreshCaptha} id="refresh-button"  className="refresh-end"><img id="refresh-icon" height="12" src={RefreshImage} className="refresh-start"/> </a>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item 
                 name="agreement"
                 valuePropName="checked"
                 rules={[
                   {
                     validator: (_, value) =>
                       value
                         ? Promise.resolve()
                         : Promise.reject(t('agreementnotselect'))
                   }
                 ]} >
                <Checkbox >I agree to the <a onClick={this.showModal}>terms and conditions</a> </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                   
                  >
                    {t('register')}
                  </Button>
                  {t('or')} <a href="../loginemail">{t('login')}</a>
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
        <Modal title="Terms and conditions" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <h1>Terms and conditions of software</h1>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </div>
    );
  }
}

export default Register;
