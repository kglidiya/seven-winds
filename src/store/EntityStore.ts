import { makeAutoObservable, toJS, runInAction } from "mobx";
import {
  createRowInEntity,
  deleteRowInEntity,
  getTreeRows,
  updateRowInEntity,
} from "../utils/api";
import {
  IOutlayRow,
  IOutlayRowRequest,
  IRowResponse,
  ITreeResponse,
  ITreeStructure,
} from "../utils/types";
import {
  addDefaultNode,
  addNewRow,
  deleteNode,
  getTreeLengthLevel,
  updateTree,
} from "../utils/helpers";

export default class EntityStore {
  _entity: ITreeResponse[];
  _parent: null | number;
  _nodeToUpdate: null | number;
  _editModeOn: boolean;
  _treeStructure: ITreeStructure;
  _iconOnHove: boolean;

  constructor() {
    this._entity = [];
    this._parent = null;
    this._nodeToUpdate = null;
    this._editModeOn = false;
    this._iconOnHove = false;
    this._treeStructure = {
      level: 0,
      length: 0,
    };

    makeAutoObservable(this);
  }

  async getEntity() {
    const tree = await getTreeRows();
    runInAction(() => {
      this._entity = tree;
    });
  }

  async createRow(data: IOutlayRowRequest) {
    const res = await createRowInEntity(data);
    runInAction(() => {
      const newNode = { child: [], ...res.current };
      const updatedNodes = res.changed;
      addNewRow(this._entity, data.parentId, newNode);
      deleteNode(this._entity, null);
      if (updatedNodes.length) {
        updateTree(this._entity, updatedNodes);
      }
    });
  }

  async deleteRow(id: number) {
    const res = await deleteRowInEntity(id);
    runInAction(() => {
      this._entity = deleteNode(this._entity, id);
      if (res.changed) {
        this._entity = updateTree(this._entity, res.changed);
      }
    });
    const treeStructure = getTreeLengthLevel(this._entity);
    this._treeStructure = treeStructure;
  }

  async updateRow(id: number, body: IOutlayRow) {
    const res = await updateRowInEntity(id, body);
    runInAction(() => {
      const newData = (res.changed as IRowResponse[]).concat([res.current]);
      console.log(newData);
      const treeUpdated = updateTree(this._entity, newData);
      this._entity = treeUpdated;
    });
  }

  addDefaultNode(parentId: number) {
    const tree = addDefaultNode(this._entity, parentId);
    this._entity = tree;
  }

  deleteDefaultNode(id: number) {
    const tree = deleteNode(this._entity, id);
    this._entity = tree;
  }

  setParent(parent: null | number) {
    this._parent = parent;
  }

  setNodeToUpdate(node: null | number) {
    this._nodeToUpdate = node;
  }

  setEditMode(status: boolean) {
    this._editModeOn = status;
  }

  setIconOnhove(state: boolean) {
    this._iconOnHove = state;
  }

  getTreeStructure() {
    const treeStructure = getTreeLengthLevel(this._entity);
    this._treeStructure = treeStructure;
  }

  get entity() {
    return this._entity;
  }

  get parent() {
    return this._parent;
  }

  get nodeToUpdate() {
    return this._nodeToUpdate;
  }

  get edidModeOn() {
    return this._editModeOn;
  }

  get treeStructure() {
    return this._treeStructure;
  }

  get iconOnHove() {
    return this._iconOnHove;
  }
}
