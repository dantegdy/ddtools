import React from 'react';
// import logo from "@assets/img/logo.svg";
import { Button, Input, Divider, message } from 'antd';
import { HomeOutlined, ControlOutlined, SaveOutlined } from '@ant-design/icons';
import '@pages/popup/Popup.scss';
import { initformData, initSwitchStatus } from '../../dataConfig';
import ConfigBox from './ConfigBox';
import { welcome, thank, spamming } from './script';

type State = {
  formData: InitformData;
  switchStatus: InitSwitchStatus;
  TabId: number;
};

type switchStatusType = 'welcomeSwitchStatus' | 'thankSwitchStatus' | 'spammingSwitchStatus';

type formDataType = 'roomId' | 'welcomeStr' | 'thankStr' | 'spammingTime' | 'spammingStr';

type spammingConfigType = {
  title: string;
  spammingTime: string;
  placeholder: string;
  inputName: formDataType;
};
type boxContentType = {
  title: string;
  describe: string;
  placeholder: string;
  inputName: formDataType;
  statusName: switchStatusType;
  text: string;
  spammingConfig?: spammingConfigType;
};

class Popup extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      formData: {} as InitformData,
      switchStatus: {} as InitSwitchStatus,
      TabId: null,
    };
  }

  render(): React.ReactNode {
    const boxContentList: boxContentType[] = [
      {
        title: '进入房间公屏欢迎',
        describe: '可使用变量: 用户名：[name] ; 冠名: [host]',
        placeholder: '请输入欢迎词',
        inputName: 'welcomeStr',
        statusName: 'welcomeSwitchStatus',
        text: this.state.formData.welcomeStr,
      },
      {
        title: '送礼物自动感谢',
        describe: '可使用变量: 用户名：[name]',
        placeholder: '请输入感谢词',
        inputName: 'thankStr',
        statusName: 'thankSwitchStatus',
        text: this.state.formData.thankStr,
      },
      {
        title: '自动刷屏',
        describe: '多条请使用/斜杠分割,按顺序发送弹幕池里的内容',
        placeholder: '请输入刷屏内容',
        inputName: 'spammingStr',
        statusName: 'spammingSwitchStatus',
        text: this.state.formData.spammingStr,
        spammingConfig: {
          title: '刷屏间隔时间(秒)',
          spammingTime: this.state.formData.spammingTime,
          placeholder: '请输入秒',
          inputName: 'spammingTime',
        },
      },
    ];

    const BoxContent = boxContentList.map((item) => {
      return (
        <ConfigBox
          key={item.inputName}
          boxContent={item}
          switchOnChange={(name, status) => {
            this.changeStatus(name, status);
          }}
          inputOnChange={(name, value) => {
            this.changeText(name, value);
          }}
          checked={
            this.state.switchStatus[this.state.TabId]
              ? this.state.switchStatus[this.state.TabId]?.[item.statusName]
              : this.state.switchStatus?.default?.[item.statusName]
          }
        />
      );
    });

    return (
      <div className="container">
        <header className="App_header">点点工具库</header>
        <Divider></Divider>
        <div className="content">
          <div className="config_box">
            <span className="roomTitle config_title">默认房间号：</span>
            <Input
              className="roomInput"
              placeholder="请输入房间号"
              value={this.state.formData.roomId}
              onChange={(e) => {
                this.changeText('roomId', e.target.value);
              }}
            ></Input>
            <Button
              icon={<HomeOutlined />}
              disabled={!this.state.formData.roomId}
              onClick={() => {
                chrome.tabs.create({
                  url: 'https://y.tuwan.com/chatroom/' + this.state.formData.roomId,
                });
              }}
            >
              进入房间
            </Button>
          </div>
          <div>{BoxContent}</div>
        </div>
        <footer>
          <Button
            type="primary"
            danger
            icon={<ControlOutlined />}
            onClick={() => {
              this.setData({ formData: initformData, switchStatus: initSwitchStatus });
              message.success('恢复默认成功');
            }}
          >
            恢复默认
          </Button>
        </footer>
      </div>
    );
  }
  async componentDidMount() {
    await this.getTabId();
    await this.getData();
  }

  async getData() {
    await chrome.storage.local.get(['formData', 'switchStatus'], (item) => {
      this.setState({
        formData: item.formData,
        switchStatus: item.switchStatus,
      });
    });
  }
  async getTabId() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    this.setState({
      TabId: tab.id,
    });
  }
  changeStatus(Str: switchStatusType, type: boolean) {
    const { TabId } = this.state;
    const { switchStatus } = JSON.parse(JSON.stringify(this.state));
    if (!switchStatus[TabId]) {
      switchStatus[TabId] = JSON.parse(JSON.stringify(initSwitchStatus.default));
    }
    switchStatus[TabId][Str] = type;
    this.setData({
      switchStatus,
    });
    switch (Str) {
      case 'welcomeSwitchStatus':
        console.log('welcomeSwitchStatus', type);
        type ? welcome.on() : welcome.off();
        break;
      case 'thankSwitchStatus':
        console.log('thankSwitchStatus', type);
        type ? thank.on() : thank.off();
        break;
      case 'spammingSwitchStatus':
        console.log('spammingSwitchStatus', type);
        type ? spamming.on() : spamming.off();
        break;
    }
  }

  changeText(Str: formDataType, value: string) {
    const { formData } = JSON.parse(JSON.stringify(this.state));
    formData[Str] = value;
    this.setData({ formData });
    this.setState({
      formData,
    });
  }

  setData(formData) {
    chrome.storage.local.set(formData, async () => {
      await this.getData();
    });
  }
}

export default Popup;
