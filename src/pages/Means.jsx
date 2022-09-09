import React, { useState, useEffect } from "react";
import "./less/Means.less"
import { Button, Upload, Form, Input, message } from 'antd';
import { GetUserDataApi, ChangeUserDataApi } from "../request/api"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export default function Means(props) {
  useEffect(() => {
    GetUserDataApi().then(res => {
      if (res.errCode == 0) {
        sessionStorage.setItem('username', res.data.username)
        // setUsername(res.data.username)
        // console.log(res);
      }
    })
  }, [])
  const [loading, setLoading] = useState(false); //上传状态
  const [imageUrl, setImageUrl] = useState(); //上传图片路径

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  // 图片上传前
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 文件!');
    }

    const isLt2M = file.size / 1024 < 200;

    if (!isLt2M) {
      message.error('请上传小于200KB的图片');
    }

    return isJpgOrPng && isLt2M;
  };
  // 提交用户名密码
  const onFinish = (values) => {
    if (values.username.trim() !== ''
      && values.password.trim() !== '') {
      ChangeUserDataApi({
        username: values.username,
        password: values.password
      }).then(res => {
        if (res.errCode == 0) {
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      })
    } else if (sessionStorage.getItem('username') == values.username) {
      message.error("用户名与之前相同，请重新输入")
    } else {
      message.error("请输入用户名或密码")
    }

  };
  // 点击图片上传
  const handleChange = (info) => {

    // 文件正在上传
    if (info.file.status === 'uploading') {
      console.log(info.file.status);
      setLoading(true);
      return;
    }
    // 文件上传成功
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        if (info.file.response.errCode == 0) {
          console.log(info.file.response);
          message.success(info.file.response.message)
          localStorage.setItem('avatar', info.file.response.data.filePath)
          console.log('means', info.file.response.data.filePath);
          setTimeout(() => {
            // 强制刷新
            window.location.reload()
          }, 1500);


        }

        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传图片
      </div>
    </div>
  );

  return (
    <div className="means">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}

        onFinish={onFinish}

        autoComplete="off"

      >
        <Form.Item
          label="修改用户名"
          name="username"

        >
          <Input placeholder="请输入新用户名" />
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"

        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit" className="subBtn">
            提交
          </Button>
        </Form.Item>
      </Form>
      <div className="upload-container">
        <span>点击下方上传头像：</span>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          headers={{ 'cms-token': localStorage.getItem('cms-token') }}
          action='/api/upload'
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>

      </div>
    </div>
  );

}