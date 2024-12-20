// 1. Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// 2. Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

// 3. Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324
  // , 2, 24, 325, 20000
];
// const testArr = [50, 30, 70, 80, 40, 32, 34, 60];
// const testArr = [10, 20, 30, 50, 80, 130, 210, 340, 550, 890]
// const testArr = [10, 10, 20, 30, 50, 80];

// class Tree {
  // constructor(arr) {
  //   this.root = this.buildTree(arr); // Root node is set by buildTree
  // }

  class Tree {
    // Better version
    constructor(arr = []) {
      this.root = arr.length ? this.buildTree(arr) : null; // Because of this line.
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
    // sortArr(arr) {
    //   if (!arr) {
    //     return;
    //   } else {
    //     // Sort the array and remove duplicates using a Set
    //     const cleanArr = [...new Set(arr.sort((a, b) => a - b))];
    //     return cleanArr;
    //   }
    // }

    // More improved
    sortArr(arr) {
      return [...new Set(arr.sort((a, b) => a - b))];
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
      if (!arr) {
        return;
      } else {
        arr = this.sortArr(arr);
        return this.buildTreeRecursion(arr, 0, arr.length - 1);
      }
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
        this.prettyPrint(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    }

    // 4. Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.

    // NOTE -> You may be tempted to implement these methods using the original input array used to build the tree, but it’s important for the efficiency of these operations that you don’t do this. If we refer back to the Big O Cheatsheet, we’ll see that binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations. To get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

    // ITERATION OPTION
    // insert(value) {
    //   // If the tree is empty, the new node becomes the root
    //   let current = this.root;

    //   if (!current) {
    //     this.root = new Node(value);
    //     return;
    //   }

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

    // DELETION is more complicated
    // Key Ideas:
    // Find target node.
    // Case 1: Deleting a leaf node (no children) <---Base Case
    // Case 2. Delete a Node with Single Child in BST
    // Case 3. Delete a Node with Both Children in BST - HARDEST

    // Iterative solution is long, come back to, maybe...
    deleteItem(value) {
      let current = this.root;
      if (current === null) {
        console.log(`BST is empty, there is nothing to delete`);
        return this; // Return the tree itself to indicate no changes
      }

      // Recursive helper function to remove the node
      function removeNode(node, value) {
        if (value === node.data) {
          // has no children
          if (node.left === null && node.right === null) {
            console.log(
              `Deleted leaf node with value [${value}] (node had no children)`
            );
            return null; // REMINDER: returning null removes the node from the tree.
          }
          // has no left child
          if (node.left === null) {
            console.log(
              `Deleted node with value [${value}] (node had no left child)`
            );
            return node.right; // returning the right child effectively removes the node and "bypasses" it, making the right child the new child of the parent node.
          }
          // has no right child
          if (node.right === null) {
            console.log(
              `Deleted node with value [${value}] (node had no right child)`
            );
            return node.left; // returning the left child effectively removes the node and "bypasses" it, making the left child the new child of the parent node.
          }
          // has two children, hardest case...
          // To remove a node with two children, you typically:
          // Find the smallest value in the right subtree (this ensures that the tree stays ordered).
          // Replace the node’s value with the smallest value from the right subtree.
          // Delete the node that contained the smallest value (which will have at most one child, simplifying its deletion).
          let tempNode = node.right; // initialize tempNode to the right child of the current node.
          while (tempNode.left !== null) {
            // traverse leftward down the right subtree to find the leftmost node (which holds the smallest value in the right subtree).
            tempNode = tempNode.left;
          }
          node.data = tempNode.data; // replace the data of the current node with the data from this smallest node (tempNode.data).
          node.right = removeNode(node.right, tempNode.data); // recursively call removeNode to delete the smallest node we just copied into the current node. This is done on the right subtree of the current node (node.right).
          console.log(
            `Deleted node with value [${value}] (node had two children)`
          );
          return node;
        }
        // If the value to be deleted is less than the data of the current node, it means the target node must be in the left subtree. The function recursively calls removeNode on the left child (node.left).
        else if (value < node.data) {
          node.left = removeNode(node.left, value);
          console.log(
            `Deleted node with value [${value}] (node had two children)`
          );
          return node;
        }
        // If the value is greater than the data of the current node, it means the target node must be in the right subtree. The function recursively calls removeNode on the right child (node.right).
        else {
          node.right = removeNode(node.right, value);
          // console.log(`Deleted node with value [${value}]`);

          //console.log(`Deleted node with value [${value}] (node had two children)`);
          return node;
        }
      }
      current = removeNode(current, value);
      // call the removeNode function starting at the root (current) and passing the target value.
      // The result of this function call is assigned back to current, ensuring that the tree structure is updated with the deletion.
    }

    // 5. Write a find(value) function that returns the node with the given value.

    // ITERATIVE FIND()
    find(value) {
      let current = this.root;
      if (!current) {
        return false;
      }
      while (current) {
        if (value < current.data) {
          current = current.left;
        } else if (value > current.data) {
          current = current.right;
        } else if (value === current.data) {
          console.log(`BST contains node with value [${value}]`);
          return current;
        }
      }
      console.log(`BST does not contain node with value [${value}]`);
      return false;
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

    // RECURSIVE FIND()
    // find(value) {
    //   let current = this.root;
    //   // Inner recursive function
    //   function findNode(node) {
    //     if (node === null) {
    //       console.log(`Node with value [${value}] not found`);
    //       return null; // Node is not found if it's null
    //     }

    //     if (value === node.data) {
    //       console.log(`Node with value [${value}] found`);
    //       return node; // Node found
    //     }

    //     if (value < node.data) {
    //       return findNode(node.left); // Search in the left subtree
    //     } else {
    //       return findNode(node.right); // Search in the right subtree
    //     }
    //   }

    //   // Start the recursive search with the root node
    //   return findNode(current);
    // }

    // 6. Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (video on level order traversal).

    levelOrder(callback) {
      // Reminder: breadth-first level order
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

    // levelOrder(callback) {
    //   if (typeof callback !== "function") {
    //     throw new Error("Callback function is required");
    //   }

    //   let q = [];
    //   let current = this.root;

    //   if (current !== null) {
    //     q.push(current);
    //     while (q.length > 0) {
    //       let node = q.shift(); // Dequeue node from the front of the queue

    //       // Call the callback with the whole node
    //       callback(node);

    //       // Enqueue left and right children if they exist
    //       if (node.left !== null) {
    //         q.push(node.left);
    //       }
    //       if (node.right !== null) {
    //         q.push(node.right);
    //       }
    //     }
    //   }
    // }

    // Recursion version...REVIEW:
    // levelOrder(callback) {
    //   if (typeof callback !== "function") {
    //     throw new Error("Callback function is required");
    //   }

    //   // Helper function to handle each level of the tree
    //   const traverseLevel = (queue) => {
    //     if (queue.length === 0) return; // Base case: nothing to process

    //     let node = queue.shift(); // Dequeue node from the front of the queue

    //     // Call the callback with the whole node
    //     callback(node);

    //     // Enqueue left and right children if they exist
    //     if (node.left !== null) {
    //       queue.push(node.left);
    //     }
    //     if (node.right !== null) {
    //       queue.push(node.right);
    //     }

    //     // Recursively call traverseLevel to process the next level
    //     traverseLevel(queue);
    //   };

    //   // Start the recursion with the root node in the queue
    //   if (this.root !== null) {
    //     traverseLevel([this.root]);
    //   }
    // }

    // 7. Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder.

    inOrder(callback) {
      // Reminder: depth-first level order
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
      // Reminder: depth-first level order
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
      // Reminder: depth-first level order
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

    // 8. Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
    // NOTE: height is bottom-up, remember that trees are upside down visually with the root at the top. Leaf nodes have 0 height, roots have the highest number.

    // height(node) {
    //   // recursion
    // }

    // Iterative height method using a queue (level-order traversal)
    //   height(node) {
    //     if (node === null) {
    //       return -1; // If the node is null, return -1 (no edges)
    //     }

    //     let queue = [];
    //     queue.push({ node: node, level: 0 }); // Push the initial node with its level (0)
    //     let maxHeight = 0;

    //     while (queue.length > 0) {
    //       let current = queue.shift();
    //       let currentNode = current.node;
    //       let currentLevel = current.level;

    //       // Update the maxHeight if the current level is greater
    //       maxHeight = Math.max(maxHeight, currentLevel);

    //       // Add the left child to the queue if it exists
    //       if (currentNode.left !== null) {
    //         queue.push({ node: currentNode.left, level: currentLevel + 1 });
    //       }

    //       // Add the right child to the queue if it exists
    //       if (currentNode.right !== null) {
    //         queue.push({ node: currentNode.right, level: currentLevel + 1 });
    //       }
    //     }

    //     return maxHeight;
    //   }
    // }
    // RECURSION
    height(node) {
      if (node === null) {
        return -1; // Base case: height of null is -1 (no edges)
      }
      let leftHeight = this.height(node.left); // Recursively find height of left subtree
      let rightHeight = this.height(node.right); // Recursively find height of right subtree
      return 1 + Math.max(leftHeight, rightHeight); // 1 + max of left and right subtree heights
    }

    // 9. Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    // NOTE: depth is top-down, lol, remember that trees are upside down visually with the root at the top. Also, REMINDER, using find() to set up the target node prevent depth() (or height() from running into an endless loop...e.g.,
    // let testDepthNode0 = testBST.find(85); // 4 depth
    // console.log(testBST.depth(testDepthNode0));
    // Root nodes have 0 height, leaf nodes have the highest number.

    // ITERATION
    depth(node) {
      let current = this.root;
      if (node === current) {
        return 0;
      }
      let count = 0;
      while (node !== current) {
        if (node.data < current.data) {
          current = current.left;
          count += 1;
        } else if (node.data > current.data) {
          current = current.right;
          count += 1;
        }
      }
      return count;
    }

    // A RECURSIVE VERSION, review this...not my code
    // depth(node) {
    //   // Base case: If the node is found, return the depth as 0
    //   if (node === this.root) {
    //     return 0; // Depth of root is 0
    //   }

    //   // Start recursive depth calculation from the root
    //   return this._depthRecursive(this.root, node, 0);
    // }

    // // Helper function to perform the recursion
    // _depthRecursive(current, targetNode, currentDepth) {
    //   // Base case: If current node is null, node is not found
    //   if (current === null) {
    //     return -1; // Node not found
    //   }

    //   // If the target node is found
    //   if (current === targetNode) {
    //     return currentDepth;
    //   }

    //   // Recursive step: Search in the left or right subtree
    //   if (targetNode.data < current.data) {
    //     // Move to the left child
    //     return this._depthRecursive(current.left, targetNode, currentDepth + 1);
    //   } else {
    //     // Move to the right child
    //     return this._depthRecursive(current.right, targetNode, currentDepth + 1);
    //   }
    // }

    // 10. Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

    // Find the minimum height, i.e., the first node without TWO children.
    // Find the maximum height, i.e., the bottom-most/furthest node.

    // Balanced tree as easier and more efficient to search through

    isBalanced1() {
      // Slightly less efficient (O(2n) time complexity
      let current = this.root;
      function findMinHeight(node = current) {
        if (node === null) {
          return -1; // Base case: height of null is -1 (no edges)
        }
        let leftHeight = findMinHeight(node.left); // Recursively find height of left subtree
        let rightHeight = findMinHeight(node.right); // Recursively find height of right subtree
        if (leftHeight < rightHeight) {
          return leftHeight + 1;
        } else {
          return rightHeight + 1;
        }
      }

      function findMaxHeight(node = current) {
        if (node === null) {
          return -1; // Base case: height of null is -1 (no edges)
        }
        let leftHeight = findMaxHeight(node.left); // Recursively find height of left subtree
        let rightHeight = findMaxHeight(node.right); // Recursively find height of right subtree
        if (leftHeight > rightHeight) {
          return leftHeight + 1;
        } else {
          return rightHeight + 1;
        }
      }

      console.log(`findMinHeight is ${findMinHeight()}`);
      console.log(`findMaxHeight is ${findMaxHeight()}`);
      return findMinHeight() >= findMaxHeight() - 1;
    }

    isBalanced2() {
      // Slight more efficient; The first version doesn't properly check balance at every node. It just compares the global minimum and maximum heights, which isn't a sufficient check for balance. A tree could have a large difference in height between subtrees but still return the same global height difference.
      //The second version directly checks balance at each node, ensuring the tree is balanced at every level and that the height difference at every node is at most 1.
      function checkHeight(node) {
        if (node === null) {
          return 0; // Base case: height of null is 0. If the current node is null, meaning we've reached a leaf node's child or the tree is empty, the function returns 0. This represents that there are no nodes below this point (no height at a null node).
        }

        // Recursively get the height of the left subtree
        let leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1; // If the left subtree is unbalanced, propagate -1

        // Recursively get the height of the right subtree
        let rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1; // If the right subtree is unbalanced, propagate -1

        // If the current node is unbalanced (difference in height > 1), return -1
        if (Math.abs(leftHeight - rightHeight) > 1) {
          return -1;
        }

        // Return the height of the current node (max height of left or right + 1)
        let value = node.data;
        console.log(
          `Node [${value}]: leftHeight = ${leftHeight}, rightHeight: ${rightHeight}.`
        );

        return Math.max(leftHeight, rightHeight) + 1;
      }

      // Start the check from the root node
      return checkHeight(this.root) !== -1; // If -1 is returned, the tree is unbalanced
    }

    // 11. Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

    rebalance() {
      if (this.isBalanced2()) {
        console.log(`This tree is already balanced`);
        return;
      }
      let inOrderData = [];
      this.inOrder((node) => {
        inOrderData.push(node.data); // Collect node data
      });

      console.log(`[rebalance()] inOrder: ${inOrderData}`); // This will print the array of node data
      console.log(inOrderData);

      // let newArr = [...inOrderData]
      // console.log(newArr);
      // let rebalanced = this.buildTree(newArr);
      let rebalanced = this.buildTree(inOrderData);

      return (this.root = rebalanced);
    }

    // I added this; just a function that checks if the tree is a BST.
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


// const newArr = sortArr(testArr)

let testBST = new Tree(testArr);
console.log(testBST.sortArr(testArr)); // Sorted, no dupes = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

// testBST.insert(20);
// testBST.insert(20); // Dupe
// testBST.insert(36);
// testBST.insert(65);
// testBST.insert(75);
// testBST.insert(85);

// testBST.insert(20); // Dupe
// testBST.insert(130);
// testBST.insert(210);
// testBST.insert(550);
// testBST.insert(890);
// testBST.insert(1440);

// testBST.deleteItem(85); // leaf node, has no child nodes
// testBST.deleteItem(75); // leaf node, has no child nodes
// testBST.deleteItem(65); // leaf node, has no child nodes
// testBST.deleteItem(36); // leaf node, has no child nodes
// testBST.deleteItem(20); // leaf node, has no child nodes

// testBST.deleteItem(34); // has no left child
// testBST.deleteItem(30); // has no right child

// testBST.deleteItem(80); // has two children
// testBST.deleteItem(70); // has two children
// testBST.deleteItem(60); // has two children
// testBST.deleteItem(40); // has two children

// console.log(testBST.find(20));
// console.log(testBST.find(50));
// console.log(testBST.find(0));
// console.log(testBST.find(100));

console.log(`Minimum value in BST is ${testBST.findMin()}`);
console.log(`Maximum value in BST is ${testBST.findMax()}`);
console.log(testBST.hasValue(50));

// testBST.levelOrder(node => {
//   console.log(node.data / 10);
// });

// testBST.levelOrder((node) => {
//   console.log(node.data);
// });

let levelOrderData = testBST.levelOrder((node) => {
  node.data; // This will log each node's data
});
console.log(`levelOrder: ${levelOrderData}`);  // This will print the array of node data

let inOrderData = testBST.inOrder((node) => {
  node.data; // This will log each node's data
});
console.log(`inOrder: ${inOrderData}`);  // This will print the array of node data

let preOrderData = testBST.preOrder((node) => {
  node.data; // This will log each node's data
});
console.log(`preOrder: ${preOrderData}`);  // This will print the array of node data

let postOrderData = testBST.postOrder((node) => {
  node.data; // This will log each node's data
});
console.log(`postOrder: ${postOrderData}`);  // This will print the array of node data

// let testHeightNode0 = testBST.find(85); // 0 height
// let testHeightNode1 = testBST.find(80); // 1 height
// let testHeightNode2 = testBST.find(70); // 2 height
// let testHeightNode3 = testBST.find(60); // 3 height
// let testHeightNode4 = testBST.find(40); // 4 height

// let testHeightNode0 = testBST.find(4); // 2 height
// let testHeightNode1 = testBST.find(7); // 0 height
// let testHeightNode2 = testBST.find(9); // 1 height
// let testHeightNode3 = testBST.find(67); // 2 height
// let testHeightNode4 = testBST.find(6345); // 0 height


// console.log(testBST.height(testHeightNode0));
// console.log(testBST.height(testHeightNode1));
// console.log(testBST.height(testHeightNode2));
// console.log(testBST.height(testHeightNode3));
// console.log(testBST.height(testHeightNode4));

// let testDepthNode0 = testBST.find(85); // 4 depth
// let testDepthNode1 = testBST.find(80); // 3 depth
// let testDepthNode2 = testBST.find(70); // 2 depth
// let testDepthNode3 = testBST.find(60); // 1 depth
// let testDepthNode4 = testBST.find(40); // 0 depth

// let testDepthNode0 = testBST.find(4); // 1 depth
// let testDepthNode1 = testBST.find(7); // 3 depth
// let testDepthNode2 = testBST.find(9); // 2 depth
// let testDepthNode3 = testBST.find(67); // 1 depth
// let testDepthNode4 = testBST.find(6345); // 3 depth

// console.log(testBST.depth(testDepthNode0));
// console.log(testBST.depth(testDepthNode1));
// console.log(testBST.depth(testDepthNode2));
// console.log(testBST.depth(testDepthNode3));
// console.log(testBST.depth(testDepthNode4));

testBST.insert(2); // Unbalances BST
testBST.insert(24); // Unbalances BST
testBST.insert(325); // Unbalances BST
testBST.insert(20000); // Unbalances BST

console.log(testBST.isBalanced2())

let inOrderData2 = testBST.inOrder((node) => {
  node.data; // This will log each node's data
});
console.log(`inOrder2: ${inOrderData2}`);  // This will print the array of node data

testBST.rebalance();

console.log(testBST.isBalanced2());

console.log(testBST);

testBST.prettyPrint(testBST.root);

// let testBST2 = new Tree();
// testBST2.root = new Node(10);
// testBST2.root.left = new Node(5);
// testBST2.root.right = new Node(15);
// testBST2.root.left.left = new Node(3);
// testBST2.root.left.right = new Node(7);

// testBST2.prettyPrint(testBST2.root);

// Find the height of node with value 5
// let testNode = testBST2.root.left;  // Node with value 5
// let heightOfNode = testBST2.height(testNode);
// console.log(`Height of node with value 5:`, heightOfNode);  // Output should be 1

// Tie it all together
// Write a driver script that does the following:

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.

//console.log(rando100);
//My version...
function randomNumbers() {
  const randomArr = [];
  for (let i = 0; i < 8; i++) {
  let rando100 = Math.floor(Math.random() * 100);
  randomArr.push(rando100);
  }
  return randomArr;
}

// Better, i have no memory of .from(), LOL!
function randomNumbers(count = 8) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}

console.log(randomNumbers());




// 2. Confirm that the tree is balanced by calling isBalanced.
// 3. Print out all elements in level, pre, post, and in order.
// 4. Unbalance the tree by adding several numbers > 100.
// 5. Confirm that the tree is unbalanced by calling isBalanced.
// 6. Balance the tree by calling rebalance.
// 7. Confirm that the tree is balanced by calling isBalanced.
// 8. Print out all elements in level, pre, post, and in order.


