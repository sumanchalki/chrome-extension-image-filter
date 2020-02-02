function sendApplyFilter() {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    var activeTab = tabs[0];
    var aa = chrome.tabs.sendMessage(activeTab.id, { message: 'start' });
  });
}

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#apply').addEventListener('click', sendApplyFilter);
    document.querySelector('#undo').addEventListener('click', sendApplyFilter);
  });
})();
