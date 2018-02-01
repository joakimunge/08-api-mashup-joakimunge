export default class Unsplash {
    constructor(apiKey, caller) {
        this.apiKey = '7e60e1a844111d7be301c1e3e04855093203e8c015634d05b098284a85b3be12';
        this.caller = caller;
        this.getPhotosFromQuery();
    }

    getPhotosFromQuery() {
        const photo = '_F9rJR86qf4' //temporary
        const url = 'https://api.unsplash.com/photos/' + photo + '?client_id=' + this.apiKey;
        fetch(url)
          .then(res => res.json())
          .then(res => {
              this.render(res);
          })
          .catch(err => console.log(err));
    }

    render(res) {
      this.caller.background.style = `
      background: url('https://images.unsplash.com/photo-1443996104801-80c82e789b18?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjIwNTIxfQ&s=36ed7b02348e6ab9596609b4aa75db00') no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      `
    }

}