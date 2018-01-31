export default class Thesaurus {
  constructor(apiKey, caller) {
    this.apiKey = apiKey;
    this.caller = caller;
    this.related = document.querySelector('.search__related__list');
  }

  getWordsFromQuery() {
    const query = this.caller.input.value;
    const url = 'http://words.bighugelabs.com/api/2/78f3d8b49dc89abf9207cb09291eea61/';
    const thesaurusUrl = url + query + '/json';

    fetch(thesaurusUrl)
      .then(res => res.json())
      .then(res => {
        this.render(res);
      })
      .catch(err => console.log(err));
  }

  render(res) {
    const words = res.verb.syn.map(verb => {
      const html = `<li class=".search__related__list__item">${verb}</li>`
    }).join("");
    this.related.insertAdjacentHTML('beforeend', words);
  }
}