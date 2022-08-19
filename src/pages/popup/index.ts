// import * as layui  from 'layui'
import $ from 'jquery';
import 'layui/dist/css/layui.css';
import './index.css';
import 'layui';
import { welcome, thank, spamming } from './script';
import { initformData, initSwitchStatus } from '@src/dataConfig';

layui.use('form', async function () {
  var form = layui.form;
  const saveBtn = $('#saveBtn');
  const defaultBtn = $('#defaultBtn');
  const goRoomBtn = $('#goRoomBtn');
  const welcomeSwitch = $('#welcomeSwitch');
  const thankSwitch = $('#thankSwitch');
  const spammingSwitch = $('#spammingSwitch');

  let nowSwitchStatus = {};

  function setData(formData) {
    chrome.storage.local.set(formData, () => {});
    window.alert('修改配置成功');
  }

  function getFromData() {
    const roomId = $('#roomId').val() || '';
    const welcomeStr = $('#welcomeStr').val() || '';
    const thankStr = $('#thankStr').val() || '';
    const spammingTime = $('#spammingTime').val() || '';
    const spammingStr = $('#spammingStr').val() || '';
    return { roomId, welcomeStr, thankStr, spammingTime, spammingStr } as InitformData;
  }

  function getData() {
    console.log(chrome.storage);
    chrome.storage.local.get(['formData', 'switchStatus'], (item) => {
      setValue(item.formData);
      setDisabled(item.formData);
      console.log(item);
      setSwitchStatus(item.switchStatus);
      form.render();
    });
  }

  async function setSwitchStatus(switchStatus: InitSwitchStatus) {
    const { welcomeSwitchStatus, thankSwitchStatus, spammingSwitchStatus } =
      switchStatus[TabId] || switchStatus.default;
    nowSwitchStatus = switchStatus;
    welcomeSwitch.attr({ checked: welcomeSwitchStatus });
    thankSwitch.attr({ checked: thankSwitchStatus });
    spammingSwitch.attr({ checked: spammingSwitchStatus });
  }

  function setValue(formData: InitformData) {
    const { roomId, welcomeStr, thankStr, spammingTime, spammingStr } = formData;
    $('#roomId').val(roomId);
    $('#welcomeStr').val(welcomeStr);
    $('#thankStr').val(thankStr);
    $('#spammingTime').val(spammingTime);
    $('#spammingStr').val(spammingStr);
  }

  function setDisabled(formData: InitformData) {
    const { welcomeStr, thankStr, spammingTime, spammingStr } = formData;
    welcomeStr ? welcomeSwitch.removeAttr('disabled') : welcomeSwitch.attr({ disabled: 'disabled' });
    thankStr ? thankSwitch.removeAttr('disabled') : thankSwitch.attr({ disabled: 'disabled' });
    spammingTime && spammingStr ? spammingSwitch.removeAttr('disabled') : spammingSwitch.attr({ disabled: 'disabled' });
  }

  async function getTabId() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.id;
  }
  const TabId = await getTabId();

  getData();
  saveBtn.click(() => {
    const formData = getFromData();
    setData({ formData });
    getData();
  });
  defaultBtn.click(() => {
    setData({ formData: initformData, switchStatus: initSwitchStatus });
    getData();
  });
  goRoomBtn.click(() => {
    chrome.storage.local.get(['formData'], (item) => {
      const { roomId } = item.formData;
      if (roomId) {
        chrome.tabs.create({
          url: 'https://y.tuwan.com/chatroom/' + roomId,
        });
      }
    });
  });

  form.on('switch', async function (data) {
    const { checked, id } = data.elem;
    // console.log(id); //得到checkbox原始DOM对象
    // console.log(checked); //开关是否开启，true或者false
    const defaultSwitchStatus = JSON.parse(JSON.stringify(initSwitchStatus.default));
    if (!nowSwitchStatus[TabId]) {
      nowSwitchStatus[TabId] = defaultSwitchStatus;
    }
    nowSwitchStatus[TabId][id + 'Status'] = checked;
    chrome.storage.local.set({ switchStatus: nowSwitchStatus });
    switch (id) {
      case 'welcomeSwitch':
        checked ? welcome.on() : welcome.off();
        break;
      case 'thankSwitch':
        checked ? thank.on() : thank.off();
        break;
      case 'spammingSwitch':
        checked ? spamming.on() : spamming.off();
        break;
    }
  });
});
