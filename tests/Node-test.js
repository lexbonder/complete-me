import { expect } from 'chai';
import Node from '../lib/Node'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })

  it('should default endWord to false', () => {
    expect(node.fullWord).to.equal(false);
  })

  it('should take data and assign it to data prop', () => {
    expect(node.value).to.equal('pizza')
  })

  it('should have a default favored of 0', () => {
    expect(node.favored).to.equal(0);
  })

})
