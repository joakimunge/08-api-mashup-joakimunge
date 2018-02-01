export default class Photo {
  constructor(photo, caller, delay, columnId) {
    this.url = photo.url_m;
    this.title = photo.title;
    this.caller = caller;
    this.delay = delay;
    this.columnId = columnId;
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
    const column = document.getElementById('col-' + this.columnId);
    column.insertAdjacentHTML('beforeend', html);
  }
}