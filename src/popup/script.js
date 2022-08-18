class Switch {
  constructor(onFunc, offFunc) {
    if (onFunc) {
      this.on = async () => {
        const tabId = await getTabId();
        chrome.scripting.executeScript(
          {
            target: { tabId, allFrames: true },
            files: ["src/js/jquery-1.8.3.js"],
          },
          () => {
            chrome.scripting.executeScript({
              target: { tabId },
              func: onFunc,
            });
          }
        );
      };
    }
    if (offFunc) {
      this.off = async () => {
        const tabId = await getTabId();
        chrome.scripting.executeScript({
          target: { tabId },
          function: offFunc,
        });
      };
    }
  }
  on = () => {
    console.log("on");
  };
  off = () => {
    console.log("off");
  };
}

function welcomeOnFunc() {
  let bannerstr = "";
  let n = $(".welcome-get-message:last").attr("account");
  window.welcomeTime = setInterval(() => {
    if (n != $(".welcome-get-message:last").attr("account")) {
      chrome.storage.local.get(["formData"], (data) => {
        n = $(".welcome-get-message:last").attr("account");
        const { welcomeStr } = data.formData;
        const uname = $(".welcome-get-message:last span").html();
        const user_host = $(".seat-user-name").html();
        bannerstr = welcomeStr;
        bannerstr = bannerstr.replace("[name]", uname);
        bannerstr = bannerstr.replace("[host]", user_host);
        console.log(bannerstr);
        $("textarea").val(bannerstr);
        $(
          ".chat-center-inputcontent .chat-center-input-left .chat-input-btn-send"
        ).click();
      });
    }
  }, 1500);
}
function welcomeOffFunc() {
  clearInterval(window.welcomeTime);
}

function thankOnFunc() {
  let fromGift = "";
  let nn = $(".chat-gift-main:last").text().trim();
  window.thankTime = setInterval(() => {
    if (nn != $(".chat-gift-main:last").text().trim()) {
      chrome.storage.local.get(["formData"], (data) => {
        const { thankStr } = data.formData;
        nn = $(".chat-gift-main:last").text().trim();
        const uname = $(".chat-gift-content:last span:first").text();
        fromGift = thankStr;
        fromGift = fromGift.replace("[gift]", nn);
        fromGift = fromGift.replace("[name]", uname);
        console.log(fromGift);
        $("textarea").val(fromGift);
        $(
          ".chat-center-inputcontent .chat-center-input-left .chat-input-btn-send"
        ).click();
      });
    }
  }, 1500);
}
function thankOffFunc() {
  clearInterval(window.thankTime);
}

function spammingOnFunc() {
  const minute = 1000;
  let n = 0;
  chrome.storage.local.get(["formData"], (data) => {
    const { spammingStr, spammingTime } = data.formData;
    const mout = parseFloat(spammingTime) * minute;
    console.log("定时时间", mout);
    const arrstr = spammingStr.split("/");
    const nums = arrstr.length - 1;
    let x = 0;
    window.spammingTime = setInterval(() => {
      let random = arrstr[x++];
      if (x > nums) {
        x = 0;
      }
      n++;
      $(".chat-center-inputcontent textarea").val(random);
      $(
        ".chat-center-inputcontent .chat-center-input-left .chat-input-btn-send"
      ).click();
      console.log("当前已刷" + n + "条");
    }, mout);
  });
}
function spammingOffFunc() {
  clearInterval(window.spammingTime);
}

async function getTabId() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
}
const welcome = new Switch(welcomeOnFunc, welcomeOffFunc);
const thank = new Switch(thankOnFunc, thankOffFunc);
const spamming = new Switch(spammingOnFunc, spammingOffFunc);

export { welcome, thank, spamming };
