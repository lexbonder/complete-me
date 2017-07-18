import { expect } from 'chai';
import BinaryTree from '../scripts/BinaryTree';
import Node from '../scripts/Node';

describe('BinaryTree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinaryTree();
  });

  it.skip('should have a root node defaulted to null', () => {
    expect(tree.root).to.equal(null);
  });

  describe('PUSH', () => {
    it.skip('should be able to add a node to the Tree', () => {
      tree.insert(new Node(20));

      expect(tree.root.data).to.equal(20);
    });

    it.skip('should move smaller data to the left', () => {
      tree.insert(new Node(20));
      tree.insert(new Node(5));

      expect(tree.root.left.data).to.equal(5);
    });

    it.skip('should move larger data to the right', () => {
      tree.insert(new Node(20));
      tree.insert(new Node(30));

      expect(tree.root.right.data).to.equal(30);
    });

    it.skip('should add data equal to the rootNode to the left', () => {
      tree.insert(new Node(20));
      tree.insert(new Node(20));

      expect(tree.root.left.data).to.equal(20);
    });

    it.skip('should continue adding smaller data to the left down the tree', () => {
      tree.insert(new Node(20));
      tree.insert(new Node(10));
      tree.insert(new Node(5));

      expect(tree.root.left.left.data).to.equal(5);
    });

    it.skip('should continue adding larger data to the right down the tree', () => {
      tree.insert(new Node(20));
      tree.insert(new Node(30));
      tree.insert(new Node(35));
      tree.insert(new Node(32));
      tree.insert(new Node(25));

      expect(tree.root.right.right.data).to.equal(35);
      expect(tree.root.right.right.left.data).to.equal(32);
      expect(tree.root.right.left.data).to.equal(25);
    });

  });

  describe('FIND', () => {

    beforeEach(() => {
      tree.insert(new Node(4));
      tree.insert(new Node(6));
      tree.insert(new Node(7));
      tree.insert(new Node(2));
      tree.insert(new Node(3));
      tree.insert(new Node(5));
      tree.insert(new Node(1));
    });


    it.skip('should find a match if node exists', () => {

    });

    it.skip('should return null if no match is found', () => {

    });

    it.skip('should be able to find the root', () => {
      let node = tree.find(4);

      expect(node).to.equal(tree.root);
    });

    it.skip('should be able to find results to the immediate left (2)', () => {
      let node = tree.find(2);

      expect(node).to.equal(tree.root.left);
    });

    it.skip('should be able to find results to the far left (1)', () => {
      let node = tree.find(1);

      expect(node).to.equal(tree.root.left.left);
    });

    it.skip('should be able to find results to the immediate right (6)', () => {
      let node = tree.find(6);

      expect(node).to.equal(tree.root.right);
    });

    it.skip('should be able to find nested results (5 and 3)', () =>  {
      let node = tree.find(5);

      expect(node).to.equal(tree.root.right.left)
    });

  });

  describe('toArray', () => {
    it.skip('should return an empty array if no nodes exist', () => {

    });

    it.skip('should return data from the tree into an array, starting with the root, then all left values, then all right', () => {
      tree.insert(5);
      tree.insert(4);
      tree.insert(6);
      tree.insert(7);
      tree.insert(3);

      expect(tree.toArray()).to.deep.equal([3, 4, 5, 6, 7]);
    });
  });

  describe('SORT', () => {
    it.skip('should return an empty array if no nodes exist', () => {

    });

    it.skip('should return a sorted array of tree elements, small to large', () => {
      tree.insert(5)
      tree.insert(4)
      tree.insert(6)
      tree.insert(7)
      tree.insert(3)
      tree.insert(2)
      tree.insert(2102)
    });
  });

  describe('MIN and MAX', () => {

    it.skip('min should return null if no nodes exist', () => {

    });

    it.skip('max should return null if no nodes exist', () => {

    });

    beforeEach(() => {
      tree.insert(4);
      tree.insert(6);
      tree.insert(7);
      tree.insert(2);
      tree.insert(3);
      tree.insert(5);
      tree.insert(1);
    });

    it.skip('should find the min value', () => {

    });

    it.skip('should find the max value', () => {

    });
  });

  describe('DELETE', () => {
    beforeEach(() => {
       /*
        *        4
        *      /   \
        *     2    6
        *    / \  / \
        *   1  3 5  7
        */
      tree.insert(new Node(4));
      tree.insert(new Node(6));
      tree.insert(new Node(7));
      tree.insert(new Node(2));
      tree.insert(new Node(3));
      tree.insert(new Node(5));
      tree.insert(new Node(1));
    });

    it('should delete node with no children', () => {
      let node = tree.find(1);

      expect(tree.root.left.left).to.equal(node);

      expect(tree.delete(1)).to.equal(node);

      expect(tree.root.left.left).to.equal(null);
    })

    it('should delete node with one child', () => {
      let node = tree.find(1);

      expect(tree.root.left.left).to.equal(node);

      expect(tree.delete(1)).to.equal(node);

      expect(tree.root.left.left).to.equal(null);

      tree.insert(new Node(8));

      expect(tree.root.right.right.right.data).to.equal(8)
      expect(tree.root.right.right.data).to.equal(7)
      tree.delete(7)
      expect(tree.root.right.right.data).to.equal(8)
      expect(tree.root.right.right.right).to.equal(null)
    })

    it('should delete node with two children', () => {
      let node = tree.find(7);

      expect(tree.root.right.right).to.equal(node);

      tree.delete(6);
      console.log(JSON.stringify(tree, null, 4));
      node = tree.find(7);
      expect(tree.root.right).to.equal(node);

      // expect(tree.root.right.right).to.equal(null);
      // expect(tree.root.right.left.data).to.equal(5);
    })
  })

  describe('getCount', () => {});

  describe('getSum', () => {});

  describe('getLevelofNode', () => {
    //returns how may levels down from root node the searched value is
  });

  describe('getLevelofNode', () => {
    //returns how may levels down from root node the searched value is
  });
});