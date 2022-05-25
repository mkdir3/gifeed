const API_KEY = `Te9zomeC68QwNNPccwsvP7L3yDaTIv73`;

function createVideo(src) {
  const video = document.createElement("video");
  video.className = "video";
  video.src = src;
  // video.controls = true;
  // alternative to controls to avoid freeze issue is muted
  video.muted = true;
  video.autoplay = true;
  video.loop = true;

  return video;
}

const fetchGiffy = (searchTerm) => {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=r&lang=fr`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const content = json.data[0];
      const src = content.images.original.mp4;

      const video = createVideo(src);
      const videoEl = document.querySelector(".videos");
      videoEl.appendChild(video);
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchEl = document.querySelector(".search-input");
const hintEl = document.querySelector(".search-hint");

const doSearch = (e) => {
  const searchTerm = searchEl.value;

  if (searchTerm.length > 2) {
    hintEl.innerHTML = `💡 Recherche de gif ${searchTerm}`;
    document.body.classList.add("show-hint");
  } else {
    document.body.classList.remove("show-hint");
  }

  if (e.key === "Enter" && searchTerm.length > 2) {
    fetchGiffy(searchTerm);
  }
};

searchEl.addEventListener("keyup", doSearch);
