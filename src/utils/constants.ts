import { ITreeResponse } from "./types";

export const eID = "117084";
export const entityList = {
  title: "Строительно-монтажные работы",
  columns: [
    "Уровень",
    "Наименование работ",
    "Основная з/п",
    "Оборудование",
    "Накладные расходы",
    "Сметная прибыль",
    // "З/п механизаторов",
    // "Мин. износ",
    // "Вспомогательные расходы",
    // "Материалы",
    // "Основные расходы",
  ],
};

export const defaultNode = {
  child: [],
  equipmentCosts: 0,
  estimatedProfit: 0,
  id: null,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  rowName: "",
  salary: 0,
  supportCosts: 0,
  total: 0,
} as ITreeResponse;

export const navigationList = [
  "По проекту",
  "Объекты",
  "РД",
  "МТО",
  "СМР",
  "График",
  "МиМ",
  "Рабочие",
  "Капвложения",
  "Бюджет",
  "Финансирование",
  "Панорамы",
  "Камеры",
  "Поручения",
  "Контрагенты",
];
