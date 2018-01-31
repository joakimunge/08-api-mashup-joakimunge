import Photo from './Photo';

export default class Flickr {
  constructor(apiKey, caller) {
    this.apiKey = apiKey;
    this.caller = caller;
    this.wrapper = document.querySelector('.results');
    this.photoCounter = 1;
    this.columnsCounter = 0;
    this.page = 0;

    this.createColumns();
  }

  getPhotosFromQuery(query = null, newQuery = true) {
    if (newQuery) {
      this.wrapper.innerHTML = "";
      this.query = this.caller.input.value;
      this.page = 5;
    } else {
      this.query = query;
      this.page++;
    }

    const sort = '&sort=interestingness-desc';
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
    const params = '&text=' + this.query + sort + '&page=' + this.page + '&per_page=9&extras=url_z&format=json&nojsoncallback=1';
    const flickrUrl = url + this.apiKey + params;
    fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        this.setBackground(res);
        this.render(res);
      })
      .catch(err => console.log(err));
  }

  setBackground(res) {
    const url = res.photos.photo[5].url_z;
    this.caller.background.style = `
        background: url(${url}) no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover; 
        -o-background-size: cover;
      `;

  }

  renderPhoto(photo, delay, columnId) {
    new Photo(photo, this, delay * 100, columnId);
  }

  createColumns() {
    for (let i = 1; i < 5; i++) {
      const row = `<div id="${i}" class="results__col"></div>`;
      this.wrapper.insertAdjacentHTML('beforeend', row);
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