/// <reference types="vite/client" />

interface Window {
  welcomeTime: any;
  thankTime: any;
  spammingTime: any;
}

interface InitformData {
  roomId: string;
  welcomeStr: string;
  thankStr: string;
  spammingTime: string;
  spammingStr: string;
}

interface SwitchStatus {
  welcomeSwitchStatus: boolean;
  thankSwitchStatus: boolean;
  spammingSwitchStatus: boolean;
}

interface InitSwitchStatus {
  default: SwitchStatus;
  [propName: string]: SwitchStatus;
}
