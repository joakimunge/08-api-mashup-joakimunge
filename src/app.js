import Flickr from './components/Flickr';
import Thesaurus from './components/Thesaurus';
import Photo from './components/Photo';

class App {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('.search__input');
    this.background = document.querySelector('.hero__background');
    this.flickr = new Flickr(process.env.FLICKR_API, this);
    this.thesaurus = new Thesaurus(process.env.THSRS_API, this);
    this.initialize();
  }

  initialize() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.flickr.getPhotosFromQuery(this.input.value);
      this.thesaurus.getWordsFromQuery(this.input.value);
    });

  }

  // Add api calls to array
  // Return fetch from api calls
  // Promise all api calls

  // getPromiseDataFromArray(apiCalls) {
  //   .then(result => {
  //     //this.renderFlickr(result[0])
  //     //this.renderThesaurus(result[1])
      
  //   })
  // } 

}

new App();