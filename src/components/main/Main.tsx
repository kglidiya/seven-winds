import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
import Entity from "../entity/Entity";
import { Context } from "../..";
import "./Main.scss";

interface IMain {
  entity: {
    title: string;
    columns: string[];
  };
}

const Main = observer(({ entity }: IMain) => {
  const entityStore = useContext(Context)!.entity;
  const [strokeWidth, setStrokeWidth] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    entityStore.getEntity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    entityStore.getTreeStructure();
    if (ref.current) {
      setStrokeWidth(ref.current.scrollWidth);
    }
  }, [entityStore, entityStore.entity]);

  useEffect(() => {
    const scrollContainer = ref.current;
    const scrollHandler = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer &&
        scrollContainer.scrollBy({
          left: e.deltaY < 0 ? -200 : 200,
          top: e.deltaX < 0 ? -200 : 200,
        });
    };

    scrollContainer &&
      scrollContainer.addEventListener("wheel", scrollHandler, {
        passive: false,
      });

    return () => {
      scrollContainer &&
        scrollContainer.removeEventListener("wheel", scrollHandler);
    };
  }, []);

  return (
    <div className="tree" ref={ref}>
      <div className="tree__header" style={{ width: `${strokeWidth}px` }}>
        <h3 className="tree__title">{entity.title}</h3>
        <ul className="tree__columns">
          {entity.columns.map((column, i: number) => {
            return (
              <li
                key={i}
                className="tree__column"
                style={{
                  width:
                    i === 0
                      ? `${entityStore.treeStructure.level * 20 + 50}px`
                      : "200px",
                }}
              >
                {column}
              </li>
            );
          })}
        </ul>
      </div>
      <Entity rows={entityStore.entity} strokeWidth={strokeWidth} />
    </div>
  );
});
export default Main;
