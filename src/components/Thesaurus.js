export default class Thesaurus {
  constructor(apiKey, caller) {
    this.apiKey = apiKey;
    this.caller = caller;
  }

  getWordsFromQuery(query) {
    const url = 'http://words.bighugelabs.com/api/2/78f3d8b49dc89abf9207cb09291eea61/';
    const thesaurusUrl = url + query + '/json';

    return fetch(thesaurusUrl);
  }

  render(res) {
    this.caller.related.innerHTML = "";
    const wordArray = [];
    const words = Object.keys(res).map(key => {
      Object.values(res[key]).map(word => {
        wordArray.push(word);
      });
    });

    const mergedArray = [].concat.apply([], wordArray);

    for (let i = 0; i < 6; i++) {
      if (mergedArray[i] === undefined) {
        return;
      }
      const html = `<li>${mergedArray[i]}</li>`;
      this.caller.related.insertAdjacentHTML('beforeend', html);;
    }
  }
}