import Flickr from './components/Flickr';
import Thesaurus from './components/Thesaurus';
import Unsplash from './components/Unsplash';
import Photo from './components/Photo';

class App {
  constructor() {
    this.formMain = document.querySelector('#form__search__main');
    this.formNav = document.querySelector('#form__search__nav');    
    this.searchSection = document.querySelector('.search');
    this.inputMain = document.querySelector('.search__input');
    this.inputNav = document.querySelector('#input__nav');    
    this.navbar = document.querySelector('.navbar');
    this.background = document.querySelector('.hero__background');
    this.related = document.querySelector('.search__related__list');
    this.loader = document.createElement('span');
    this.flickr = new Flickr(process.env.FLICKR_API, this);
    this.thesaurus = new Thesaurus(process.env.THSRS_API, this);
    this.unsplash = new Unsplash(process.env.UNSPLASH_API, this);
    this.initialize();
  }

  initialize() {
    this.addEventListeners();
    this.loadOnScroll();
  }

  addEventListeners() {
    this.formMain.addEventListener('submit', (e) => {
      this.changeLayout(e);
      this.search(this.inputMain.value);
    });
    this.formNav.addEventListener('submit', (e) => {
      e.preventDefault();
      this.search(this.inputNav.value);
    });
    this.searchSection.addEventListener('animationend', (e) => {
      if(e.animationName == 'fadeOut') {
        this.searchSection.style.display = 'none';
      }
    });
    this.related.addEventListener('click', (e) => {
      this.search(e.target.textContent);
    })
  }

  changeLayout(e) {
    e.preventDefault();
    this.navbar.style.display = 'block';
    this.background.style = '';
    this.searchSection.className += ' fadeOut';
  }

  search(query) {
    const apiCalls = [
      this.flickr.getPhotosFromQuery(query),
      this.thesaurus.getWordsFromQuery(query)
    ];
    this.loader.classList.add('loader');
    this.flickr.wrapper.appendChild(this.loader);
    this.getPromiseData(apiCalls)
      .then(results => this.renderApiResponse(results))
      .then(this.loader.classList.remove('loader'));
  }

  renderApiResponse(data) {
    data.map(res => {
      if (res.photos) {
        this.flickr.render(res);
      } else {
        this.thesaurus.render(res);
      }
    });
  }

  getPromiseData(promises) {
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(res => {
          return res.map(type => type.json());
        })
        .then(res => {
          Promise.all(res)
            .then(resolve);
        })
        .catch(reject);
    });
  }

  loadOnScroll() {
    window.onscroll = (e) => {
      if((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.loadMore();
      }
    }
  }

  loadMore() {
    const apiCall = [this.flickr.getPhotosFromQuery(this.query, false)];
    this.getPromiseData(apiCall)
      .then(results => this.renderApiResponse(results));
  }

}

new App();