var imageUrl;
document.getElementById('generate').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/chatGPT', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        //document.getElementById('chatGPTResponse').value = response.response;

        // Handle the image URL
        imageUrl = response.imageUrl;
        var img = document.createElement('img');
        img.src = imageUrl;
        console.log(imageUrl);
        window.imageUrl = imageUrl;
        window.img = img;
        localStorage.setItem('imageUrl', imageUrl);
        localStorage.setItem('img', img);
        window.location.href="./your_world.html";
        document.dispatchEvent(new CustomEvent('imageReady', { detail: { imageUrl: imageUrl } }));
      }
    };
    var data = JSON.stringify({ prompt: document.getElementById('journal').value}); // Example prompt
    xhr.send(data);
  });
  
  export { imageUrl };
  