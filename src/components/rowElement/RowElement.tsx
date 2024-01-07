import { ChangeEvent, KeyboardEventHandler, useContext, useState } from "react";
import "./RowElement.scss";
import { observer } from "mobx-react-lite";
import { HorizontalLine } from "../ui/horizontalLine/HorizontalLine";
import { HorizontalDevider } from "../ui/horizontalDevider/HorizontalDevider";
import ListIcon from "../ui/icons/listIcon/ListIcon";
import { IRowResponse } from "../../utils/types";
import TrashIcon from "../ui/icons/trashIcon/TrashIcon";
import { Context } from "../..";
import { getParent } from "../../utils/helpers";

interface IRowElement {
  item: IRowResponse;
  marginLeft: number;
}

const RowElement = observer(({ item, marginLeft }: IRowElement) => {
  const entityStore = useContext(Context).entity;
  const [values, setValues] = useState({
    equipmentCosts: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: "",
    salary: 0,
    supportCosts: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [editMode, setEditMode] = useState(false);

  const addNode = (parentId: number | null) => {
    entityStore.setParent(parentId);
    entityStore.addDefaultNode(parentId);
    entityStore.setEditMode(true);
  };

  const updateNode = (id: number | null) => {
    setEditMode(!editMode);
    entityStore.setNodeToUpdate(id);
    entityStore.setEditMode(!editMode);
  };

  const deleteNode = (id: number | null) => {
    entityStore.deleteRow(id);
  };

  const [parent] = useState<number | null>(
    getParent(entityStore.entity, item.id)
  );

  const onSubmit = () => {
    entityStore.updateRow(entityStore.nodeToUpdate, values);
    setEditMode(false);
    entityStore.setEditMode(false);
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
            updateNode(item.id);
          }}
        >
          <HorizontalDevider
            left={marginLeft - entityStore.treeStructure.level * 20 - 10}
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
                  placeholder={item.rowName}
                  onChange={handleChange}
                  onKeyDown={handleSubmit}
                  width={733}
                />
                <input
                  className={"entity__input"}
                  type="number"
                  name="salary"
                  placeholder={String(item.salary)}
                  onChange={handleChange}
                  onKeyDown={handleSubmit}
                />
                <input
                  className={"entity__input"}
                  type="number"
                  name="equipmentCosts"
                  placeholder={String(item.equipmentCosts)}
                  onChange={handleChange}
                  onKeyDown={handleSubmit}
                />
                <input
                  className={"entity__input"}
                  type="number"
                  name="overheads"
                  placeholder={String(item.overheads)}
                  onChange={handleChange}
                  onKeyDown={handleSubmit}
                />
                <input
                  className={"entity__input"}
                  type="number"
                  name="estimatedProfit"
                  placeholder={String(item.estimatedProfit)}
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
            updateNode(item.id);
          }}
        >
          <HorizontalDevider
            left={marginLeft - entityStore.treeStructure.level * 20 - 10}
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
            </div>
          </div>
          {parent !== null && <HorizontalLine />}
        </li>
      )}
    </>
  );
});

export default RowElement;
