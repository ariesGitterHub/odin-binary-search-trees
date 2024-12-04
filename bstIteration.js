class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr = []) {
    this.root = arr.length ? this.buildTree(arr) : null;
  }

  sortArr(arr) {
    return [...new Set(arr.sort((a, b) => a - b))];
  }

  // Iterative Tree Build, recursion is so much better with this
  buildTree(arr) {
    if (!arr || arr.length === 0) return null;

    arr = this.sortArr(arr);

    let stack = [];
    let root = null;

    // Initially, push the full range of the array to the stack
    stack.push({ start: 0, end: arr.length - 1 });

    while (stack.length > 0) {
      let { start, end } = stack.pop();
      if (start > end) continue;

      let mid = start + Math.floor((end - start) / 2);
      let node = new Node(arr[mid]);

      if (!root) {
        root = node;
      } else {
        this.insertIteratively(root, node);
      }

      // Push left and right subarray ranges onto the stack
      stack.push({ start: start, end: mid - 1 }); // Left subarray
      stack.push({ start: mid + 1, end: end }); // Right subarray
    }

    return root;
  }

  insertIteratively(root, newNode) {
    let current = root;
    while (true) {
      if (newNode.data < current.data) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else if (newNode.data > current.data) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        console.log(`Node with value ${newNode.data} already exists.`);
        break;
      }
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // Iterative Insert
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.data) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        console.log(`Node with value [${value}] already exists in the BST.`);
        return;
      }
    }
  }

  // Iterative Delete
  deleteItem(value) {
    let current = this.root;
    let parent = null;

    while (current && current.data !== value) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (!current) {
      console.log(`Node with value [${value}] not found.`);
      return;
    }

    // Case 1: Node has no children
    if (!current.left && !current.right) {
      if (parent) {
        if (parent.left === current) parent.left = null;
        else parent.right = null;
      } else {
        this.root = null;
      }
    }
    // Case 2: Node has one child
    else if (!current.left || !current.right) {
      let child = current.left ? current.left : current.right;
      if (parent) {
        if (parent.left === current) parent.left = child;
        else parent.right = child;
      } else {
        this.root = child;
      }
    }
    // Case 3: Node has two children
    else {
      let successorParent = current;
      let successor = current.right;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      current.data = successor.data;
      if (successorParent.left === successor)
        successorParent.left = successor.right;
      else successorParent.right = successor.right;
    }
  }

  // Iterative findMin; extra bit I added
  findMin() {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current ? current.data : null;
  }

  // Iterative findMax; extra bit I added
  findMax() {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current ? current.data : null;
  }

  // Iterative hasValue
  hasValue(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) return true;
      current = value < current.data ? current.left : current.right;
    }
    return false;
  }

  // Iterative find
  find(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) return current;
      current = value < current.data ? current.left : current.right;
    }
    console.log(`Node with value [${value}] not found`);
    return null;
  }

  // Iterative levelOrder traversal

  // levelOrder(callback) {
  //   let result = [];
  //   let q = [];
  //   let current = this.root;
  //   if (!callback) {
  //     throw Error("Callback parameter is required");
  //   }
  //   if (current !== null) {
  //     q.push(current);
  //     while (q.length > 0) {
  //       let node = q.shift();
  //       callback(node);
  //       result.push(node.data);
  //       if (node.left !== null) {
  //         q.push(node.left);
  //       }
  //       if (node.right !== null) {
  //         q.push(node.right);
  //       }
  //     }
  //     return result;
  //   } else {
  //     return null;
  //   }
  // }

  // Better version
  levelOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    if (!this.root) return null;

    let result = [];
    let queue = [this.root];

    while (queue.length > 0) {
      let node = queue.shift();
      callback(node);
      result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  // Iterative inOrder traversal
  inOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    let result = [];
    let stack = [];
    let current = this.root;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      callback(current);
      result.push(current.data);

      current = current.right;
    }

    return result;
  }

  // Iterative preOrder traversal
  preOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    let result = [];
    let stack = [this.root];

    while (stack.length > 0) {
      let node = stack.pop();
      callback(node);
      result.push(node.data);

      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return result;
  }

  // Iterative postOrder traversal
  postOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    let result = [];
    let stack = [];
    let lastVisited = null;
    let current = this.root;

    while (stack.length > 0 || current) {
      if (current) {
        stack.push(current);
        current = current.left;
      } else {
        let peekNode = stack[stack.length - 1];
        if (peekNode.right && peekNode.right !== lastVisited) {
          current = peekNode.right;
        } else {
          stack.pop();
          callback(peekNode);
          result.push(peekNode.data);
          lastVisited = peekNode;
        }
      }
    }

    return result;
  }

  // Iterative height calculation
  height(node) {
    if (!node) return -1;

    let queue = [{ node, level: 0 }];
    let maxHeight = 0;

    while (queue.length > 0) {
      let { node, level } = queue.shift();
      maxHeight = Math.max(maxHeight, level);

      if (node.left) queue.push({ node: node.left, level: level + 1 });
      if (node.right) queue.push({ node: node.right, level: level + 1 });
    }

    return maxHeight;
  }

  // Iterative depth calculation
  depth(node) {
    let current = this.root;
    let depth = 0;

    while (current && current !== node) {
      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }

    return current ? depth : -1;
  }

  // Check if tree is balanced using iterative approach
  isBalanced() {
    let queue = [this.root];
    while (queue.length > 0) {
      let node = queue.shift();
      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return true;
  }

  rebalance() {
    if (this.isBalanced()) {
      console.log("The tree is already balanced.");
      return;
    }
    // let inOrderData = [];
    // this.inOrder((node) => {
    //   inOrderData.push(node.data);
    // });
    let inOrderData = this.inOrder((node) => {});
    let rebalancedTree = this.buildTree(inOrderData);
    this.root = rebalancedTree;
  }

  // Check if the tree is a valid BST; extra bit I added
  isBST() {
    let inOrderData = this.inOrder((node) => node.data);
    const isAscending = (array) =>
      array.every((a, i) => i === array.length - 1 || a < array[i + 1]);
    return inOrderData.length === 0 || isAscending(inOrderData);
  }
}

