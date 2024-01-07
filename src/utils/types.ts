export interface IEntityResponse {
  id: number;
  rowName: string;
}

export interface IRowResponse {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number | null;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
}

export interface ITreeResponse extends IRowResponse {
  child: ITreeResponse[];
}

export interface IOutlayRow {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
}

export interface IOutlayRowRequest extends IOutlayRow {
  parentId: number | null;
}

export interface IDeleteRowResponse {
  changed: [] | IRowResponse[];
  current: null;
}
export interface ITreeStructure {
  level: number;
  length: number;
}

export interface IRecalculatedRows {
  changed: [] | IRowResponse[];
  current: IRowResponse;
}
