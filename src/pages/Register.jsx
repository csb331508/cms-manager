
import "./less/Register.less"
import { RegisterApi } from "../request/api"
import React from "react";
import logoImg from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {
  Button,
  message,
  Form,
  Input,

} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


export default function Register() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('发送请求');
    // errCode :0表示注册成功，1表示失败
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      console.log(res);
      if (res.errCode === 0) {
        console.log(res);
        message.success(res.message)
        setTimeout(() => navigate("/login"), 1500);

      } else {
        message.error(res.message)
      }
    })
  };


  return (
    <div className="register">
      <div className="register_box">
        <Form
          name="basic"

          initialValues={{ remember: true }}
          onFinish={onFinish}

          autoComplete="off"
        >
          <img src={logoImg}></img>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入您的用户名' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入您的用户名' />
          </Form.Item>

          <Form.Item

            name="password"
            rules={[{ required: true, message: '请输入您的密码' }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入您的密码' />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入您的密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致，请重新输入！'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入您的密码" />
          </Form.Item>
          <Form.Item >

            <Form.Item>
              <Link to="/login">已有账号，立即登录</Link>
            </Form.Item >
            <Button type="primary" htmlType="submit" block>
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}