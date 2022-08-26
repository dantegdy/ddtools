import React from 'react';
import { Switch, Input } from 'antd';

const { TextArea } = Input;
type Props = {
  text: string;
  checked: boolean;
  switchOnChange;
  inputOnChange;
};

class Spamming extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(): React.ReactNode {
    return (
      <div className="config_box">
        <div className="config_header">
          <span className="config_title">自动刷屏</span>
          <div className="config_checkbox">
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={this.props.checked}
              disabled={!this.props.text}
              onChange={(checked) => {
                // console.log(checked);
                this.props.switchOnChange(checked);
              }}
            />
          </div>
          <div>多条请使用/斜杠分割,按顺序发送弹幕池里的内容</div>
        </div>
        <div>
          <TextArea
            autoSize
            placeholder="请输入内容,多条请使用/斜杠分割,按顺序发送弹幕池里的内容"
            value={this.props.text}
            onChange={(e) => {
              this.props.inputOnChange(e.target.value);
            }}
          ></TextArea>
        </div>
      </div>
    );
  }
}
export default Spamming;
