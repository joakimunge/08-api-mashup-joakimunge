import Photo from './Photo';

export default class Flickr {
  constructor(apiKey, caller) {
    this.apiKey = apiKey;
    this.caller = caller;
    this.wrapper = document.querySelector('.results');
    this.photoCounter = 1;
    this.page = 0;
    this.query = 'mountains';
    this.initialize();
  }

  initialize() {
    this.loadOnScroll();
  }

  loadOnScroll() {
    window.onscroll = (e) => {
      if((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.loadMore();
      }
    }
  }

  getPhotosFromQuery(query = null, newQuery = true) {
    if (newQuery) {
      this.wrapper.innerHTML = "";
      this.renderColumns();
      this.query = query;
      this.page = 5;
    } else {
      this.page++;
    }

    const sort = '&sort=relevance';
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
    const params = '&text=' + this.query + sort + '&page=' + this.page + '&per_page=18&extras=url_m&format=json&nojsoncallback=1';
    const flickrUrl = url + this.apiKey + params;
    fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        this.render(res);
      })
      .catch(err => console.log(err));
  }

  loadMore() {
    this.getPhotosFromQuery(this.query, false);
  }

  renderPhoto(photo, delay, columnId) {
    new Photo(photo, this, delay * 100, columnId);
  }

  renderColumns() {
    for (let i = 1; i < 5; i++) {
      const col = `<div id="col-${i}" class="results__col"></div>`;
      this.wrapper.insertAdjacentHTML('beforeend', col);
    }
  }

  render(res) {
    document.querySelectorAll('.results__col').innerHTML = "";
    let photos = res.photos.photo;
    photos = photos.map((photo, i) => {
      this.renderPhoto(photo, i, this.photoCounter);
      this.photoCounter === 4
        ? this.photoCounter = 1
        : this.photoCounter++;
    });
  }
}