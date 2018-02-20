import FontFaceObserver from 'fontfaceobserver';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmlnZmF0ZG9nIiwiYSI6ImM1ZWIyYzYzMzkyM2JlMTc0M2VjNmRlOTk5NDdkN2VjIn0.DoyA-reichUjF_FO9dkazQ';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  }
);
