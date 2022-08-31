import React from 'react';
import { Switch, Input } from 'antd';

const { TextArea } = Input;

type formDataType = 'roomId' | 'welcomeStr' | 'thankStr' | 'spammingTime' | 'spammingStr';
type switchStatusType = 'welcomeSwitchStatus' | 'thankSwitchStatus' | 'spammingSwitchStatus';

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
type Props = {
  // text: string;
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
              disabled={
                this.props.boxContent.spammingConfig
                  ? !this.props.boxContent.text || !this.props.boxContent.spammingConfig.spammingTime
                  : !this.props.boxContent.text
              }
              onChange={(checked) => {
                this.props.switchOnChange(this.props.boxContent.statusName, checked);
              }}
            />
          </div>
          {this.props.boxContent.spammingConfig && (
            <div className="config_spammingConfig">
              <span className="config_spammingConfig_title">{this.props.boxContent.spammingConfig.title}</span>
              <Input
                className="config_spammingConfig_input"
                placeholder={this.props.boxContent.spammingConfig.placeholder}
                value={this.props.boxContent.spammingConfig.spammingTime}
                onChange={(e) => {
                  this.props.inputOnChange(this.props.boxContent.spammingConfig.inputName, e.target.value);
                }}
              ></Input>
            </div>
          )}
          <div>{this.props.boxContent.describe}</div>
        </div>
        <div>
          {!this.props.boxContent.spammingConfig ? (
            <Input
              placeholder={this.props.boxContent.placeholder}
              value={this.props.boxContent.text}
              onChange={(e) => {
                this.props.inputOnChange(this.props.boxContent.inputName, e.target.value);
              }}
            ></Input>
          ) : (
            <TextArea
              autoSize
              placeholder={this.props.boxContent.placeholder}
              value={this.props.boxContent.text}
              onChange={(e) => {
                this.props.inputOnChange(this.props.boxContent.inputName, e.target.value);
              }}
            ></TextArea>
          )}
        </div>
      </div>
    );
  }
}
export default ConfigBox;
