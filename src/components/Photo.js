export default class Photo {
  constructor(photo, caller, delay) {
    this.url = photo.url_z;
    this.title = photo.title;
    this.caller = caller;
    this.delay = delay;
    this.initialize();
  }

  initialize() {
    this.render();
  }

  render() {
    const html = `
        <div class="results__col__item" style="animation-delay: ${this.delay}ms">
          <a href="#"><img src="${this.url}"></img></a>
        </div>`;
    this.caller.wrapper.lastChild.insertAdjacentHTML('beforeend', html);
  }
}