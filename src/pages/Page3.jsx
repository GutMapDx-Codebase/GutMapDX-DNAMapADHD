import { useContext } from "react";
import GeneResultCard from "../components/GeneResultCard";
import { GlobalDataContext } from "../context/GlobalDataContext";
import { chunkItems, getSections } from "../utils/reportPages";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Page3 = () => {
  const { style, dnaCategories, kitid, result, Kittype } = useContext(GlobalDataContext);
    console.log("Page3 - style:", style);

  const sections = getSections(dnaCategories);
  const primaryColor = style?.primaryColor ?? "#006e5e";
  const secondaryColor = style?.secondaryColor ?? "#006e5e";
  const headerBg = style?.secondaryColor ? `${style.primaryColor}1A` : "rgba(0,110,94,0.15)";
  const totalPages = 2 + sections.reduce(
    (total, section) => total + Math.max(1, Math.ceil(section.collection.length / 2)),
    0,
  );
  let reportPageNumber = 3;

  return sections.map((section, sectionIndex) => {
    const pages = chunkItems(section.collection);
    const sectionPages = pages.length > 0 ? pages : [[]];

    return sectionPages.map((genes, pageIndex) => {
      const page = reportPageNumber++;

      return (
        <section
          key={`${section?.name ?? "section"}-${sectionIndex}-${pageIndex}`}
          className="flex h-[297mm] w-[210mm] items-center justify-center bg-gray-100"
        >
          <div
            className="relative h-[297mm] w-[210mm] overflow-hidden border-[0.35mm] border-[#1f1f1f] bg-white px-[16px] pb-[60px] pt-[178px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <div className="absolute inset-x-0 top-0 z-20">
              <Header section={`Section ${sectionIndex + 1}`} logo={style?.imageBase64} color={primaryColor} bg={headerBg} title={Kittype} />
            </div>

            {pageIndex === 0 && (
              <div className="absolute left-0 right-0 top-[115px] z-10 flex justify-center">
                <div
                  className="px-8 py-1 text-[17px] rounded-full"
                  style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                >
                  Section {sectionIndex + 1}
                </div>
              </div>
            )}
            <header
              className={`mt-0 absolute left-1/2 -translate-x-1/2 ${pageIndex === 0 ? "top-[160px]" : "top-[116px]"} z-10 flex h-[45px] items-center px-[40px] rounded-full w-fit whitespace-nowrap`}
              style={{
                background: headerBg,
              }}
            >
              <h1 className="text-[16px] font-bold leading-tight" style={{ color: primaryColor }}>
                {section?.name ?? "Untitled section"}
              </h1>
            </header>

            <div className={`flex flex-col gap-5 ${pageIndex === 0 ? "mt-[40px]" : "mt-2"}`}>
              {genes.map((gene, geneIndex) => (
                <GeneResultCard key={`${gene?.Gene ?? "gene"}-${geneIndex}`} gene={gene} result={result.slice(-1)} accentColor={primaryColor} />
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20">
              <Footer sampleId={kitid} page={page} totalPages={totalPages} color={secondaryColor} bg={headerBg} />
            </div>
          </div>
        </section>
      );
    });
  });
};

export default Page3;
