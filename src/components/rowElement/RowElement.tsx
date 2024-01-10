import { ChangeEvent, KeyboardEventHandler, useContext, useState } from "react";
import "./RowElement.scss";
import { observer } from "mobx-react-lite";
import { HorizontalLine } from "../ui/horizontalLine/HorizontalLine";
import { HorizontalDevider } from "../ui/horizontalDevider/HorizontalDevider";
import ListIcon from "../ui/icons/listIcon/ListIcon";
import { IOutlayRow, IRowResponse } from "../../utils/types";
import TrashIcon from "../ui/icons/trashIcon/TrashIcon";
import { Context } from "../..";
import { getParent } from "../../utils/helpers";

interface IRowElement {
  item: IRowResponse;
  marginLeft: number;
  strokeWidth: number;
}

const RowElement = observer(
  ({ item, marginLeft, strokeWidth }: IRowElement) => {
    const entityStore = useContext(Context)!.entity;
    const [editMode, setEditMode] = useState(false);
    const [nodeToUpdate, setNodeToUpdate] = useState<number | null>(null);

    const [values, setValues] = useState<IOutlayRow>({
      equipmentCosts: item.equipmentCosts,
      estimatedProfit: item.estimatedProfit,
      machineOperatorSalary: item.machineOperatorSalary,
      mainCosts: item.mainCosts,
      materials: item.materials,
      mimExploitation: item.mimExploitation,
      overheads: item.overheads,
      rowName: item.rowName,
      salary: item.salary,
      supportCosts: item.supportCosts,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };

    const addNode = (id: number | null) => {
      entityStore.setParent(id);
      entityStore.addDefaultNode(id);
      entityStore.setEditMode(true);
    };

    const switchEditMode = () => {
      setEditMode(!editMode);
      entityStore.setEditMode(!editMode);
    };

    const deleteNode = (id: number | null) => {
      entityStore.deleteRow(id);
    };

    const [parent] = useState<number | null>(
      getParent(entityStore.entity, item.id)
    );

    const onSubmit = () => {
      entityStore.updateRow(nodeToUpdate, values);
      setEditMode(false);
      entityStore.setEditMode(false);
      setNodeToUpdate(null);
    };

    const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    };

    return (
      <>
        {editMode && (
          <li
            className={"entity__items"}
            onDoubleClick={() => {
              switchEditMode();
              setNodeToUpdate(null);
            }}
          >
            <HorizontalDevider
              left={marginLeft - entityStore.treeStructure.level * 20 - 10}
              width={strokeWidth}
            />
            <div className={"entity__row"}>
              <div
                className={"entity__icons"}
                onMouseEnter={() => entityStore.setIconOnhove(true)}
                onMouseLeave={() => entityStore.setIconOnhove(false)}
                style={{
                  backgroundColor: entityStore.iconOnHove
                    ? "rgba(65, 65, 68, 1)"
                    : "transparent",
                }}
              >
                <ListIcon />
                {entityStore.iconOnHove && (
                  <TrashIcon
                    onClick={() => {
                      deleteNode(item.id);
                    }}
                  />
                )}
              </div>
              <div
                className={"entity__details"}
                style={{ marginLeft: `${marginLeft}px` }}
              >
                <form onSubmit={onSubmit} className={"entity__form"}>
                  <input
                    className={"entity__input"}
                    type="string"
                    name="rowName"
                    value={values.rowName}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    width={733}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="salary"
                    value={values.salary}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="equipmentCosts"
                    value={values.equipmentCosts}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="overheads"
                    value={values.overheads}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="estimatedProfit"
                    value={values.estimatedProfit}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="machineOperatorSalary"
                    value={values.machineOperatorSalary}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="mimExploitation"
                    value={values.mimExploitation}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="supportCosts"
                    value={values.supportCosts}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="materials"
                    value={values.materials}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                  <input
                    className={"entity__input"}
                    type="number"
                    name="mainCosts"
                    value={values.mainCosts}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                  />
                </form>
              </div>
            </div>
            {parent !== null && <HorizontalLine />}
          </li>
        )}

        {!editMode && (
          <li
            className={"entity__items"}
            onDoubleClick={() => {
              switchEditMode();
              setNodeToUpdate(item.id);
            }}
          >
            <HorizontalDevider
              left={marginLeft - entityStore.treeStructure.level * 20 - 10}
              width={strokeWidth}
            />
            <div className={"entity__row"}>
              <div
                className={"entity__icons"}
                onMouseEnter={() => entityStore.setIconOnhove(true)}
                onMouseLeave={() => entityStore.setIconOnhove(false)}
                style={{
                  backgroundColor: entityStore.iconOnHove
                    ? "rgba(65, 65, 68, 1)"
                    : "transparent",
                }}
              >
                <ListIcon
                  onClick={() => {
                    if (!entityStore.edidModeOn) {
                      addNode(item.id);
                      entityStore.getTreeStructure();
                    }
                  }}
                />
                {entityStore.iconOnHove && (
                  <TrashIcon
                    onClick={() => {
                      if (!entityStore.edidModeOn) {
                        deleteNode(item.id);
                      }
                    }}
                  />
                )}
              </div>

              <div
                className={"entity__details"}
                style={{ marginLeft: `${marginLeft}px` }}
              >
                <p className={"entity__item"}>{item.rowName}</p>
                <p className={"entity__item"}>{item.salary}</p>
                <p className={"entity__item"}>{item.equipmentCosts}</p>
                <p className={"entity__item"}>{item.overheads}</p>
                <p className={"entity__item"}>{item.estimatedProfit}</p>
                <p className={"entity__item"}>{item.machineOperatorSalary}</p>
                <p className={"entity__item"}>{item.mimExploitation}</p>
                <p className={"entity__item"}>{item.supportCosts}</p>
                <p className={"entity__item"}>{item.materials}</p>
                <p className={"entity__item"}>{item.mainCosts}</p>
                <p className={"entity__item"}>{item.total}</p>
              </div>
            </div>
            {parent !== null && <HorizontalLine />}
          </li>
        )}
      </>
    );
  }
);

export default RowElement;
