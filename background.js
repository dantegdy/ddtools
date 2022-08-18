const initformData = {
  roomId: "27109",
  welcomeStr: "欢迎[name]",
  thankStr: "感谢[name]",
  spammingTime: "10",
  spammingStr: "哈哈哈/hhh/QAQ",
};
const initSwitchStatus = {
  default: {
    welcomeSwitchStatus: false,
    thankSwitchStatus: false,
    spammingSwitchStatus: false,
  },
};

chrome.storage.local.set(
  { formData: initformData, switchStatus: initSwitchStatus },
  () => {}
);
