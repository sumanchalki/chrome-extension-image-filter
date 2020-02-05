function transform() {
  const allImages = document.getElementsByTagName('img');
  for (let item of allImages) {
    let imgWidth = item.width;
    let imgHeight = item.height;
    // Skip smaller images.
    if ((imgWidth < 100 && imgHeight < 100) || item.src === '') {
      continue;
    }
    let imgSrc = item.src;

    let imgDiv = document.createElement('div');
    imgDiv.style.width = `${imgWidth}px`;
    imgDiv.style.height = `${imgHeight}px`;
    imgDiv.style.backgroundSize = `${imgWidth}px ${imgHeight}px`;
    item.parentNode.insertBefore(imgDiv, item);
    imgDiv.appendChild(item);

    // Set an one px dummy image.
    item.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    imgDiv.style.backgroundImage = `url(${imgSrc})`;
    imgDiv.classList.add('grainy-image9876543210');
  }
}

function undo() {
  const allImageDivs = document.querySelectorAll('div.grainy-image9876543210');
  for (let imgDiv of allImageDivs) {
    // For blank values skip.
    if (imgDiv.style.backgroundImage.match(/^url\(['"]?['"]?\)$/)) {
      continue;
    }
    let imgElem = imgDiv.getElementsByTagName('img').item(0);

    let imgSrc = imgDiv.style.backgroundImage.replace(/(^url\(")|("\)$)/gi, '');
    if (imgSrc.match(/^data\:/)) {
      continue;
    }
    imgElem.src = imgSrc;

    imgDiv.parentNode.insertBefore(imgElem, imgDiv);
    imgDiv.remove();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action) {
    if (request.action === 'apply') {
      transform();
    } else if (request.action === 'undo') {
      undo();
    }
  }
});
