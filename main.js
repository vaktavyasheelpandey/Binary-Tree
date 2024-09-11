class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert a node in the tree
    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Helper function to check if the tree is balanced
    isBalanced() {
        return this._checkHeight(this.root) !== -1;
    }

    _checkHeight(node) {
        if (node === null) return 0;

        const leftHeight = this._checkHeight(node.left);
        if (leftHeight === -1) return -1;

        const rightHeight = this._checkHeight(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Balance the tree
    rebalance() {
        const sortedNodes = this.inOrderArray(this.root);
        this.root = this._buildBalancedTree(sortedNodes, 0, sortedNodes.length - 1);
    }

    _buildBalancedTree(sortedArray, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(sortedArray[mid]);

        node.left = this._buildBalancedTree(sortedArray, start, mid - 1);
        node.right = this._buildBalancedTree(sortedArray, mid + 1, end);

        return node;
    }

    // Traversal methods
    levelOrder() {
        if (!this.root) return [];
        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.data);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    inOrder() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.data);
            this._inOrder(node.right, result);
        }
    }

    inOrderArray(node) {
        const result = [];
        this._inOrder(node, result);
        return result;
    }

    preOrder() {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    _preOrder(node, result) {
        if (node !== null) {
            result.push(node.data);
            this._preOrder(node.left, result);
            this._preOrder(node.right, result);
        }
    }

    postOrder() {
        const result = [];
        this._postOrder(this.root, result);
        return result;
    }

    _postOrder(node, result) {
        if (node !== null) {
            this._postOrder(node.left, result);
            this._postOrder(node.right, result);
            result.push(node.data);
        }
    }

    // Helper function to generate an array of random numbers < 100
    generateRandomArray(size) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    }
}

// Example Usage:

// Create BST and insert random numbers < 100
const bst = new BinarySearchTree();
const randomArray = bst.generateRandomArray(10);

randomArray.forEach(num => bst.insert(num));
console.log("Random array:", randomArray);

console.log("Is tree balanced?", bst.isBalanced()); // Check if balanced

// Print all elements in level, pre, post, and in order
console.log("Level order:", bst.levelOrder());
console.log("Pre-order:", bst.preOrder());
console.log("Post-order:", bst.postOrder());
console.log("In-order:", bst.inOrder());

// Unbalance the tree by adding numbers > 100
bst.insert(150);
bst.insert(120);
bst.insert(180);

console.log("Is tree balanced after adding numbers > 100?", bst.isBalanced());

// Rebalance the tree
bst.rebalance();

console.log("Is tree balanced after rebalancing?", bst.isBalanced()); // Check if balanced after rebalancing

// Print all elements in level, pre, post, and in order again after rebalancing
console.log("Level order after rebalancing:", bst.levelOrder());
console.log("Pre-order after rebalancing:", bst.preOrder());
console.log("Post-order after rebalancing:", bst.postOrder());
console.log("In-order after rebalancing:", bst.inOrder());
