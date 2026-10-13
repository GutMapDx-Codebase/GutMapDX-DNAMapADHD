import TitlePage from "./pages/TitlePage";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import ReferencesPage from "./pages/ReferencesPage";
import { useContext } from "react";
import { GlobalDataContext } from "./context/GlobalDataContext";


const Report = () => {
  const { Kittype } = useContext(GlobalDataContext);


  return <>
    <TitlePage />

    <Page2 />
    <Page3 />

    {Kittype === "DNAMap Sports, Exercise & Nutrition" && <ReferencesPage />}
  </>
};

export default Report;
