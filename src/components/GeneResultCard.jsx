import { useContext, useEffect } from "react";
import { getGeneOutcome } from "../utils/geneticResults";
import { GlobalDataContext } from "../context/GlobalDataContext";

// background / text are the original colours. tint (light fill) and edge (outline)
// are used for the recommendation panel and the Result tile border.
const STATUS_STYLES = {
  green: { background: "#a8e8c7", text: "#075b3c", tint: "#edfaf3", edge: "#8fd3b1" },
  amber: { background: "#f0eb91", text: "#6b5f00", tint: "#fcfadf", edge: "#d9d170" },
  red: { background: "#e9a0ad", text: "#850016", tint: "#fceef0", edge: "#d98593" },
  unavailable: { background: "#e7e4e9", text: "#5f5865", tint: "#f5f4f7", edge: "#cfcbd6" },
};

const getStatusStyle = (status) => STATUS_STYLES[status] ?? STATUS_STYLES.unavailable;

const getSnps = (gene) => {
  if (Array.isArray(gene?.snps) && gene.snps.length > 0) return gene.snps;
  return [{ "Key SNPs": gene?.["Key SNPs"] }];
};

const LINE = "#e3dcef";

// Small tile with a label on top (Gene / Key SNP / Result)
const Tile = ({ label, labelColor, className = "", style, children }) => (
  <div
    className={`flex min-h-[60px] flex-col justify-center rounded-[14px] border bg-white px-[14px] py-2 ${className}`}
    style={{ borderColor: LINE, ...style }}
  >
    <div
      className="mb-[3px] text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: labelColor }}
    >
      {label}
    </div>
    {children}
  </div>
);

// White panel with a bold heading and a thin line under it
const Panel = ({ title, headingColor = "#2b1f4a", borderColor = LINE, style, children }) => (
  <section
    className="rounded-[14px] border bg-white px-[15px] pb-3 pt-[10px]"
    style={{ borderColor, ...style }}
  >
    <h4
      className="mb-[7px] border-b pb-1.5 text-[14px] font-bold leading-snug"
      style={{ color: headingColor, borderColor }}
    >
      {title}
    </h4>
    {children}
  </section>
);

const GeneResultCard = ({ gene, result, accentColor = "#006e5e" }) => {
  const { registerGeneColor } = useContext(GlobalDataContext);

  const snps = getSnps(gene);
  const { outcomes, status, recommendations } = getGeneOutcome(snps, result, gene?.scoring);
  const statusStyle = getStatusStyle(status);
  const relevance = gene?.["Function / ADHD Relevance"] ?? gene?.Function ?? "—";
  const explanation =
    gene?.["Generic Explanation (Lay-readable, ADHD-specific)"] ??
    gene?.description ??
    "—";

  useEffect(() => {
    if (gene?.Gene) {
      registerGeneColor(gene.Gene, statusStyle.background);
    }
  }, [gene?.Gene, statusStyle.background, registerGeneColor]);

  return (
    <article
      className="flex break-inside-avoid flex-col gap-[9px] rounded-[20px] border p-[11px] text-[#1e1e20]"
      style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}0d` }}
    >
      {/* Tiles: Gene | Key SNP | Result */}
      <div className="grid grid-cols-[0.9fr_1.2fr_1fr] gap-[9px]">
        <Tile label="Gene" labelColor={accentColor}>
          <div className="text-[22px] font-bold leading-[1.1] text-[#2b1f4a]">{gene?.Gene ?? "—"}</div>
        </Tile>

        <Tile label="Key SNP" labelColor={accentColor}>
          <div className="flex flex-col gap-1.5">
            {outcomes.map((outcome, index) => (
              <div key={`${outcome.key}-${index}-snp`} className="flex h-[30px] items-center">
                <span
                  className="inline-block whitespace-nowrap rounded-md border-2 bg-white px-[9px] py-[3px] font-mono text-[14.5px] font-extrabold leading-tight tracking-[0.02em]"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {outcome.label}
                </span>
              </div>
            ))}
          </div>
        </Tile>

        <Tile
          label="Result"
          labelColor={statusStyle.text}
          style={{ backgroundColor: statusStyle.background, borderColor: statusStyle.edge }}
        >
          <div className="flex flex-col gap-1.5">
            {outcomes.map((outcome, index) => {
              const outcomeStyle = getStatusStyle(outcome.status);
              return (
                <div key={`${outcome.key}-${index}-result`} className="flex h-[30px] items-center">
                  {/* Same colour as the tile for most genes. If one SNP of a multi-SNP gene
                      has a different status, its own colour shows up here. */}
                  <span
                    className="-ml-3 inline-flex h-[28px] items-center rounded-full pl-3 pr-4 text-[23px] font-extrabold leading-none tracking-[0.1em]"
                    style={{ backgroundColor: outcomeStyle.background, color: outcomeStyle.text }}
                  >
                    {outcome.genotype}
                  </span>
                </div>
              );
            })}
          </div>
        </Tile>
      </div>

      {/* Relevance | What this means */}
      <div className="grid grid-cols-2 gap-[9px]">
        <Panel title="Relevance">
          <p className="text-[11px] leading-[1.5]">{relevance}</p>
        </Panel>
        <Panel title="What this means">
          <p className="text-[11px] leading-[1.5] text-[#4a5470]">{explanation}</p>
        </Panel>
      </div>

      {/* Recommendation, tinted with the gene status */}
      <Panel
        title="Recommendation"
        headingColor={statusStyle.text}
        borderColor={statusStyle.edge}
        style={{ backgroundColor: statusStyle.tint }}
      >
        <div className="space-y-1 text-[11px] leading-[1.5]">
          {recommendations.map((recommendation, index) => (
            <p key={`${recommendation}-${index}`}>{recommendation}</p>
          ))}
        </div>
      </Panel>
    </article>
  );
};

export default GeneResultCard;
