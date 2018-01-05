module.exports = class Node {
  constructor(value) {
    this.value = value;
    this.fullWord = false;
    this.favored = 0;
    this.children = {};
  }
}