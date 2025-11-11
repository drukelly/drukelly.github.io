export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`hero-${cols.length}-cols`);

  // setup image
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.lastElementChild;
    if (img) {
      img.setAttribute('loading', 'eager');
    }
  }
}

