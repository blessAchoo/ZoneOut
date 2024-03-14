
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

viewer.disableControl();

viewer.add(panorama);


