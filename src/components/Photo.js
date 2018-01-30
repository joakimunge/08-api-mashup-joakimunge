export default class Photo {
    constructor(photo, caller) {
        this.url = photo.url_q;
        this.title = photo.title;
        this.caller = caller;
        this.initialize();
    }

    initialize() {
        this.render();
    }

    render() {
        const html = `
        <div class="column">
          <img src="${this.url}"></img>
        </div>`;
        this.caller.wrapper.insertAdjacentHTML('beforeend', html);
    }
}