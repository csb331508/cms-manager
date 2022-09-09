import React, { useState, useEffect } from "react";
import { useLocation,useParams } from "react-router-dom"
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
export default function Bread() {
  const { pathname } = useLocation()
  const {id} = useParams()
  const [breadName, setBreadName] = useState('')
  // console.log("params",params);
  useEffect(() => {
    switch (pathname) {
      case "/myList":
        setBreadName('/ 查看文章列表')
        break;
      case "/edit":
        setBreadName('/ 文章编辑')
        break;
      case `/edit/${id}`:
        setBreadName('/ 文章编辑')
        break;
      case "/means":
        setBreadName('/ 修改资料')
        break;
      default:
        break;
    }
  }, [pathname])
  return (
    <>
      <Breadcrumb className="bread_name" separator=" ">
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <span >{breadName}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}