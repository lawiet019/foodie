import React, { Component } from 'react';
import '../assets/css/header.css'
import 'antd/dist/antd.css';
import LogoImage from "../assets/image/logo.png";
import { Menu, Dropdown,Input ,Row, Col,Select} from 'antd';
import { withTranslation,useTranslation } from 'react-i18next';
import { UserOutlined,SettingOutlined,DownOutlined  } from '@ant-design/icons';
@withTranslation()
class Header extends Component {
    state = {  }
    render() { 
    const { Search } = Input;
    const { Option } = Select;
    const { t, i18n } = this.props
    const onSearch =(values) =>{

    }
    const handleChange = (values)=>{
        console.log(values)
        i18n.changeLanguage(values)

    }
        return ( 
            <div className="header">
                <Row>
                <Col 
                    xs={{ span: 6 }}
                    sm={{ span: 4 }}
                    md={{ span: 2 }}
                    lg={{ span: 2 }}
                >
                <img src={LogoImage} className="logo"/>
                
                </Col>
                <Col 
                    xs={{ span: 0 }}
                    sm={{ span: 0 }}
                    md={{ span: 2 }}
                    lg={{ span: 2 }}
                className = "text">
                Foodie
                </Col>
                <Col 
                    xs={{ span: 0 }}
                    sm={{ span: 0 }}
                    md={{ span: 2 }}
                    lg={{ span: 2 }}
                >
                </Col>
                <Col 
                    xs={{ span: 16 }}
                    sm={{ span: 12 }}
                    md={{ span: 8 }}
                    lg={{ span: 8 }}
                    className = "search"
                >
                 <Search
                placeholder={t('searchtext')}
                allowClear
                enterButton={t('search')}
                size="large"
                onSearch={onSearch}
                
                /> 
                </Col>
                <Col 
                    xs={{ span: 0 }}
                    sm={{ span: 0 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    className="language"
                >
                <Select defaultValue="zh" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="zh"> {t('chinese')}</Option>
                    <Option value="en">{t('english')}</Option>
        
                </Select>

                </Col>
                <Col 
                    xs={{ span: 2 }}
                    sm={{ span: 3 }}
                    md={{ span: 0}}
                    lg={{ span: 0 }}
                >

                <SettingOutlined />

                </Col>
                <Col 
                    xs={{ span: 4 }}
                    sm={{ span: 2 }}
                    md={{ span: 2 }}
                    lg={{ span: 2 }}
                >
                    <UserOutlined />
                </Col>
                </Row>

            </div>
         );
    }
}
 
export default Header;