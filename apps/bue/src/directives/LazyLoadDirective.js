export default {
  inserted: el => {
    function loadImage () {
      const imageElement = Array.from(el.children).find(
        el => el.nodeName === 'IMG'
      );
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          el.classList.add('loaded');
        });
        imageElement.addEventListener('error', () => {
          el.classList.add('error');
        });
        imageElement.src = imageElement.dataset.url;
      }
    }

    function handleIntersect (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver () {
      const options = {
        root: null,
        threshold: "0"
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    if (window['IntersectionObserver']) {
      createObserver();
    } else {
      loadImage(); // replace this with an IE-supported one later..
      // new Image() loaded that way? or change all of them to that anyways?
    }
  }
}
