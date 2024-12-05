// I was curious about red-black trees and the following is just an attempt to get a better understanding of RBTs. 
// NOTE: this code has bugs, insert(value) works but the RBT does not self balance via the fix helper like it should.
// deletedItem is also not added yet, will need to 1) transplant-or help move the subtrees within the tree, 2) delete the node, 3) delete-fix-up to fix any red-black rule violations. This is allegedly very complicated to implement ;-)

class Node {
  constructor(data, color = "RED") {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = color; // "RED" or "BLACK"
  }
}

class RedBlackTree {
  constructor(arr = []) {
    this.root = null;
    if (arr.length) {
      this.buildTree(arr);
    }
  }

  // Create a Red-Black Tree from a sorted array
  buildTree(arr) {
    this.root = this.buildTreeRecursion(arr, 0, arr.length - 1);
    this.root.color = "BLACK"; // Root is always black
  }

  buildTreeRecursion(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTreeRecursion(arr, start, mid - 1);
    if (node.left) node.left.parent = node;
    node.right = this.buildTreeRecursion(arr, mid + 1, end);
    if (node.right) node.right.parent = node;
    return node;
  }

  // Pretty print the tree structure
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(
      `${prefix}${isLeft ? "└── " : "┌── "}${node.data}(${node.color})`
    );
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // Insert value into the tree and balance the tree
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      this.root.color = "BLACK"; // Root is black by definition
      return;
    }

    let parent = null;
    let current = this.root;
    while (current !== null) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else {
        console.log(`Value ${value} already exists in the Red-Black Tree.`);
        return; // No duplicates
      }
    }

    newNode.parent = parent;
    if (value < parent.data) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    // Fix Red-Black Tree violations
    this.fixInsert(newNode);
  }

  // Fix violations after insertion
  fixInsert(node) {
    while (node !== this.root && node.parent.color === "RED") {
      if (node.parent === node.parent.parent.left) {
        let uncle = node.parent.parent.right;
        if (uncle && uncle.color === "RED") {
          // Case 1: Uncle is red
          node.parent.color = "BLACK";
          uncle.color = "BLACK";
          node.parent.parent.color = "RED";
          node = node.parent.parent; // Move to grandparent
        } else {
          if (node === node.parent.right) {
            // Case 2: Node is the right child, perform left rotation
            node = node.parent;
            this.leftRotate(node);
          }
          // Case 3: Node is the left child, perform right rotation
          node.parent.color = "BLACK";
          node.parent.parent.color = "RED";
          this.rightRotate(node.parent.parent);
        }
      } else {
        let uncle = node.parent.parent.left;
        if (uncle && uncle.color === "RED") {
          // Case 1: Uncle is red
          node.parent.color = "BLACK";
          uncle.color = "BLACK";
          node.parent.parent.color = "RED";
          node = node.parent.parent; // Move to grandparent
        } else {
          if (node === node.parent.left) {
            // Case 2: Node is the left child, perform right rotation
            node = node.parent;
            this.rightRotate(node);
          }
          // Case 3: Node is the right child, perform left rotation
          node.parent.color = "BLACK";
          node.parent.parent.color = "RED";
          this.leftRotate(node.parent.parent);
        }
      }
    }

    // Ensure the root is black
    this.root.color = "BLACK";
  }

  // Left rotation
  leftRotate(x) {
    let y = x.right;
    x.right = y.left;
    if (y.left !== null) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  // Right rotation
  rightRotate(y) {
    let x = y.left;
    y.left = x.right;
    if (x.right !== null) x.right.parent = y;
    x.parent = y.parent;
    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }
    x.right = y;
    y.parent = x;
  }

  deleteItem(value) {}

  // Check if the tree is balanced (Red-Black properties are satisfied)
  isBalanced() {
    return this.checkBlackHeight(this.root) !== -1;
  }

  // Check if the black height of each path is consistent
  checkBlackHeight(node) {
    if (node === null) return 1;

    let leftHeight = this.checkBlackHeight(node.left);
    if (leftHeight === -1) return -1;

    let rightHeight = this.checkBlackHeight(node.right);
    if (rightHeight === -1 || leftHeight !== rightHeight) return -1;

    return node.color === "BLACK" ? leftHeight + 1 : leftHeight;
  }

  // Check if it's a valid RBT (in-order traversal)
  isBST() {
    let inOrderData = [];
    this.inOrder((node) => inOrderData.push(node.data));
    return inOrderData.every((val, i) => i === 0 || val > inOrderData[i - 1]);
  }
  
  // Print the tree in order
  inOrder(callback) {
    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        callback(node);
        traverse(node.right);
      }
    }
    traverse(this.root);
  }

  // Pre-order traversal
  preOrder(callback) {
    function traverse(node) {
      if (node !== null) {
        callback(node);
        traverse(node.left);
        traverse(node.right);
      }
    }
    traverse(this.root);
  }

  // Post-order traversal
  postOrder(callback) {
    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        callback(node);
      }
    }
    traverse(this.root);
  }
}

let rbTree = new RedBlackTree([20, 15, 25, 10, 5, 1, 30]);
// rbTree.insert(1000);
// rbTree.insert(2000);
// rbTree.insert(3000);
// rbTree.insert(5000);
rbTree.prettyPrint(rbTree.root); // pretty print the tree structure
console.log("Is the tree balanced?", rbTree.isBalanced());
