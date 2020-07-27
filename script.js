//Image Container & Loader are the two things to be operated on majorly here
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//Ready is a boolean for the loader hidden functionality
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let filterArray = [];

//API
const count = 30;
const apiKey = 'N1CgdDVyytvytq5x2Hn1oz1OZjnRb3vNWgP6nzwzy0U';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Image Loading Check
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
  //IF THE SLIDER WOULD HAVE BEEN A SMOOTH TRANSITION AND NOT AS INFINITE, WE CAN ADD THE CODE BELOW
  // }else{
  //   loader.hidden = false;
  //   ready = false;
  // }
}

// Helper Function to avoid DRY
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Displaying Photos, create elements
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Loading the photos, Main Functionality

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
