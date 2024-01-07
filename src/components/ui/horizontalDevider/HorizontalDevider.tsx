import "./HorizontalDevider.scss";

interface IHorizontalDevider {
  left: number;
}

export const HorizontalDevider = ({ left }: IHorizontalDevider) => {
  return <span className={"line"} style={{ left: `${left}px` }}></span>;
};
