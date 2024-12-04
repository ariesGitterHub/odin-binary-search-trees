class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// class Tree {
//   constructor(arr) {
//     this.root = this.buildTree(arr);
//   }

class Tree {
  constructor(arr = []) {
    this.root = arr.length ? this.buildTree(arr) : null;
  }

  // sortArr(arr) {
  //   if (!arr) return;
  //   const cleanArr = [...new Set(arr.sort((a, b) => a - b))];
  //   return cleanArr;
  // }

  sortArr(arr) {
    return [...new Set(arr.sort((a, b) => a - b))];
  }

  buildTreeRecursion(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTreeRecursion(arr, start, mid - 1);
    root.right = this.buildTreeRecursion(arr, mid + 1, end);
    return root;
  }

  buildTree(arr) {
    if (!arr) {
      return;
    } else {
      arr = this.sortArr(arr);
      return this.buildTreeRecursion(arr, 0, arr.length - 1);
    }
  }

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
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // insert(value) {
  //   let newNode = new Node(value);
  //   let current = this.root;
  //   if (!current) {
  //     this.root = newNode;
  //     return;
  //   }

  //   function addNode(node) {
  //     if (value === node.data) {
  //       console.log(`Node value [${value}] already exists in the BST.`);
  //       return null;
  //     }
  //     if (value < node.data) {
  //       if (!node.left) {
  //         node.left = newNode;
  //         return node;
  //       }
  //       return addNode(node.left);
  //     } else if (value > node.data) {
  //       if (!node.right) {
  //         node.right = newNode;
  //         return node;
  //       }
  //       return addNode(node.right);
  //     }
  //   }
  //   addNode(current);
  // }
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    function addNode(node) {
      if (value === node.data) {
        console.log(`Node value [${value}] already exists in the BST.`);
        return null;
      }
      if (value < node.data) {
        return node.left ? addNode(node.left) : (node.left = newNode);
      } else {
        return node.right ? addNode(node.right) : (node.right = newNode);
      }
    }

    addNode(this.root);
  }

  deleteItem(value) {
    let current = this.root;
    if (current === null) {
      console.log(`BST is empty, there is nothing to delete`);
      return this;
    }

    function removeNode(node, value) {
      if (value === node.data) {
        if (node.left === null && node.right === null) {
          console.log(
            `Deleted leaf node with value [${value}] (node had no children)`
          );
          return null;
        }
        if (node.left === null) {
          console.log(
            `Deleted node with value [${value}] (node had no left child)`
          );
          return node.right;
        }
        if (node.right === null) {
          console.log(
            `Deleted node with value [${value}] (node had no right child)`
          );
          return node.left;
        }
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        console.log(
          `Deleted node with value [${value}] (node had two children)`
        );
        return node;
      } else if (value < node.data) {
        node.left = removeNode(node.left, value);
        console.log(
          `Deleted node with value [${value}] (node had two children)`
        );
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    }
    current = removeNode(current, value);
  }

  // Extras I added
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  hasValue(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) {
        return true;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(value) {
    let current = this.root;
    function findNode(node) {
      if (node === null) {
        console.log(`Node with value [${value}] not found`);
        return null;
      }

      if (value === node.data) {
        console.log(`Node with value [${value}] found`);
        return node;
      }

      if (value < node.data) {
        return findNode(node.left);
      } else {
        return findNode(node.right);
      }
    }
    return findNode(current);
  }

  levelOrder(callback) {
    let result = [];
    let q = [];
    let current = this.root;
    if (!callback) {
      throw Error("Callback parameter is required");
    }
    if (current !== null) {
      q.push(current);
      while (q.length > 0) {
        let node = q.shift();
        callback(node);
        result.push(node.data);
        if (node.left !== null) {
          q.push(node.left);
        }
        if (node.right !== null) {
          q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }

  inOrder(callback) {
    let current = this.root;
    if (!callback) {
      throw Error("Callback parameter is required");
    } else {
      let result = new Array();
      function traverseNodes(node) {
        callback(node);
        node.left && traverseNodes(node.left);
        result.push(node.data);
        node.right && traverseNodes(node.right);
      }
      traverseNodes(current);
      return result;
    }
  }

  preOrder(callback) {
    let current = this.root;
    if (!callback) {
      throw Error("Callback parameter is required");
    } else {
      let result = new Array();
      function traverseNodes(node) {
        callback(node);
        result.push(node.data);
        node.left && traverseNodes(node.left);
        node.right && traverseNodes(node.right);
      }
      traverseNodes(current);
      return result;
    }
  }

  postOrder(callback) {
    let current = this.root;
    if (!callback) {
      throw Error("Callback parameter is required");
    } else {
      let result = new Array();
      function traverseNodes(node) {
        callback(node);
        node.left && traverseNodes(node.left);
        node.right && traverseNodes(node.right);
        result.push(node.data);
      }
      traverseNodes(current);
      return result;
    }
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    if (node === this.root) {
      return 0;
    }
    return this.depthRecursive(this.root, node, 0);
  }

  depthRecursive(current, targetNode, currentDepth) {
    if (current === null) {
      return -1;
    }

    if (current === targetNode) {
      return currentDepth;
    }

    if (targetNode.data < current.data) {
      return this.depthRecursive(current.left, targetNode, currentDepth + 1);
    } else {
      return this.depthRecursive(current.right, targetNode, currentDepth + 1);
    }
  }

  isBalanced() {
    function checkHeight(node) {
      if (node === null) {
        return 0;
      }
      let leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;
      let rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      let value = node.data;
      console.log(
        `Node [${value}]: leftHeight = ${leftHeight}, rightHeight: ${rightHeight}.`
      );

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(this.root) !== -1;
  }

  rebalance() {
    if (this.isBalanced()) {
      console.log(`This tree is already balanced`);
      return;
    }
    let inOrderData = [];
    this.inOrder((node) => {
      inOrderData.push(node.data);
    });
    console.log(`[rebalance()] inOrder: ${inOrderData}`);
    console.log(inOrderData);
    let rebalanced = this.buildTree(inOrderData);
    return (this.root = rebalanced);
  }

  // I added this; just a function that checks if the tree is a BST.

  // isBST() {
  //   let inOrderData = testBST.inOrder((node) => {
  //     node.data;
  //   });
  //   console.log(`isBST: ${inOrderData}`);
  //   const isAscending = (array) =>
  //     array.filter((a, i) => a > array[i + 1]).length === 0;

  //   return isAscending(inOrderData);
  // }

  isBST() {
    // Perform in-order traversal and get the node values in an array
    let inOrderData = testBST.inOrder((node) => node.data); // Assuming inOrder() returns an array

    console.log(`inOrderData: ${inOrderData}`);

    // Check if the array is in ascending order
    const isAscending = (array) =>
      array.every((a, i) => i === array.length - 1 || a < array[i + 1]);

    // If array is empty or the values are in ascending order, it is a valid BST
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
