import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Button,
  message
} from "antd";
import { Link } from "react-scroll";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { AddItemKHGDTH } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";

const { Option } = Select;
const standard_item = [
  {
    value: "G1",
    label: "G1",
    children: [
      {
        value: ".1",
        label: ".1"
      },
      {
        value: ".2",
        label: ".2"
      },
      {
        value: ".3",
        label: ".3"
      }
    ]
  },
  {
    value: "G2",
    label: "G2",
    children: [
      {
        value: ".1",
        label: ".1"
      },
      {
        value: ".2",
        label: ".2"
      }
    ]
  },
  {
    value: "G3",
    label: "G3",
    children: [
      {
        value: ".1",
        label: ".1"
      },
      {
        value: ".2",
        label: ".2"
      },
      {
        value: ".3",
        label: ".3"
      },
      {
        value: ".4",
        label: ".4"
      }
    ]
  },
  {
    value: "G4",
    label: "G4",
    children: [
      {
        value: ".1",
        label: ".1"
      }
    ]
  },
  {
    value: "G5",
    label: "G5",
    children: [
      {
        value: ".1",
        label: ".1"
      },
      {
        value: ".2",
        label: ".2"
      },
      {
        value: ".3",
        label: ".3"
      },
      {
        value: ".4",
        label: ".4"
      },
      {
        value: ".5",
        label: ".5"
      }
    ]
  },
  {
    value: "G6",
    label: "G6",
    children: [
      {
        value: ".1",
        label: ".1"
      }
    ]
  },
  {
    value: "G7",
    label: "G7",
    children: [
      {
        value: ".1",
        label: ".1"
      }
    ]
  }
];
const teachingActs = [
  "Thuyết giảng",
  "Demo",
  "Thảo luận và trả lời thắc mắc trên diễn đàn môn học"
];
const evalActs = ["BTVN", "BTTL", "DAMH", "Bài đọc thêm và viết báo cáo"];

class ItemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleName: "",
      teachingActs: [],
      standardOutput: [],
      evalActs: []
    };
  }

  onChangeStandar = value => {
    if (value.length === 0) return;

    var newArray = this.state.standardOutput.slice();
    let temp = value[0] + value[1];
    let flag = true;

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] === temp) {
        newArray.splice(i, 1);
        flag = false;
      }
    }

    if (flag) newArray.push(temp);

    this.setState({ standardOutput: newArray });
  };
  showStandard = () => {
    let temp = "";
    for (let i = 0; i < this.state.standardOutput.length; i++) {
      temp += this.state.standardOutput[i] + " , ";
    }
    return temp;
  };

  handleSubmit = () => {
    let previewData = this.state;

    if (
      previewData.titleName === "" ||
      previewData.teachingActs.length === 0 ||
      previewData.standardOutput.length === 0 ||
      previewData.evalActs.length === 0
    ) {
      message.error("Vui lòng điền đầy đủ thông tin", 0.75);
      return;
    }
    this.props.onAddItemKHGDTH(JSON.stringify(previewData));
    this.props.nextStep();
    this.resetPreviewData();
    this.props.form.resetFields();
  };

  handleTitleChange = e => {
    this.state.titleName = e.target.value;
  };

  handleChangeTeachingAct(value) {
    this.setState({ teachingActs: value });
  }
  handleChangeEvalActs(value) {
    this.setState({ evalActs: value });
  }

  resetPreviewData = () => {
    this.setState({ teachingActs: [], standardOutput: [], evalActs: [] });
  };
  renderBackButton() {
    if (this.props.step !== 0) {
      return (
        <Link
          activeClass="active"
          className="test1"
          to="test1"
          spy={true}
          smooth={true}
          duration={500}
        >
          <Button type="danger">Finish</Button>
        </Link>
      );
    }
    return null;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const previewData = this.state;

    const childrenTeachingActs = [];
    const childrenEvalActs = [];
    function init() {
      for (let i = 0; i < teachingActs.length; i++) {
        childrenTeachingActs.push(
          <Option key={teachingActs[i]}>{teachingActs[i]}</Option>
        );
      }
      for (let i = 0; i < evalActs.length; i++) {
        childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>);
      }
    }

    init();
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const formDynamicItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div style={{ border: "2px solid", borderRadius: "12px" }}>
        <div style={{ marginTop: "10px" }} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="Tên chủ đề">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tên chủ đề"
                }
              ]
            })(<Input onChange={this.handleTitleChange} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Hoạt động dạy">
            <Select
              id="select-teaching"
              value={previewData.teachingActs}
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Please select"
              //  defaultValue={['Thuyết giảng']}
              onChange={value => this.handleChangeTeachingAct(value)}
            >
              {childrenTeachingActs}
            </Select>
          </Form.Item>

          <Form.Item
            {...formDynamicItemLayout}
            label={
              <span>
                Chọn chuẩn đầu ra&nbsp;
                <Tooltip title="Tham khảo mục chuẩn đầu ra để chọn">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            <Cascader
              options={standard_item}
              onChange={this.onChangeStandar}
              placeholder="Chọn chuẩn đầu ra"
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="Kết quả chuẩn đầu ra">
            <Input disabled value={this.showStandard()} />
          </Form.Item>

          <Form.Item {...formItemLayout} label="Hoạt động đánh giá">
            <Select
              value={previewData.evalActs}
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Please select"
              //  defaultValue={['BTVN']}
              onChange={value => this.handleChangeEvalActs(value)}
            >
              {childrenEvalActs}
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div>
              {this.renderBackButton()}
              <Button
                type="primary"
                onClick={() => {
                  this.handleSubmit();
                }}
                style={{ marginLeft: "2em" }}
              >
                Continue
                <Icon type="right" />
              </Button>
              <br />
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onAddItemKHGDTH: AddItemKHGDTH
    },
    dispatch
  );
};
export default connect(
  null,
  mapDispatchToProps
)(ItemMenu);
