import React from 'react';
// import logo from "@assets/img/logo.svg";
import { Button, Input, Divider } from 'antd';
import '@pages/popup/Popup.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      switchStatus: {},
    };
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
  render(): React.ReactNode {
    return (
      <div className="container">
        <header className="App_header">点点工具库</header>
        <Divider></Divider>
        <div className="content"></div>
        <Divider></Divider>
        <footer>
          <Button type="primary" danger>
            恢复默认
          </Button>
          <Button type="primary">保存设置</Button>
        </footer>
      </div>
    );
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
