export default class Flickr {
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