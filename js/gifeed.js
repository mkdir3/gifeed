fetch(
  `https://api.giphy.com/v1/gifs/search?api_key=Te9zomeC68QwNNPccwsvP7L3yDaTIv73&q=vie&limit=25&offset=0&rating=r&lang=fr`
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const content = json.data[0];
    const src = content.images.original.mp4;

    const video = document.createElement("video");
    video.src = src;
    // video.controls = true;
    // alternative to controls to avoid freeze issue is muted
    video.muted = true;
    video.autoplay = true;
    video.loop = true;

    const videoEl = document.querySelector(".videos");
    videoEl.appendChild(video);
  })
  .catch((error) => {
    console.log(error);
  });
