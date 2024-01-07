import "./VerticalLine.scss";

interface IVerticalLine {
  height: number;
}

export const VerticalLine = ({ height }: IVerticalLine) => {
  return (
    <span className={"verticalLine"} style={{ height: `${height}px` }}></span>
  );
};
