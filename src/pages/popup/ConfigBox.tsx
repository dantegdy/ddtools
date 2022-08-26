import React from 'react';
import { Switch, Input } from 'antd';

const { TextArea } = Input;

type spammingConfigType = {
  title: string;
  spammingTime: string;
  placeholder: string;
};
type boxContentType = {
  title: string;
  describe: string;
  placeholder: string;
  spammingConfig?: spammingConfigType;
};
type Props = {
  text: string;
  checked: boolean;
  switchOnChange;
  inputOnChange;
  boxContent: boxContentType;
};

class ConfigBox extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(): React.ReactNode {
    return (
      <div className="config_box">
        <div className="config_header">
          <span className="config_title">{this.props.boxContent.title}</span>
          <div className="config_checkbox">
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={this.props.checked}
              disabled={!this.props.text}
              onChange={(checked) => {
                this.props.switchOnChange(checked);
              }}
            />
          </div>
          <div>{this.props.boxContent.describe}</div>
        </div>
        <div>
          {!this.props.boxContent.spammingConfig ? (
            <Input
              placeholder={this.props.boxContent.placeholder}
              value={this.props.text}
              onChange={(e) => {
                this.props.inputOnChange(e.target.value);
              }}
            ></Input>
          ) : (
            <TextArea
              autoSize
              placeholder={this.props.boxContent.placeholder}
              value={this.props.text}
              onChange={(e) => {
                this.props.inputOnChange(e.target.value);
              }}
            ></TextArea>
          )}
        </div>
      </div>
    );
  }
}
export default ConfigBox;
