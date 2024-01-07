import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/main/Main";
import { entityList } from "./utils/constants";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";

const App = () => {
  // console.log('toJS(entityStore.entity)')
  return (
    <Router>
      <Header />
      <Layout children={<Main entity={entityList} />} />
    </Router>
  );
};

export default App;
