import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
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
  const entityStore = useContext(Context).entity;

  useEffect(() => {
    entityStore.getEntity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    entityStore.getTreeStructure();
  }, [entityStore, entityStore.entity]);
 
  return (
    <section className="rows">
      <div className="rows__header">
        <h3 className="rows__title">{entity.title}</h3>
        <ul className="rows__columns">
          {entity.columns.map((column, i: number) => {
            return (
              <li
                key={i}
                className="rows__column"
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
      <Entity rows={entityStore.entity}/>
    </section>
  );
});
export default Main;
