import { ReactNode } from "react";
import Navbar from "../navbar/Navbar";
import "./Layout.scss";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <main className="main">
      <Navbar />
      {children}
    </main>
  );
}
