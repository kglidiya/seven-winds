import { useContext, useEffect, useRef } from "react";
import ListIcon from "../ui/icons/listIcon/ListIcon";
import TrashIcon from "../ui/icons/trashIcon/TrashIcon";
import "../rowElement/RowElement.scss";
import Input from "../ui/input/Input";
import { FieldValues, useForm } from "react-hook-form";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { HorizontalLine } from "../ui/horizontalLine/HorizontalLine";
import { HorizontalDevider } from "../ui/horizontalDevider/HorizontalDevider";

interface IDefaultRowElemen {
  marginLeft: number;
}
const DefaultRowElement = observer(({ marginLeft }: IDefaultRowElemen) => {
  const entityStore = useContext(Context).entity;
  const { register, handleSubmit, getValues } = useForm<FieldValues>({
    values: {
      equipmentCosts: null,
      estimatedProfit: null,
      machineOperatorSalary: null,
      mainCosts: null,
      materials: null,
      mimExploitation: null,
      overheads: null,
      parentId: null,
      rowName: "",
      salary: null,
      supportCosts: null,
    },
  });
  const ref = useRef<HTMLFormElement | null>(null);
  const onSubmit = (values: FieldValues) => {
    const data = {
      equipmentCosts: values.equipmentCosts ? +values.equipmentCosts : 0,
      estimatedProfit: values.estimatedProfit ? +values.estimatedProfit : 0,
      machineOperatorSalary: +values.machineOperatorSalary
        ? +values.machineOperatorSalary
        : 0,
      mainCosts: values.mainCosts ? +values.mainCosts : 0,
      materials: values.materials ? +values.materials : 0,
      mimExploitation: values.mimExploitation ? +values.mimExploitation : 0,
      overheads: values.overheads ? +values.overheads : 0,
      parentId: entityStore.entity.length !== 0 ? entityStore.parent : null,
      rowName: values.rowName,
      salary: values.salary ? +values.salary : 0,
      supportCosts: values.supportCosts ? +values.supportCosts : 0,
    }

    entityStore.createRow(data);
    entityStore.setEditMode(false);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSubmit(getValues());
        entityStore.getTreeStructure();
      }
    };

    const form = ref.current;
    form && form.addEventListener("keydown", keyDownHandler);

    return () => {
      form && form.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <li className={"entity__items"}>
        <HorizontalDevider
          left={marginLeft - entityStore.treeStructure.level * 20 - 10}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"entity__form"}
          ref={ref}
        >
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
                  entityStore.deleteDefaultNode(null);
                  entityStore.setEditMode(false);
                  entityStore.getTreeStructure();
                }}
              />
            )}
          </div>
          <Input
            type="string"
            name="rowName"
            register={register}
            width={733}
            placeholder=""
          />
          <Input
            type="number"
            name="salary"
            register={register}
            width={176}
          />
          <Input
            type="number"
            name="equipmentCosts"
            register={register}
            width={176}
          />
          <Input
            type="number"
            name="overheads"
            register={register}
            width={176}
          />
          <Input
            type="number"
            name="estimatedProfit"
            register={register}
            width={176}
          />
        </form>
        {entityStore.entity.length !== 0 && <HorizontalLine />}
      </li>
    </>
  );
});

export default DefaultRowElement;
