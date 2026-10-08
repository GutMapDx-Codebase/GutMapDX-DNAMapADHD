import react from "react";
import { useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";



// const references = [
//   {
//     number: 1,
//     reference: "Ahmetov, I.I. and Fedotovskaya, O.N. (2015). Current Progress in Genetics of Elite Athletic Performance. Annual Review of Genomics and Human Genetics, 16(1), pp.341–360."
//   },
//   {
//     number: 2,
//     reference: "Eynon, N. et al. (2013). ACTN3 R577X Polymorphism and Degree of Maximal Cancer-Related Fatigue. Medicine & Science in Sports & Exercise, 45(9)."
//   },
//   {
//     number: 3,
//     reference: "Guth, L.M. and Roth, S.M. (2013). Genetic variation and skeletal muscle phenotypes. Exercise and Sport Sciences Reviews, 41(1), pp.32–41."
//   },
//   {
//     number: 4,
//     reference: "Puthucheary, Z., Montgomery, H. and Edge, J. (2011). The ACE gene and human performance: 12 years on. Sports Medicine, 41(6), pp.433–448."
//   },
//   {
//     number: 5,
//     reference: "Rivera, M.A. et al. (1998). The low-response to endurance training is partly determined by genetic variation. Journal of Applied Physiology."
//   },
//   {
//     number: 6,
//     reference: "Collins, M. and Posthumus, M. (2011). The genetics of ligament and tendon injuries. Clinics in Sports Medicine, 30(2), pp.351–360."
//   },
//   {
//     number: 7,
//     reference: "Khoschnau, S. et al. (2008). Type I collagen alpha 1 Sp1 polymorphism and the risk of cruciate ligament rupture. The American Journal of Sports Medicine, 36(12)."
//   },
//   {
//     number: 8,
//     reference: "Mokone, G.G. et al. (2006). The COL5A1 gene and Achilles tendon pathology. Scandinavian Journal of Medicine & Science in Sports, 16(1), pp.19–26."
//   },
//   {
//     number: 9,
//     reference: "Posthumus, M. et al. (2009). The COL5A1 gene is associated with increased risk of anterior cruciate ligament ruptures. American Journal of Sports Medicine, 37(11)."
//   },
//   {
//     number: 10,
//     reference: "Dierkes, J., Luley, C. and Westphal, S. (2004). The MTHFR 677C>T polymorphism and its impact on homocysteine and folate. Journal of Nutrition, 134(8)."
//   },
//   {
//     number: 11,
//     reference: "Heled, Y. et al. (2012). The IL-6 -174G/C polymorphism and its effect on recovery from exercise. Journal of Applied Physiology, 112(2)."
//   },
//   {
//     number: 12,
//     reference: "Nieman, D.C. (2009). Genetic variation and inflammation in response to exercise. Current Sports Medicine Reports, 8(3), pp.115–120."
//   },
//   {
//     number: 13,
//     reference: "Bastaki, M. et al. (2002). Genotype-activity relationships for MnSOD and GSTP1. Pharmacogenetics."
//   },
//   {
//     number: 14,
//     reference: "Corella, D. and Ordovás, J.M. (2012). Nutrition and health: a new perspective through genetics. Nutricion Hospitalaria, 27(2), pp.366–387."
//   },
//   {
//     number: 15,
//     reference: "Loos, R.J. and Yeo, G.S. (2014). The bigger picture of FTO: the first GWAS-identified obesity gene. Nature Reviews Endocrinology, 10(1), pp.51–61."
//   },
//   {
//     number: 16,
//     reference: "Tanaka, T. et al. (2009). Genome-wide association study of vitamin B12, vitamin B6, and folate. The American Journal of Human Genetics, 84(4)."
//   },
//   {
//     number: 17,
//     reference: "Lindner, I. et al. (2001). BCMO1 gene and the conversion of beta-carotene to Vitamin A. Journal of Biological Chemistry."
//   },
//   {
//     number: 18,
//     reference: "El-Sohemy, A. et al. (2007). Nutrigenomics of Vitamin D and bone mineral density. Journal of Nutrigenetics."
//   },
//   {
//     number: 19,
//     reference: "Allebrandt, K.V. and Roenneberg, T. (2008). The genetics of human chronotypes. Ethology, 114(11), pp.1031–1043."
//   },
//   {
//     number: 20,
//     reference: "Viola, A.U. et al. (2007). PER3 polymorphism predicts sleep structure and cognitive performance. Current Biology."
//   },
//   {
//     number: 21,
//     reference: "Guest, N. et al. (2018). Caffeine, CYP1A2 Genotype, and Endurance Performance in Athletes. Medicine & Science in Sports & Exercise, 50(8)."
//   },
//   {
//     number: 22,
//     reference: "Stein, D.J. et al. (2006). Genetic polymorphisms and response to stressors: the role of the COMT gene. Psychopharmacology, 187(3), pp.261–268."
//   }
// ];


const ReferencesPage = () => {
    const { style, dnaCategories, kitid, result, Kittype, totalPages } = useContext(GlobalDataContext);

    const [references, setReferences] = useState(null);
    useEffect(() => {
        setReferences(dnaCategories?.data?.references)
    }, [dnaCategories])

    console.log(references)



    const headerBg = style?.headerBackground;
    const primaryColor = style?.primaryColor;
    const secondaryColor = style?.secondaryColor;


    return (

        <section
          className="flex h-[297mm] w-[210mm] items-center justify-center bg-gray-100"
        >
          <div
            className="relative h-[297mm] w-[210mm] overflow-hidden border-[0.35mm] border-[#1f1f1f] bg-white px-[16px] pb-[60px] pt-[178px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <div className="absolute inset-x-0 top-0 z-20">
              <Header section={""} logo={style?.imageBase64} color={primaryColor} bg={headerBg} title={Kittype} />
            </div>


              <div className="absolute left-0 right-0 top-[115px] z-10 flex justify-center">
                <div
                  className="px-8 py-1 text-[17px] rounded-full"
                  style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                >
                  References
                </div>
              </div>
            
            <header
              className={`mt-0 absolute left-1/2 -translate-x-1/2 top-[160px] z-10 flex h-[45px] items-center px-[40px] rounded-full w-fit whitespace-nowrap`}
              style={{
                background: headerBg,
              }}
            >
              {/* <h1 className="text-[16px] font-bold leading-tight" style={{ color: primaryColor }}>
                References
              </h1> */}
            </header>

            <div>
                {
                    Array.isArray(references) &&
                    references.map((item) => {
                        return (
                            <div key={item.number} className="flex gap-2 mb-1 text-[11px]">
                                <p className="font-bold">
                                    {item.number}.
                                </p>
                                <p>
                                    {item.reference}
                                </p>
                            </div>
                        )
                    })
                }
            </div>



            <div className="absolute inset-x-0 bottom-0 z-20">
              <Footer sampleId={kitid} page={totalPages} totalPages={totalPages} color={secondaryColor} bg={headerBg} />
            </div>
          </div>
        </section>
    );
};

export default ReferencesPage;