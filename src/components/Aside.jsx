import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { UnorderedListOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('查看文章列表', 'myList', <MailOutlined />),
  // getItem('查看文章列表table', 'myTable', <MailOutlined />),
  getItem('文章编辑', 'edit', <UnorderedListOutlined />),
  getItem('修改资料', 'means', <SettingOutlined />),
];

export default function Aside() {
  const { pathname } = useLocation()
  const [defaultKey, setDefaultKey] = useState('')
  const navigate = useNavigate()
  // 监听路由是否改变
  useEffect(() => {

    setDefaultKey(pathname.split('/')[1])

  }, [pathname])
  const onClick = (e) => {
    navigate("/" + e.key)
    setDefaultKey(e.key)
  };

  return (
    <Menu
      className="aside"
      onClick={onClick}
      style={{
        width: 185
      }}
      selectedKeys={[defaultKey]}
      mode="inline"
      items={items}
    />
  );
};
