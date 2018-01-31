import Photo from './Photo';

export default class Flickr {
    constructor(apiKey, caller) {
      this.apikey = apiKey;
      this.caller = caller;
      this.wrapper = document.querySelector('.results');
      this.photoCounter = 0;
      this.columnsCounter = 0;
    }
  
    getPhotosFromQuery(query = null) {
      this.wrapper.innerHTML = "";
      if(query === null) {
        query = this.caller.input.value;
      }
      const sort = '&sort=interestingness-desc'
      const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
      const params = '&text=' + query + sort + '&per_page=18&extras=url_l&format=json&nojsoncallback=1';
      const flickrUrl = url + this.apikey + params;
  
      fetch(flickrUrl)
        .then(res => res.json())
        .then(res => {
          this.setBackground(res);
          this.render(res);
        })
        .catch(err => console.log(err));
    }
  
    setBackground(res) {
      const url = res.photos.photo[5].url_l;
      this.caller.background.style = `
        background: url(${url}) no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover; 
        -o-background-size: cover;
      `;
  
    }

    renderPhoto(photo, delay) {
      const row = '<div class="results__col"></div>';
      if (this.photoCounter === 0 || this.photoCounter % 3 === 0) {
          this.wrapper.insertAdjacentHTML('beforeend', row);
      }
      new Photo(photo, this, delay * 100);
      this.photoCounter++;
    }

    render(res) {
      this.photoCounter = 0;
        let photos = res.photos.photo;
        photos = photos.map((photo, i) => this.renderPhoto(photo, i));
    }
  }