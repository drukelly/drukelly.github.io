// Logic to draw boundaries of video elements on the page
const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  // console.log(rect, windowHeight, windowWidth);
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
};

// Logic to play/pause video elements on the page
const detectElements = () => {
  const videosOnPage = document.querySelectorAll('video');
  const videosObjects = Array.from(videosOnPage);
  videosObjects.forEach((video) => {
    if (isElementInViewport(video)) {
      video.play();
      video.classList.add('animate-on');
      video.classList.remove('animate-away');
    } else {
      video.pause();
      video.classList.add('animate-away');
      video.classList.remove('animate-on');
    }
  });
};

// Run detectElements on page load
window.onload = () => {
  detectElements();
};

// Run detectElements on scroll
window.addEventListener('scroll', detectElements, false);