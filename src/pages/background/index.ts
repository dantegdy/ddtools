import { initformData, initSwitchStatus } from '@src/dataConfig';

chrome.storage.local.set({ formData: initformData, switchStatus: initSwitchStatus }, () => {});
