import Flickr from './components/Flickr';
import Thesaurus from './components/Thesaurus';

class App {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('.search__input');
    this.background  = document.querySelector('.hero__background');
    this.flickr = new Flickr('9937eb786c73b10e099965d8e6e48a40', this);
    this.thesaurus = new Thesaurus('78f3d8b49dc89abf9207cb09291eea61', this);
    this.initialize();
  }

  initialize() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.flickr.getPhotosFromQuery();
      this.thesaurus.getWordsFromQuery();
    });
  }

}

new App();