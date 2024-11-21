// code from https://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
// JavaScript program to convert sorted array to BST.

// ***Using Recursion – O(n) Time and O(n) Space
// Follow the steps mentioned below to implement the approach:

// Set The middle element of the array as root.
// Recursively do the same for the left half and right half.
// Get the middle of the left half and make it the left child of the root created in step 1.
// Get the middle of the right half and make it the right child of the root created in step 1.
// Print the preorder of the tree.
// Below is the implementation of the above approach:

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Recursive function to construct BST
// function sortedArrayToBSTRecur(arr, start, end) {
//   if (start > end) return null;

//   // Find the middle element
//   let mid = start + Math.floor((end - start) / 2);

//   // Create root node
//   let root = new Node(arr[mid]);

//   // Create left subtree
//   root.left = sortedArrayToBSTRecur(arr, start, mid - 1);

//   // Create right subtree
//   root.right = sortedArrayToBSTRecur(arr, mid + 1, end);

//   return root;
// }

// function sortedArrayToBST(arr) {
//   return sortedArrayToBSTRecur(arr, 0, arr.length - 1);
// }

// function preOrder(root) {
//   if (root === null) return;
//   console.log(root.data);
//   preOrder(root.left);
//   preOrder(root.right);
// }

// const arr = [1, 2, 3, 4];
// const root = sortedArrayToBST(arr);
// console.log(preOrder(root)); // This does the following: Prints the value of the node. Recursively visits the left child. Recursively visits the right child. Output is 2, 1, 3, 4. So, 2 is the root node, then it left to 1, and back to the right for 3, 4 since preorder is being used here.


// ***Using queue – O(n) Time and O(n) Space

// Step-by-step approach:

// First initialize a queue with root node (which the mid of initial array) and two variables. Lets say start and end which will describe the range of the root (set to 0 and n-1 for root node). Loop until the queue is empty.
// Remove first node from the queue along with its start and end range and find middle index of the range. Elements present in the range [start, middle-1] will be present in its left subtree and elements in the range [middle+1, end] will be present in the right subtree.
// If left subtree exists, that is, if start is less than middle index. Then create the left node with the value equal to middle of range [start, middle-1]. Link the root node and left node and push the left node along with range into the queue.
// If right subtree exists, that is, if end is greater than middle index. Then create the right node with the value equal to middle of range [middle+1, end]. Link the root node and right node and push the right node along range into the queue.
// Return the root node.
// Below is the implementation of the above approach:

// JavaScript program to convert sorted
// array to BST.

// class Node {
//     constructor(data) {
//         this.data = data;
//         this.left = null;
//         this.right = null;
//     }
// }

// function sortedArrayToBST(arr) {
//     let n = arr.length;

//     if (n === 0)
//         return null;

//     // Create the root node
//     let mid = Math.floor((n - 1) / 2);
//     let root = new Node(arr[mid]);

//     let q = [ {node : root, range : [ 0, n - 1 ]} ];
//     let frontIndex = 0;

//     while (frontIndex < q.length) {
//         let front = q[frontIndex];
//         let curr = front.node;
//         let [s, e] = front.range;
//         let index = s + Math.floor((e - s) / 2);

//         // If left subtree exists
//         if (s < index) {
//             let midLeft
//                 = s + Math.floor((index - 1 - s) / 2);
//             let left = new Node(arr[midLeft]);
//             curr.left = left;
//             q.push({node : left, range : [ s, index - 1 ]});
//         }

//         // If right subtree exists
//         if (e > index) {
//             let midRight
//                 = index + 1
//                   + Math.floor((e - index - 1) / 2);
//             let right = new Node(arr[midRight]);
//             curr.right = right;
//             q.push(
//                 {node : right, range : [ index + 1, e ]});
//         }

//         frontIndex++;
//     }

//     return root;
// }

// function preOrder(root) {
//     if (root === null)
//         return;
//     console.log(root.data + " ");
//     preOrder(root.left);
//     preOrder(root.right);
// }

// let arr = [ 1, 2, 3, 4 ];
// let root = sortedArrayToBST(arr);
// console.log(preOrder(root)); // 2 1 3 4


// *** in Binary Search Tree using Recursion:
// Below is the implementation of the insertion operation using recursion.
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// A utility function to insert a new
// node with the given key
function insert(root, key) {
  if (root === null) return new Node(key);

  // Duplicates not allowed
  if (root.key === key) return root;

  if (key < root.key) root.left = insert(root.left, key);
  else if (key > root.key) root.right = insert(root.right, key);

  return root;
}

// A utility function to do inorder
// tree traversal
function inorder(root) {
  if (root !== null) {
    inorder(root.left);
    console.log(root.key + " ");
    inorder(root.right);
  }
}

// Creating the following BST
//      50
//     /  \
//    30   70
//   / \   / \
//  20 40 60 80

let root = new Node(50);
root = insert(root, 30);
root = insert(root, 20);
root = insert(root, 40);
root = insert(root, 70);
root = insert(root, 60);
root = insert(root, 80);

// Print inorder traversal of the BST
inorder(root);



// ***Insertion in Binary Search Tree using Iterative approach:
// Instead of using recursion, we can also implement the insertion operation iteratively using a while loop. Below is the implementation using a while loop.
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// Function to insert a new node with the given key
function insert(root, x) {
  const temp = new Node(x);

  // If tree is empty
  if (root === null) return temp;

  // Find the node who is going to have
  // the new node temp as its child
  let parent = null;
  let curr = root;
  while (curr !== null) {
    parent = curr;
    if (curr.key > x) curr = curr.left;
    else if (curr.key < x) curr = curr.right;
    else return root; // Key already exists
  }

  // If x is smaller, make it left
  // child, else right child
  if (parent.key > x) parent.left = temp;
  else parent.right = temp;

  return root;
}

// A utility function to do inorder tree traversal
function inorder(root) {
  if (root !== null) {
    inorder(root.left);
    console.log(root.key + " ");
    inorder(root.right);
  }
}

// Creating the following BST
//      50
//     /  \
//    30   70
//   / \   / \
//  20 40 60 80

let root = new Node(50);
root = insert(root, 30);
root = insert(root, 20);
root = insert(root, 40);
root = insert(root, 70);
root = insert(root, 60);
root = insert(root, 80);

// Print inorder traversal of the BST
inorder(root);