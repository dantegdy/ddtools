import React from 'react';
// import logo from "@assets/img/logo.svg";
import { Button, Input, Divider } from 'antd';
import { HomeOutlined, ControlOutlined, SaveOutlined } from '@ant-design/icons';
import '@pages/popup/Popup.scss';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      switchStatus: {},
    };
  }

  render(): React.ReactNode {
    return (
      <div className="container">
        <header className="App_header">点点工具库</header>
        <Divider></Divider>
        <div className="content">
          <div className="config_box">
            <span className="roomTitle config_title">默认房间号：</span>
            <Input className="roomInput" placeholder="请输入房间号"></Input>
            <Button icon={<HomeOutlined />}>进入房间</Button>
          </div>
        </div>
        <Divider></Divider>
        <footer>
          <Button type="primary" danger icon={<ControlOutlined />}>
            恢复默认
          </Button>
          <Button type="primary" icon={<SaveOutlined />}>
            保存设置
          </Button>
        </footer>
      </div>
    );
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    chrome.storage.local.get(['formData', 'switchStatus'], (item) => {
      console.log(item);
      this.setState({
        formData: item.formData,
        switchStatus: item.switchStatus,
      });
    });
  }
}
// const Popup = () => {
//   return (
//     <div className="container">
//       <header className="App_header">点点工具库</header>
//       <footer>
//         <Button type="primary">保存设置</Button>

//         <Button>恢复默认</Button>
//       </footer>
//     </div>
//   );
// };

export default Popup;
