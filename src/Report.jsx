import TitlePage from "./pages/TitlePage";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import { useContext } from "react";
import { GlobalDataContext } from "./context/GlobalDataContext";


const Report = () => {
  const { Kittype } = useContext(GlobalDataContext);
  console.log(Kittype);

  return <>
    <TitlePage />

    <Page2 />
    <Page3 />
  </>
};

export default Report;
