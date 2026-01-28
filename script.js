let wrapper = document.querySelector(".wrapper");
let box = document.querySelector(".box");

let access_key = "EWe-j4gVwI6pP1413e4mSnBFmg2WpyOgwEhJR2kKTS8";

let page = 1;
let isLoading = false;

async function GetImages() {
  if (isLoading) {
    return;
  }

  isLoading = true;

  try {
    let response = await fetch(
      `https://api.unsplash.com/search/photos?query=mountains&page=${page}&per_page=20&client_id=${access_key}`,
    );

    let data = await response.json();
    console.log(data);
    DisplayImages(data);
    page++;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading = false;
  }
}

GetImages();

function DisplayImages(data) {
  data.results.forEach((photo) => {
    const image = document.createElement("img");
    image.classList.add("images");

    image.src = photo.urls.regular;
    image.loading = "lazy";
    wrapper.append(image);
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      GetImages();
    }
  });
});
observer.observe(box);