// MY TESTS
// const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let testBST = new Tree(testArr);
// console.log(testBST.sortArr(testArr)); // Sorted, no dupes = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
// testBST.insert(2);
// testBST.deleteItem(2);
// testBST.find(2);
// testBST.find(7);

// let levelOrderData = testBST.levelOrder((node) => {
//   node.data;
// });
// console.log(`levelOrder: ${levelOrderData}`);

// let inOrderData = testBST.inOrder((node) => {
//   node.data;
// });
// console.log(`inOrder: ${inOrderData}`);

// let preOrderData = testBST.preOrder((node) => {
//   node.data;
// });
// console.log(`preOrder: ${preOrderData}`);

// let postOrderData = testBST.postOrder((node) => {
//   node.data;
// });
// console.log(`postOrder: ${postOrderData}`);

// let testHeightNode0 = testBST.find(8); // 3 height
// let testHeightNode1 = testBST.find(4); // 2 height
// let testHeightNode2 = testBST.find(7); // 0 height

// console.log(testBST.height(testHeightNode0));
// console.log(testBST.height(testHeightNode1));
// console.log(testBST.height(testHeightNode2));

// let testDepthNode0 = testBST.find(8); // 0 depth
// let testDepthNode1 = testBST.find(4); // 1 depth
// let testDepthNode2 = testBST.find(7); // 3 depth

// console.log(testBST.depth(testDepthNode0));
// console.log(testBST.depth(testDepthNode1));
// console.log(testBST.depth(testDepthNode2));

// testBST.insert(5000);
// console.log(`Rebalance Test 1: ${testBST.isBalanced()}`);

// testBST.rebalance();
// console.log(`Rebalance Test 2: ${testBST.isBalanced()}`);

// console.log(testBST.isBST());
// testBST.prettyPrint(testBST.root);

console.log("T.O.P. TESTS HERE");

// Tie it all together
// Write a driver script that does the following:

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.

function randomNumbers(count = 8) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}

console.log(randomNumbers());

let BST = new Tree(randomNumbers());
BST.prettyPrint(BST.root);

// 2. Confirm that the tree is balanced by calling isBalanced.
console.log(BST.isBalanced());

// 3. Print out all elements in level, pre, post, and in order.
let levelOrderData = BST.levelOrder((node) => {
  node.data;
});
console.log(`levelOrder: ${levelOrderData}`);

let inOrderData = BST.inOrder((node) => {
  node.data;
});
console.log(`inOrder: ${inOrderData}`);

let preOrderData = BST.preOrder((node) => {
  node.data;
});
console.log(`preOrder: ${preOrderData}`);

let postOrderData = BST.postOrder((node) => {
  node.data;
});
console.log(`postOrder: ${postOrderData}`);

// 4. Unbalance the tree by adding several numbers > 100.
function generateRandomArray(size, min, max) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    // Generate a random number between min and max (inclusive)
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    arr.push(randomNum);
  }
  return arr;
}

// Example usage
let randomArrayOver100 = generateRandomArray(4, 101, 1000); // Generates an array of 10 random numbers between 101 and 1000
console.log(randomArrayOver100);

// BST.insert(randomArrayOver100[0]);
// BST.insert(randomArrayOver100[1]);
// BST.insert(randomArrayOver100[2]);
// BST.insert(randomArrayOver100[3]);

randomArrayOver100.forEach((n) => {
  BST.insert(n);
});

BST.prettyPrint(BST.root);

// 5. Confirm that the tree is unbalanced by calling isBalanced.
console.log(BST.isBalanced());

// 6. Balance the tree by calling rebalance.
BST.rebalance();
BST.prettyPrint(BST.root);

// 7. Confirm that the tree is balanced by calling isBalanced.
console.log(BST.isBalanced());

// 8. Print out all elements in level, pre, post, and in order.
levelOrderData = BST.levelOrder((node) => {
  node.data;
});
console.log(`levelOrder: ${levelOrderData}`);

inOrderData = BST.inOrder((node) => {
  node.data;
});
console.log(`inOrder: ${inOrderData}`);

preOrderData = BST.preOrder((node) => {
  node.data;
});
console.log(`preOrder: ${preOrderData}`);

postOrderData = BST.postOrder((node) => {
  node.data;
});
console.log(`postOrder: ${postOrderData}`);
