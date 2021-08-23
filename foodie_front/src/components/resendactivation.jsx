import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Avatar, message, Checkbox,Modal } from "antd";
import { withTranslation } from 'react-i18next';
import "../assets/css/all.css";
import {MailFilled} from "@ant-design/icons";
import axios from "axios";
import qs from "qs";
@withTranslation()
class ResendActivation extends Component {
    state = {  }
    render() { 
        const {t} = this.props
        const onFinish = (values) =>{
          axios.post("../v1/users/resendactive", qs.stringify({email:values.email }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }).then(response =>{
            if (response.data.result ==200){
                message.info(t('resendactivesuc'));
            }
            else{
              message.info(t('requesterr'));
            }
            // need to add more message
          }
      
          );
          

        }
        const onFinishFailed = (values) =>{

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
               
                <h2>{t('resendacttitle')} </h2>
              </div>
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
             
              >
               

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
                   
                  ]}
                >
                  <Input
                    prefix={<MailFilled className="site-form-item-icon" />}
                    placeholder={t('email')}
                  />
                </Form.Item>

                
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                   
                  >
                    {t('resendactive')}
                  </Button>

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
 
export default ResendActivation;