var imageUrl;
document.getElementById('generate').addEventListener('click', function() {
  const element = document.getElementById("loading-screen");
  element.style.transiton = "opacity 1.5s";
  element.style.opacity = "1";
  /*
  const element = document.getElementById("generate");
  element.innerHTML = "Generating...";
  element.style.opacity = "0.9";
  */
  
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
        /*
        document.querySelector('body').style.opacity = 0
        setTimeout(function() { 
        window.location.href = "./your_world.html"
        }, 1500)
        */
        window.location.href="./your_world.html";
        document.dispatchEvent(new CustomEvent('imageReady', { detail: { imageUrl: imageUrl } }));
      }
    };
    var data = JSON.stringify({ prompt: document.getElementById('journal').value}); // Example prompt
    xhr.send(data);
  });
  
  export { imageUrl };
  /*
  window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = "./your_world.html"
    }, 500)
}
*/
