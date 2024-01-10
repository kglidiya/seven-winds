import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../..";
import "./Entity.scss";
import { VerticalLine } from "../ui/verticalLine/VerticalLine";
import { ITreeResponse } from "../../utils/types";
import RowElement from "../rowElement/RowElement";
import DefaultRowElement from "../defaultRowElement/DefaultRowElement";
import { getParent, getTreeLengthLevel } from "../../utils/helpers";
import React from "react";

interface ITree {
  rows: ITreeResponse[];
  strokeWidth: number;
}

const Entity = observer(({ rows, strokeWidth }: ITree) => {
  const entityStore = useContext(Context)!.entity;
  const ref = useRef<HTMLUListElement | null>(null);
  const [height, setHeight] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  const calculateLineHigth = () => {
    const top = ref.current && ref.current.getBoundingClientRect().top;
    const nodes = ref.current?.childNodes as NodeListOf<HTMLLIElement>;
    const lastChild = [] as number[];
    nodes?.forEach((child) => {
      if (child.nodeName === "LI") {
        lastChild.push(child.getBoundingClientRect().top);
      }
    });
    const bottom = lastChild.sort((a, b) => b - a)[0];
    if (top) {
      return bottom - top + 53;
    } else return 0;
  };

  useEffect(() => {
    if (ref.current) {
      setHeight(calculateLineHigth());
      setMarginLeft(getTreeLengthLevel(rows).level * 20);
    }
  }, [entityStore.treeStructure.length, rows, entityStore.treeStructure.level]);

  return (
    <ul className={"entity"} ref={ref}>
      {rows.length === 0 && (
        <DefaultRowElement marginLeft={marginLeft} strokeWidth={strokeWidth} />
      )}
      {rows.length > 0 &&
        rows.map((item) => (
          <React.Fragment key={item.id}>
            {getParent(entityStore.entity, item.id) !== null && (
              <VerticalLine height={height} />
            )}
            {item.id !== null ? (
              <>
                <RowElement
                  item={item}
                  marginLeft={marginLeft}
                  strokeWidth={strokeWidth}
                />
              </>
            ) : (
              <DefaultRowElement
                marginLeft={marginLeft}
                strokeWidth={strokeWidth}
              />
            )}
            {item.child.length !== 0 && (
              <Entity rows={item.child} strokeWidth={strokeWidth} />
            )}
          </React.Fragment>
        ))}
    </ul>
  );
});

export default Entity;
