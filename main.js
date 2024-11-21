// Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    // this.value = data
  }
}

// Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

// Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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

  // Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.

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
        console.log(`This value already exists in the BST.`);
        return null;  // Do not insert duplicates
      }

      // If value is less than the node's data, move to the left
      if (value < node.data) {
        if (!node.left) {
          node.left = newNode;  // Insert the node here
          return node;
        }
        // Recur on the left child
        return addNode(node.left);
      } 

      // If value is greater than the node's data, move to the right
      else if (value > node.data) {
        if (!node.right) {
          node.right = newNode;  // Insert the node here
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

}

// const newArr = sortArr(testArr)

let testBST = new Tree(testArr);
console.log(testBST.sortArr(testArr)); // Sorted, no dupes = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

testBST.insert(17);
testBST.insert(17); // Dupe
testBST.insert(19);
testBST.insert(23);
testBST.insert(27);
testBST.insert(31);
testBST.insert(37);
testBST.insert(619);
testBST.insert(-23);
testBST.insert(232323);

console.log(testBST);

testBST.prettyPrint(testBST.root);
