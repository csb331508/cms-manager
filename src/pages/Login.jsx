// import React from "react"
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logoImg from "../assets/logo.png"
import { LoginApi } from "../request/api"
import "./less/Login.less"
import React from 'react';
export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    // errCode :0表示成功，1表示失败
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res => {

      if (res.errCode === 0) {
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
        message.success(res.message)
        navigate("/")
      } else {
        message.error(res.message)
      }
      

    })
  };


  return (
    <div className="login">
      <div className="login_box">
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

          <Form.Item >
            <Link to="/register">还没账号，立即注册</Link>
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>

      </div>

    </div>

  );
};
