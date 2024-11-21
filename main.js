// 1. Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    // this.value = data
  }
}

// 2. Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

// 3. Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

// const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testArr = [50, 30, 70, 80, 40, 32, 34, 60]

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr); // Root node is set by buildTree
  }

  // Sort and remove duplicates

  // Old version of code
  // sortArr(arr) {
  //     const sorter = arr.sort((a,b) => {
  //     if (a > b) {
  //       return 1;
  //     } else {
  //       return -1;
  //     }
  //   })
  //   const sortedSet = new Set(sorter);
  //   const cleanArr = [...sortedSet]

  //   return cleanArr;
  // }

  // Better version
  sortArr(arr) {
    // Sort the array and remove duplicates using a Set
    const cleanArr = [...new Set(arr.sort((a, b) => a - b))];
    return cleanArr;
  }

  buildTreeRecursion(arr, start, end) {
    if (start > end) return null;

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = new Node(arr[mid]);

    // Create left subtree
    root.left = this.buildTreeRecursion(arr, start, mid - 1);

    // Create right subtree
    root.right = this.buildTreeRecursion(arr, mid + 1, end);

    return root;
  }

  buildTree(arr) {
    arr = this.sortArr(arr);
    return this.buildTreeRecursion(arr, 0, arr.length - 1);
  }

  // Pretty print function to display the tree structure

  // Tip: If you would like to visualize your binary search tree, here is a prettyPrint() function that will console.log your tree in a structured format. This function will expect to receive the root of your tree as the value for the node parameter.
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

  // 4. Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.

  // NOTE -> You may be tempted to implement these methods using the original input array used to build the tree, but it’s important for the efficiency of these operations that you don’t do this. If we refer back to the Big O Cheatsheet, we’ll see that binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations. To get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

  // ITERATION OPTION
  // insert(value) {
  //   // If the tree is empty, the new node becomes the root
  //   if (!this.root) {
  //     this.root = new Node(value);
  //     return;
  //   }

  //   let current = this.root;

  //   // Iterate through the tree to find the correct insertion point
  //   while (current) {
  //     // If the value already exists in the tree, do nothing
  //     if (value === current.data) {
  //       console.log(`This value already exists in the BST.`);
  //       return;
  //     }

  //     // If value is less than current node's data, go left
  //     if (value < current.data) {
  //       if (!current.left) {
  //         current.left = new Node(value); // Insert the new node
  //         return;
  //       }
  //       current = current.left; // Move left to continue searching
  //     }
  //     // If value is greater than current node's data, go right
  //     else {
  //       if (!current.right) {
  //         current.right = new Node(value); // Insert the new node
  //         return;
  //       }
  //       current = current.right; // Move right to continue searching
  //     }
  //   }
  // }

  // ALTERNATE RECURSION CODE:
  // insert(value) {
  //   // Helper function to handle the recursion for insertion
  //   const addNode = (node, value) => {
  //     // If we find a null node, this is where the new node should be inserted
  //     if (node === null) {
  //       return new Node(value);
  //     }

  //     // If the value is equal to the current node's data, do nothing (handle duplicates)
  //     if (value === node.data) {
  //       console.log(`This value already exists in the BST.`);
  //       return node; // Return the current node, meaning no changes
  //     }

  //     // If value is less than current node's data, go left
  //     if (value < node.data) {
  //       node.left = addNode(node.left, value);
  //     }
  //     // If value is greater than current node's data, go right
  //     else {
  //       node.right = addNode(node.right, value);
  //     }

  //     // Return the node after the recursive insert (this ensures the parent node is updated)
  //     return node;
  //   };

  //   // Start the recursion from the root
  //   if (!this.root) {
  //     this.root = new Node(value); // If the tree is empty, create the root
  //   } else {
  //     this.root = addNode(this.root, value); // Recursively insert value into the tree
  //   }
  // }

  // MY OLD VERSION:

  //    insert(value) {
  //     //console.log(this.root);
  //     //console.log(value);

  //     let newNode = new Node(value);
  //     let current = this.root;
  //     if (!current) {
  //       return newNode;
  //     }

  //     function addNode() {
  //       // Duplicates not allowed
  //       if (value === current.data) {
  //         console.log(This value already exists in the BST.);
  //         // return undefined; // Shouldn't this just return???
  //         return current;
  //       }
  //       if (value < current.data) {
  //         if (!current.left) {
  //           current.left = newNode;
  //           return current;
  //         }
  //         current = current.left;
  //         addNode();
  //       } else if (value > current.data) {
  //         if (!current.right) {
  //           current.right = newNode;
  //           return current;
  //         }
  //         current = current.right;
  //         addNode();
  //       }
  //     }
  //     addNode();
  //   }
  // }

  insert(value) {
    let newNode = new Node(value);
    let current = this.root;

    // If the tree is empty, set the root node to the new node
    if (!current) {
      this.root = newNode;
      return;
    }

    // Recursive helper function to insert the node
    function addNode(node) {
      // Duplicates not allowed
      if (value === node.data) {
        console.log(`Node value [${value}] already exists in the BST.`);
        return null; // Do not insert duplicates
      }

      // If value is less than the node's data, move to the left
      if (value < node.data) {
        if (!node.left) {
          node.left = newNode; // Insert the node here
          return node;
        }
        // Recur on the left child
        return addNode(node.left);
      }

      // If value is greater than the node's data, move to the right
      else if (value > node.data) {
        if (!node.right) {
          node.right = newNode; // Insert the node here
          return node;
        }
        // Recur on the right child
        return addNode(node.right);
      }
    }

    // Start recursion from the root node
    addNode(current);
  }

  deleteItem(value) {}

  // 5. Write a find(value) function that returns the node with the given value.

  // ITERATIVE FIND()
  // find(value) {
  //   let current = this.root;

  //   if (!current) {
  //     return false;
  //   }

  //   while (current) {
  //     if (value < current.data) {
  //       current = current.left;
  //     } else if (value > current.data) {
  //       current = current.right;
  //     } else if (value === current.data) {
  //       console.log(`BST contains node with value [${value}]`);
  //       return current.data;
  //     }
  //   }
  //   return false;
  // }

  // RECURSIVE FIND()
  find(value) {
    let current = this.root;
    // Inner recursive function
    function findNode(node) {
      if (node === null) {
        console.log(`Node with value [${value}] not found`);
        return null; // Node is not found if it's null
      }

      if (value === node.data) {
        console.log(`Node with value [${value}] found`);
        return node; // Node found
      }

      if (value < node.data) {
        return findNode(node.left); // Search in the left subtree
      } else {
        return findNode(node.right); // Search in the right subtree
      }
    }

    // Start the recursive search with the root node
    return findNode(current);
  }

  // 6. Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (video on level order traversal).

  levelOrder(callback) {}

  // 7. Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder.

  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}

  // 8. Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.

  height(node) {}

  // 9. Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.

  depth(node) {}

  // 10. Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

  isBalanced() {}

  // 11. Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

  rebalance() {}
}

// const newArr = sortArr(testArr)

let testBST = new Tree(testArr);
console.log(testBST.sortArr(testArr)); // Sorted, no dupes = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

testBST.insert(20);
testBST.insert(20); // Dupe
testBST.insert(36);
testBST.insert(65);
testBST.insert(75);
testBST.insert(85);

console.log(testBST.find(20));
console.log(testBST.find(50));
console.log(testBST.find(0));
console.log(testBST.find(100));

console.log(testBST);

testBST.prettyPrint(testBST.root);

// Tie it all together
// Write a driver script that does the following:

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
// 2. Confirm that the tree is balanced by calling isBalanced.
// 3. Print out all elements in level, pre, post, and in order.
// 4. Unbalance the tree by adding several numbers > 100.
// 5. Confirm that the tree is unbalanced by calling isBalanced.
// 6. Balance the tree by calling rebalance.
// 7. Confirm that the tree is balanced by calling isBalanced.
// 8. Print out all elements in level, pre, post, and in order.
