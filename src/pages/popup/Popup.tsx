import React from 'react';
// import logo from "@assets/img/logo.svg";
import { Button, Input, Divider, message } from 'antd';
import { HomeOutlined, ControlOutlined, SaveOutlined } from '@ant-design/icons';
import '@pages/popup/Popup.scss';
import { initformData, initSwitchStatus } from '../../dataConfig';
import ConfigBox from './ConfigBox';
import Spamming from './Spamming';

type State = {
  formData: InitformData;
  switchStatus: InitSwitchStatus;
  TabId: number;
};

type switchStatusType = 'welcomeSwitchStatus' | 'thankSwitchStatus' | 'spammingSwitchStatus';

type formDataType = 'roomId' | 'welcomeStr' | 'thankStr' | 'spammingTime' | 'spammingStr';

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
          <ConfigBox
            boxContent={{
              title: '进入房间公屏欢迎',
              describe: '可使用变量: 用户名：[name] ; 冠名: [host]',
              placeholder: '请输入欢迎词',
            }}
            text={this.state.formData.welcomeStr}
            switchOnChange={(checked) => {
              this.changeChecked('welcomeSwitchStatus', checked);
            }}
            inputOnChange={(value) => {
              this.changeText('welcomeStr', value);
            }}
            checked={
              this.state.switchStatus[this.state.TabId]
                ? this.state.switchStatus[this.state.TabId]?.welcomeSwitchStatus
                : this.state.switchStatus?.default?.welcomeSwitchStatus
            }
          />
          <ConfigBox
            boxContent={{
              title: '送礼物自动感谢',
              describe: '可使用变量: 用户名：[name]',
              placeholder: '请输入感谢词',
            }}
            text={this.state.formData.thankStr}
            switchOnChange={(checked) => {
              this.changeChecked('thankSwitchStatus', checked);
            }}
            inputOnChange={(value) => {
              this.changeText('thankStr', value);
            }}
            checked={
              this.state.switchStatus[this.state.TabId]
                ? this.state.switchStatus[this.state.TabId]?.thankSwitchStatus
                : this.state.switchStatus?.default?.thankSwitchStatus
            }
          />
          <ConfigBox
            boxContent={{
              title: '自动刷屏',
              describe: '多条请使用/斜杠分割,按顺序发送弹幕池里的内容',
              placeholder: '请输入刷屏内容',
              spammingConfig: {
                title: '刷屏间隔时间(秒)',
                spammingTime: this.state.formData.spammingTime,
                placeholder: '请输入秒',
              },
            }}
            text={this.state.formData.spammingStr}
            switchOnChange={(checked) => {
              this.changeChecked('spammingSwitchStatus', checked);
            }}
            inputOnChange={(value) => {
              this.changeText('spammingStr', value);
            }}
            checked={
              this.state.switchStatus[this.state.TabId]
                ? this.state.switchStatus[this.state.TabId]?.spammingSwitchStatus
                : this.state.switchStatus?.default?.spammingSwitchStatus
            }
          />
        </div>
        <Divider></Divider>
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
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => {
              const { formData } = this.state;
              this.setData({ formData });
              message.success('保存设置成功');
            }}
          >
            保存设置
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
      console.log(item);
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
  changeChecked(Str: switchStatusType, type: boolean) {
    const { TabId } = this.state;
    const { switchStatus } = JSON.parse(JSON.stringify(this.state));
    if (!switchStatus[TabId]) {
      switchStatus[TabId] = JSON.parse(JSON.stringify(initSwitchStatus.default));
    }
    switchStatus[TabId][Str] = type;
    this.setData({
      switchStatus,
    });
  }

  changeText(Str: formDataType, value: string) {
    const { formData } = JSON.parse(JSON.stringify(this.state));
    formData[Str] = value;
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
