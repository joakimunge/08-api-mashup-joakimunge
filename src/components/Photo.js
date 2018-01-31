export default class Photo {
  constructor(photo, caller, delay, columnId) {
    this.url = photo.url_z;
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
    // const columnId = this.caller.photoCounter;
    console.log(this.columnId);
    const column = document.getElementById(this.columnId);
    column.insertAdjacentHTML('beforeend', html);
  }
}