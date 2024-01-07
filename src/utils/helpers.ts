import { defaultNode } from "./constants";
import { IRowResponse, ITreeResponse, ITreeStructure } from "./types";

export function addNewRow(
  tree: ITreeResponse[],
  parentId: number | null,
  newNode: ITreeResponse
) {
  if (parentId === null) {
    tree.push(newNode);
  } else {
    tree.forEach((node) => {
      if (node.id === parentId) {
        node.child.push(newNode);
        return tree;
      } else addNewRow(node.child, parentId, newNode);
    });
  }
  return tree;
}

export function deleteNode(tree: ITreeResponse[], id: number | null) {
  tree.forEach((node) => {
    if (node.id === id) {
      tree.splice(tree.indexOf(node), 1);
      return tree;
    } else deleteNode(node.child, id);
  });
  return tree;
}

export function updateTree(tree: ITreeResponse[], newData: IRowResponse[]) {
  function update(tree: ITreeResponse[], newNode: IRowResponse) {
    tree.forEach((node) => {
      if (node.id === newNode.id) {
        const child = node.child;
        const nodeUpdated = { child, ...newNode };
        tree.splice(tree.indexOf(node), 1, nodeUpdated);
        return tree;
      } else update(node.child, newNode);
    });
    return tree;
  }
  newData.forEach((newNode) => {
    update(tree, newNode);
  });

  return tree;
}

export function addDefaultNode(tree: ITreeResponse[], parentId: number) {
  tree.forEach((node) => {
    if (node.id === parentId) {
      node.child.push(defaultNode);
      return tree;
    } else addDefaultNode(node.child, parentId);
  });
  return tree;
}

export function countTreeLength(tree: ITreeResponse[]) {
  if (tree.length === 0) return [];
  const length: ITreeResponse[][] = [];
  length.push(tree);
  tree.forEach((row) => {
    if (row.child.length !== 0) {
      for (let i = 0; i < row.child.length; i++) {
        length.push(...countTreeLength(row.child));
      }
    }
  });

  return length;
}

export function getTreeLengthLevel(tree: ITreeResponse[]) {
  const treeStructure = {
    level: 0,
    length: 0,
  };

  function traverseTree(tree: ITreeResponse[], treeStructure: ITreeStructure) {
    treeStructure.level = treeStructure.level + 1;
    treeStructure.length = treeStructure.length + tree.length;
    tree.forEach((row) => {
      if (row.child.length !== 0) {
        traverseTree(row.child, treeStructure);
      }
    });
    return treeStructure;
  }
  traverseTree(tree, treeStructure);
  return treeStructure;
}

export function getParent(tree: ITreeResponse[], id: number | null) {
  let indexOfParent = 0;
  const nodes = countTreeLength(tree);
  nodes.forEach((node: ITreeResponse[]) => {
    if (node[0].id === id) {
      indexOfParent = nodes.indexOf(node) - 1;
    }
  });
  if (indexOfParent >= 0) {
    return nodes.at(indexOfParent)![0].id;
  } else return null;
}
