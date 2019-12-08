'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['red', 'yellow', 'green'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({ color: item }, function() {
        console.log('color set ' + item);
      });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
