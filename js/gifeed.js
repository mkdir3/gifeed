const API_KEY = `Te9zomeC68QwNNPccwsvP7L3yDaTIv73`;

// Elements needed
const searchEl = document.querySelector(".search-input");
const hintEl = document.querySelector(".search-hint");
const videoEl = document.querySelector(".videos");
const clearEl = document.querySelector(".search-clear");

// Display loading element
const toggleLoading = (state) => {
  if (state) {
    document.body.classList.add("loading");
    searchEl.disabled = true;
  } else {
    document.body.classList.remove("loading");
    searchEl.disabled = false;
    searchEl.focus();
  }
};

// Video element
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

// Random length for fetch differents gifs
function getRandomInt(length) {
  return Math.floor(Math.random() * length);
}

// Fetch function
const fetchGiphy = (searchTerm) => {
  toggleLoading(true);
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=r&lang=fr`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const length = json.data.length;
      const content = json.data[getRandomInt(length)];
      const src = content.images.original.mp4;

      const video = createVideo(src);
      videoEl.appendChild(video);

      video.addEventListener("loadeddata", (e) => {
        video.classList.add("visible");
        toggleLoading(false);
        document.body.classList.add("has-results");
        hintEl.innerHTML = `Pressez entrez pour voir d'autres ${searchTerm}`;
      });
    })
    .catch((error) => {
      hintEl.innerHTML = `Il y a un probleme`;
    });
};

// Events functions
const doSearch = (e) => {
  const searchTerm = searchEl.value;

  if (searchTerm.length > 2) {
    hintEl.innerHTML = `💡 Recherche de gif ${searchTerm}`;
    document.body.classList.add("show-hint");
  } else {
    document.body.classList.remove("show-hint");
  }

  if (e.key === "Enter" && searchTerm.length > 2) {
    fetchGiphy(searchTerm);
  }
};
const clearSearch = () => {
  document.body.classList.remove("has-results");
  searchEl.innerHTML = "";
  videoEl.innerHTML = "";
  hintEl.innerHTML = "";

  searchEl.focus();
};
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    clearSearch();
  }
});

// Events
searchEl.addEventListener("keyup", doSearch);
clearEl.addEventListener("click", clearSearch);
