const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addNode(this.tree, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    if (!this.find(data)) {
      return false;
    } else {
      return true;
    }
  }

  find(data) {
    return findNode(this.tree, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data > data) {
        node = findNode(node.left, data);
      } else if (node.data < data) {
        node = findNode(node.right, data);
      } else {
        return node;
      }
      return node;
    }
  }

  remove(data) {
    this.tree = removeNode(this.tree, data);
    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data < data) {
        node.right = removeNode(node.right, data);
      } else if (node.data > data) {
        node.left = removeNode(node.left, data);
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          node = node.right;
        } else if (!node.right) {
          node = node.left;
        } else {
          let rightMin = node.right;
          while (rightMin.left) {
            rightMin = rightMin.left;
          }
          node.data = rightMin.data;
          node.right = removeNode(node.right, rightMin.data);

        }
      }
      return node;
    }
  }

  min() {
    if (!this.tree) {
      return null;
    }
    let node = this.tree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.tree) {
      return null;
    }
    let node = this.tree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}
