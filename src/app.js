import Flickr from './components/Flickr';
import Thesaurus from './components/Thesaurus';
import Unsplash from './components/Unsplash';
import Photo from './components/Photo';

class App {
  constructor() {
    this.form = document.querySelector('#form__search__main');
    this.search = document.querySelector('.search');
    this.input = document.querySelector('.search__input');
    this.navbar = document.querySelector('.navbar');
    this.background = document.querySelector('.hero__background');
    this.flickr = new Flickr(process.env.FLICKR_API, this);
    this.thesaurus = new Thesaurus(process.env.THSRS_API, this);
    this.unsplash = new Unsplash(process.env.UNSPLASH_API, this);
    this.initialize();
  }

  initialize() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.navbar.style.display = 'block';
      this.background.style = '';
      this.search.className += ' fadeOut';
      this.flickr.getPhotosFromQuery(this.input.value);
      this.thesaurus.getWordsFromQuery(this.input.value);
    });
    this.search.addEventListener('animationend', (e) => {
      this.search.style.display = 'none';
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