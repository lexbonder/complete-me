import { expect } from 'chai';
import Trie from '../lib/Trie';
import fs from 'fs';

describe('Trie', () => {
  let completion;
  let text;
  let dictionary;

  beforeEach(function() {
    completion = new Trie();
    text = "/usr/share/dict/words";
    dictionary = fs.readFileSync(text).toString().trim().split('\n');
  })

  describe('Insert', () => {

    it('Should make an object', function () {
      expect(completion).to.be.an('object');
    })

    it('Should be able to count of how many words are inside it', function() {
      completion.insert('pizza');
      completion.insert('apple')

      expect(completion.count()).to.equal(2);
    })

    it('Should insert a word and bulid a tree', function() {
      completion.insert('pizza');

      expect(completion.root.children.p.value).to.equal('p');
    })

    it('Should create a new chain of children if the letter doesn\'t exist', function() {
      completion.insert('pizza');
      completion.insert('apple');

      expect(completion.root.children.p.value).to.equal('p');
      expect(completion.root.children.a.value).to.equal('a');
    })

    it('Should create a new chain of children if the letter does exist', function() {
      completion.insert('pizza');
      completion.insert('potato');

      expect(
        completion.root.children
        .p.children
        .i.value).to.equal('i');
      
      expect(
        completion.root.children
        .p.children
        .o.value).to.equal('o');
    })

    it('Should have the last letter of a word return true', function() {
      completion.insert('pie');
      completion.insert('piechart')

      expect(completion.root.children
        .p.fullWord).to.equal(false);
      
      expect(completion.root.children
        .p.children
        .i.fullWord).to.equal(false);
      
      expect(completion.root.children
        .p.children
        .i.children
        .e.fullWord).to.equal(true);
      
      expect(completion.root.children
        .p.children
        .i.children
        .e.children
        .c.fullWord).to.equal(false);
      
      expect(completion.root.children
        .p.children
        .i.children
        .e.children
        .c.children
        .h.children
        .a.children
        .r.children
        .t.fullWord).to.equal(true);
    })

    it('Should be able to take a dictionary-load of words', function() {
      completion.populate(dictionary);

      expect(completion.count()).to.equal(235886);
    })
  })

  describe('Suggest', () => {

    it('Should return an array', function() {
      expect(completion.suggest()).to.deep.equal([])
    })

    it('Should return an array with a completed word', function() {
      completion.insert('pizza');

      expect(completion.suggest('pizza')).to.deep.equal(['pizza']);
    })

    it('Should return an array with all completed words with same root', function() {
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('pizzaria');
      completion.insert('pizzaparlor');

      expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzas', 'pizzaria', 'pizzaparlor']);
    })

    it('Should return an array of words from the dictionary', function() {
      completion.populate(dictionary);

      expect(completion.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
    })

    it('Should increase its favor rating if it is selected', function() {
      completion.populate(dictionary);

      completion.suggest("piz")

      expect(completion.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

      completion.select("pizzeria")

      completion.suggest("piz")
   
      expect(completion.suggest('piz')).to.deep.equal(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
    })

    it('Should list words from most to least favored', function() {
      completion.populate(dictionary);

      completion.suggest("piz")

      expect(completion.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

      completion.select("pizzeria")
      completion.select("pizza")
      completion.select("pizza")
      completion.select("pizzle")
      completion.select("pizzle")
      completion.select("pizzle")

      completion.suggest("piz")
   
      expect(completion.suggest('piz')).to.deep.equal(["pizzle", "pizza", "pizzeria", "pize", "pizzicato"]);
    })
  })

  describe('Delete', function() {

    it('Should be able to delete a single word', function() {
      completion.insert('car');

      expect(
        completion.root.children
        .c.children
        .a.children
        .r.value).to.equal('r');
      
      completion.delete('car');
      
      expect(completion.root.children.c).to.equal(undefined);
    })

    it('Should be able to delete a word from suggestions', function() {
      completion.populate(dictionary);

      expect(completion.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);

      completion.delete("pizzle");

      expect(completion.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato"]);
    })

    it('Should delete unneccesary letters', function() {
      completion.insert('cats');
      completion.insert('catscan');

      expect(completion.suggest('cats')).to.deep.equal(['cats', 'catscan']);
          
      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.fullWord).to.equal(true);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.children
        .c.children
        .a.children
        .n.fullWord).to.equal(true);

      completion.delete('catscan');

      expect(completion.suggest('cats')).to.deep.equal(['cats']);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.fullWord).to.equal(true);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.children
        .c).to.equal(undefined);
    })

    it('Should be able to remove a word from suggestions without deleting necessary letters', function() {
      completion.insert('cats');
      completion.insert('catscan');

      expect(completion.suggest('cats')).to.deep.equal(['cats', 'catscan']);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.fullWord).to.equal(true);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.children
        .c.children
        .a.children
        .n.fullWord).to.equal(true);

      completion.delete('cats');

      expect(completion.suggest('cats')).to.deep.equal(['catscan']);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.fullWord).to.equal(false);

      expect(
        completion.root.children
        .c.children
        .a.children
        .t.children
        .s.children
        .c.children
        .a.children
        .n.fullWord).to.equal(true);
    })
  })
})


// phase 6
// 

// console.log( JSON.stringify(completion, null, 4) );