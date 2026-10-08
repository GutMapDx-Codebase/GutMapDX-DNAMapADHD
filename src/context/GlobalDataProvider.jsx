import { GlobalDataContext } from "./GlobalDataContext.js";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const GlobalDataProvider = ({ children }) => {
  const { id } = useParams();
  const [globalData, setGlobalData] = useState(null);
  const [geneColors, setGeneColors] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  const registerGeneColor = useCallback((gene, recommendationColor) => {
    setGeneColors((prev) => {
      const exists = prev.some((entry) => entry.gene === gene);
      if (exists) {
        return prev.map((entry) =>
          entry.gene === gene ? { gene, recommendationColor } : entry
        );
      }
      return [...prev, { gene, recommendationColor }];
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {

        const url = new URL(window.location.href);
        const generate = url.searchParams.get("generate");

        let reportData = JSON.stringify({
          _id: id,
          generate: true,
        });

        let reportConfig = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_BASE_URL}/viewreportdata`,
          headers: {
            "Content-Type": "application/json",
          },
          data: reportData,
        };

        const reportResponse = await axios.request(reportConfig);
        let data = reportResponse.data;


        let reportData2 = JSON.stringify({
          kitId: id,
        });

        let styleConfig = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_BASE_URL}/getReportStyleByKit`,
          headers: {
            "Content-Type": "application/json",
          },
          data: reportData2,
        };

        const styleResponse = await axios.request(styleConfig);

        let dnaCategoryData = JSON.stringify({
          reportName: data?.Kittype,
        });

        const dnaCategoryResponse = await axios.request({
          method: "post",
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_API_BASE_URL}/getcategory`,
          headers: {
            "Content-Type": "application/json",
          },
          data: dnaCategoryData,
        });

        setGlobalData({
          ...data,
          style: styleResponse.data?.style,
          dnaCategories: dnaCategoryResponse.data,
          KitId: id,
        });

      } catch (error) {
        console.error("Error fetching global data:", error);
      }
    };

    getData();
  }, [id]);

  return (
    <GlobalDataContext.Provider value={{ ...globalData, geneColors, registerGeneColor, totalPages, setTotalPages }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
