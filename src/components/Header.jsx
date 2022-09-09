import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Dropdown, Menu, Space, Layout, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import "../assets/base.less"
import logoImg from "../assets/logo.png"
import defaultAvatar from "../assets/defaultAvatar.jpg"
export default function Header(props) {
  const [avatar, setAvater] = useState(defaultAvatar)
  const [username, setUsername] = useState("游客")
  const navitage = useNavigate()
  // 加载用户数据
  useEffect(() => {
    let username1 = localStorage.getItem("username")
    setUsername(username1 || "游客")
    let avatar1 = localStorage.getItem("avatar")
    if (avatar1) {
      setAvater("http://47.93.114.103:6688/" + avatar1)
    }
  }, [localStorage.getItem('avatar')])



  const { Header } = Layout
  const menu = (
    <Menu
      items={[

        {
          label: (
            <>
              <span onClick={() => navitage('/means')}>修改资料</span>
            </>

          ),
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: (
            <span onClick={() => {
              message.success("退出成功,即将返回登录页面")
              setTimeout(() => navitage("/login"), 1500);

            }}>退出登录</span>
          ),
          key: '1',
        },
      ]}
    />
  );
  return (
    <>
      <Header className="header">
        <img className="logo" src={logoImg} alt="" />
        <div className="right">
          <img className="avatar" src={avatar} alt="" />
          <Dropdown overlay={menu} className="dropDown">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Space>
                <span>  {username} </span>
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </>
  )
}