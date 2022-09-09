import React, { useState, useEffect } from "react"
import { PageHeader, Button, Form, Input, Modal, Radio, message } from 'antd';
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'
import { useParams, useNavigate } from "react-router-dom"
import moment from "moment/moment";
import E from 'wangeditor'

let editor;

export default function Edit() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState()
  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    // 查找文章
    ArticleSearchApi(params).then(res => {
      setTitle(res.data.title)
      setSubTitle(res.data.subTitle)
      // 将文章的内容渲染到富文本框中
      editor.txt.html(res.data.content)

    })
  }, [])

  const onCreate = (values) => {

  };

  let date = moment(new Date()).format("YYYY-MM-DD")
  // 富文本编辑器
  useEffect(() => {
    editor = new E("#div1")
    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
      // console.log(newHtml);
    }
    editor.create()
    return () => {
      // 组件销毁时销毁编辑器
      editor.destroy()
    }
  }, [])
  // 点击修改文章之后处理函数
  const dealData = (errCode, msg) => {
    if (errCode == 0) {
      message.success(msg)
      setTimeout(() => {
        navigate('/myList')
      }, 1500);
    } else {
      message.error(msg)
    }
    
    //  关闭弹出框
    setOpen(true);


  }
  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    // console.log(params);
    return (
      <Modal
        zIndex={99999}
        open={open}

        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        // 点击确认回调函数
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
          
              // 如果params有id就是修改文章，没有就是添加文章
              if (params.id) {
                // 修改文章
                ArticleUpdateApi({
                  title: values.title,
                  subTitle: values.title,
                  content,
                  id: params.id
                }).then(res => {
                  dealData(res.errCode, res.message)
                })

              } else {
                // 添加文章
                ArticleAddApi({
                  title: values.title, subTitle: values.subTitle, content
                }).then(res => {
                  dealData(res.errCode, res.message)
                })

              }

              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              return
              // console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            title,
            subTitle

          }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="subTitle" label="副标题">
            <Input type="textarea" />
          </Form.Item>

        </Form>
      </Modal>
    );
  };




  return (
    <div>

      <PageHeader
        className="site-page-header"
        onBack={params.id ? () => null : null}
        title="文档编辑"
        subTitle={date}
        extra={<>
          {/* 提交按钮 */}
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            提交
          </Button>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>}
      />
      <div>

      </div>
      <div id="div1"></div>


    </div>

  )
}