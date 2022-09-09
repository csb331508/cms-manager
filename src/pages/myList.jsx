
import React, { useEffect, useState } from "react";
import { Avatar, Button, List, message, Skeleton, Pagination } from 'antd';
import moment from "moment/moment";
import { useNavigate } from "react-router-dom"
import { ArticleListApi, ArticleDelApi } from "../request/api"
import "./less/List.css"
export default function MyList() {


  const [current, setCurrent] = useState(1) //当前页数
  const [pageSize, setPageSize] = useState(10) //每页条数
  const [total, setTotal] = useState(0) //总共多少条数据
  const [list, setList] = useState([]); //每次请求数据列表
  const navigate = useNavigate()

  const [update, setUpdate] = useState(0) //监听页面文章数量是否有变化

  useEffect(() => {
    getList(current)
  }, []);

  useEffect(() => {
    getList(current)
  }, [update]);

  // 获取分页函数
  // num当前第几页
  // count 每页显示几条
  const getList = (num) => {
    ArticleListApi({
      num,
      count: pageSize
    }).then(res => {
      if (res.errCode == 0) {
        // let { arr, total, num, count } = res.data
        // let newArr = JSON.parse(JSON.stringify(arr))
        setList(res.data.arr)
        setCurrent(res.data.num)
        setCurrent(res.data.count)
        setTotal(res.data.total)
      }
    })
  }



  const pageChange = (current) => {
    getList(current)
  }
  const delFn = (id) => {
    console.log(id);
    ArticleDelApi({ id }).then(res => {
      if (res.errCode == 0) {
        message.success(res.message)
        setUpdate(update + 1)
        // getList(current)

      }
    })
  }

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        pagination={{ pageSize, total, onChange: pageChange }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => navigate('/edit/' + item.id)}>编辑</Button>,
              <Button type="danger" onClick={() => delFn(item.id)}>删除</Button>,
            ]}
          >

            <Skeleton loading={false} title={false} >

              <List.Item.Meta
                title={<a href="#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>

  );
}