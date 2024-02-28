const apiKey = "QvPelGzuJeaHvWxAWDmxrctOwHlW9v9PCEnhr73rMUo";

const formEl = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".result");
const showMore = document.getElementById("show-button");

let inputData = "";
let page = 0;
async function searchImages() {
  if (searchInput.value) {
    inputData = searchInput.value;
  }
  console.log(page);

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  const respone = await fetch(url);
  const data = await respone.json();
  console.log(data);
  const results = data.results;

  results.map((result) => {
    const imgesbox = document.createElement("div");
    imgesbox.classList.add("result-box");
    const imges = document.createElement("img");
    imges.src = result.urls.small;
    imges.alt = result.alt_description;
    const ancor = document.createElement("a");
    ancor.href = result.links.html;
    ancor.target = "_blank";
    const description = document.createElement("p");
    description.textContent = result.alt_description;

    imgesbox.appendChild(imges);
    imgesbox.appendChild(ancor);
    searchResults.appendChild(imgesbox);
    ancor.appendChild(imges);
    imgesbox.appendChild(description);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchResults.innerHTML = "";
  searchImages();
});

showMore.addEventListener("click", () => {
  page++;
  searchImages();
});

if (page === 0) {
  searchResults.innerHTML = "";
  let randSearch = ["wallpaper", "girl", "random", "black wallpaper", "books"];
  randSearch.sort((a, b) => 0.5 - Math.random());
  inputData = randSearch[0];
  page = 1;
  searchImages();
}
const themeToggle = document.getElementById("theme-toggle");

function toggleDarkTheme() {
  document.body.classList.toggle("dark-theme");
}
let clik = 0;
themeToggle.addEventListener("click", () => {
  const sun = document.getElementById("night-mode");
  const dark = document.getElementById("dark-mode");
  if (clik == 0) {
    sun.style.display = "block";
    dark.style.display = "none";
    console.log("if owrks");
    clik++;
  } else {
    sun.style.display = "none";
    dark.style.display = "block";
    console.log("else owrks");
    clik = 0;
  }

  toggleDarkTheme();
});
