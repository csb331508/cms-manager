
import React, {  useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Outlet } from "react-router-dom"
import { Layout } from 'antd';
import Header from "./components/Header"
import Aside from "./components/Aside";
import Bread from "./components/Bread"
export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem('cms-token')
    // 如果没有token则跳转回登录页面
    if (!token) {
      navigate('/login')
    }
  }, [])
  const { Footer, Sider, Content } = Layout;

  return (
    <>
      <Layout id="app">
        <Header ></Header>
        <div className="container" >

          <Aside />

          <Content >
            <div className="container_box">
              <Bread></Bread>
              <div className="container_content">
                <Outlet  />
              </div>
            </div>
          </Content>
        </div>

        <Footer className="footer">
          Respect |Copyright &copy; 2022

        </Footer>
      </Layout>
    </>
  )
}


