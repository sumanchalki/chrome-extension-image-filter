function transform() {
  const allImages = document.getElementsByTagName('img');
  for (let item of allImages) {
    let imgWidth = item.width;
    let imgHeight = item.height;
    if (imgWidth < 100 && imgHeight < 100) {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  transform();
});
