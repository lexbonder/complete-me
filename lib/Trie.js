import Node from './Node.js';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node(null);
  }

  insert(string) {
    let currentNode = this.root;
    let wordArray = [...string];

    wordArray.forEach(letter => {
      if (!currentNode.children[letter]) {
        let newNode = new Node(letter);

        currentNode.children[letter] = newNode;
      }
      currentNode = currentNode.children[letter];
    });
    currentNode.fullWord = true;
    this.wordCount++;
  }

  count() {
    return this.wordCount;
  }

  suggest(string) {
    const foundWords = [];

    if (!string) {
      return foundWords;
    }
    let currentNode = this.traverse(string);

    return this.suggestHelper(string, currentNode, foundWords);
  }

  suggestHelper(string, currentNode, foundWords) {
    if (currentNode.fullWord) {
      foundWords.push({word: string, favor: currentNode.favored});
    }
    if (currentNode.children) {
      let allChildren = Object.keys(currentNode.children);

      allChildren.forEach( child => {
        let newNode = currentNode.children[child];
        let newWord = string + newNode.value;

        this.suggestHelper(newWord, newNode, foundWords);
      });
    }
    return this.sortWords(foundWords);
  }

  sortWords(foundWords) {
    foundWords.sort((a, b) => b.favor - a.favor);
    return foundWords.map(object => object.word);
  }

  populate(parameter) {
    parameter.forEach(word => {
      this.insert(word);
    });
  }

  select(string) {
    let currentNode = this.traverse(string);

    currentNode.favored++;
  }

  delete(string) {
    let currentNode = this.traverse(string);

    currentNode.fullWord = false;
    this.deleteHelper(string);
  }

  deleteHelper(string) {
    while (string.length) {
      let lastLetter = string.slice(-1);

      string = string.slice(0, -1);
      
      let currentNode = this.traverse(string);

      if (!Object.keys(currentNode.children[lastLetter].children).length &&
        !currentNode.children[lastLetter].fullWord) {
        delete (currentNode.children[lastLetter]);
      }
    }
  }

  traverse(string) {
    let currentNode = this.root;
    let wordArray = [...string];

    wordArray.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    return currentNode;
  }
}