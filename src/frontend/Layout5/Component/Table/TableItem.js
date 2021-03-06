import React, { Component } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

const columns = [{
  title: 'Tên chủ đề',
  dataIndex: 'titleName',
  key: 'titleName',
  width: 150
}, {
  title: 'Hoạt động giảng dạy ',
  dataIndex: 'teachingActs',
  key: 'teachingActs',
  render: teachingActs => (
    <span>
      {teachingActs.map(  tag => {
        let color = 'green';
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
  width:200
}, {
  title: 'Chuẩn đầu ra ',
  dataIndex: 'standardOutput',
  key: 'standardOutput',
  render: standardOutput => (
    <span>
      {standardOutput.map(tag => {
        let color = 'green';
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
  width:200
}, {
  title: 'Hoạt động đánh giá',
  key: 'evalActs',
  dataIndex: 'evalActs',
  render: evalActs => (
    <span>
      {evalActs.map(tag => {
        let color = 'volcano';
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#a">Edit {record.name}</a>
      <Divider type="vertical" />
      <a href="#b">Delete</a>
    </span>
  ),
}];

class TableItem extends Component {
  constructor(props){
    super(props)
    this.exportData = this.exportData.bind(this);
  }
  
  exportData (){
    console.log(this.props.itemMenuReducer.previewInfo)
    axios.post("/", {exportData: this.props.itemMenuReducer.previewInfo})
      .then(res => {
        console.log(res)
      })
  }
    render() {
        return (
          <div>
            <Table columns={columns} dataSource={this.props.itemMenuReducer.previewInfo} pagination={{ pageSize: 50 }} scroll={{ y: 240, }}/>
            <Button style={{float: "right"}} onClick={this.exportData}>Export PDF</Button>
          </div>
           
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemMenuReducer: state.itemMenuReducer
  }
}
export default connect(mapStateToProps, null)(TableItem);