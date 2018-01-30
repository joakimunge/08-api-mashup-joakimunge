export default class Photo {
    constructor(photo) {
        this.url = photo.url_q;
        this.title = photo.title;
        this.render();
    }

    render() {
        const html = `
        <div class="column">
          <img src="${url}"></img>
        </div>`;
    }
}