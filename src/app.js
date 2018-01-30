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

class Flickr {
  constructor(apiKey, caller) {
    this.apikey = apiKey;
    this.caller = caller;
  }

  getPhotosFromQuery() {
    const query = this.caller.input.value;
    const sort = '&sort=interestingness-desc'
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
    const params = '&text=' + query + sort + '&extras=url_q&format=json&nojsoncallback=1';
    const flickrUrl = url + this.apikey + params;

    fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        console.log('success!');
        console.log(res);
        this.setBackground(res);
      })
      .catch(err => console.log(err));
  }

  setBackground(res) {
    const farmId = res.photos.photo[5].farm;
    const serverId = res.photos.photo[5].server;
    const id = res.photos.photo[5].id;
    const secret = res.photos.photo[5].secret;
    const url = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
    console.log(this.caller);
    this.caller.background.style = `
      background: url(${url}) no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover; 
      -o-background-size: cover;
    `;

  }
}

class Thesaurus {
  constructor(apiKey, caller) {
    this.apiKey = apiKey;
    this.caller = caller;
    this.related = document.querySelector('.search__related__list');
  }

  getWordsFromQuery() {
    const query = this.caller.input.value;
    const url = 'http://words.bighugelabs.com/api/2/78f3d8b49dc89abf9207cb09291eea61/';
    const thesaurusUrl = url + query + '/json';

    fetch(thesaurusUrl)
      .then(res => res.json())
      .then(res => {
        console.log('success!');
        this.render(res);
      })
      .catch(err => console.log(err));
  }

  render(res) {
    console.log(res);
  }
}

new App();