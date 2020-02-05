function applyUndoFilter(action) {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action });
  });
}

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelector('#apply')
      .addEventListener('click', applyUndoFilter.bind(null, 'apply'));
    document
      .querySelector('#undo')
      .addEventListener('click', applyUndoFilter.bind(null, 'undo'));
  });
})();
