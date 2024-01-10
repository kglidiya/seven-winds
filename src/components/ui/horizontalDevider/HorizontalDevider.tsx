import "./HorizontalDevider.scss";

interface IHorizontalDevider {
  left: number;
  width: number;
}

export const HorizontalDevider = ({ left, width }: IHorizontalDevider) => {
  return <span className={"line"} style={{ left: `${left}px`, width: `${width}px` }}></span>;
};
