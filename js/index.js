const panorama = new PANOLENS.ImagePanorama("media/image3.webp");
const imageContainer = document.querySelector(".image-container");
const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  autoRotate: true,
  autoRotateSpeed: 0.5,
  controlBar: false,
  dwellTime: 1,
  cameraFov: 100,
  autoRotateActivationDuration: 600,
  momentum: true,
});
let journal = "";

viewer.disableControl();
viewer.add(panorama);

/*
document.addEventListener('imageReady', function(event) {
  const imageUrl = event.detail.imageUrl;
  startNewLens(imageUrl);
});
*/
function startNewLens() {
  // Example client-side JavaScript file (e.g., client.js)
  // Function to send a prompt to the ChatGPT API and receive a response
  const img = localStorage.getItem('img');
  const imageUrl = localStorage.getItem('imageUrl');
  //img.src = imageUrl;
  const proxyUrl = `/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  const userPanorama = new PANOLENS.ImagePanorama(proxyUrl);
  const imageContainer = document.querySelector("image-container");
  const viewer = new PANOLENS.Viewer({
   container: imageContainer,
   autoRotate: true,
    autoRotateSpeed: 0.5,
    controlBar: false,
    dwellTime: 1,
    cameraFov: 100,
    autoRotateActivationDuration: 600,
    momentum: true,
  });
  viewer.disableControl();
  viewer.add(userPanorama);
  playBackgroundMusic();
}
window.startNewLens = startNewLens;

fetch('/api/chatGPT', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: 'Hello, ChatGPT!' })
})
.then(response => response.json())
.then(data => {
  console.log(data.response);
  // Process the response from the ChatGPT API
})
.catch(error => {
  console.error('Error:', error);
});

