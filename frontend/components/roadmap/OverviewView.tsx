import { overview } from "@/lib/overviewContent";
import { TableShell, tableRowClassName } from "@/components/ui/TableShell";

const glanceColumns = [
  { key: "num", label: "#" },
  { key: "phase", label: "Phase" },
  { key: "whatHappens", label: "What Happens" },
];

const stageColumns = [
  { key: "num", label: "#" },
  { key: "phase", label: "Phase" },
  { key: "description", label: "Description" },
  { key: "keyDeliverables", label: "Key Deliverables" },
  { key: "exitCriteria", label: "Exit Criteria" },
];

export function OverviewView() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-h3 text-dark-primary">{overview.title}</h1>
        <p className="mt-1 text-body-3 text-dark-primary/60">{overview.subtitle}</p>
      </div>

      <section>
        <h2 className="mb-2 text-h5 text-dark-primary">Executive Summary</h2>
        <p className="text-body-2 text-dark-primary/80">{overview.execSummary}</p>
      </section>

      <section>
        <h2 className="mb-3 text-h5 text-dark-primary">Roadmap at a Glance</h2>
        <TableShell columns={glanceColumns}>
          {overview.glance.map((row, index) => (
            <tr key={row.num} className={tableRowClassName(index)}>
              <td className="px-4 py-3 align-top">{row.num}</td>
              <td className="px-4 py-3 align-top font-medium">{row.phase}</td>
              <td className="px-4 py-3 align-top">{row.whatHappens}</td>
            </tr>
          ))}
        </TableShell>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-h5 text-dark-primary">Phase Detail by Stage</h2>
        {overview.stages.map((stage) => (
          <div key={stage.name}>
            <h3 className="mb-2 text-body-1 font-medium text-dark-primary">{stage.name}</h3>
            <TableShell columns={stageColumns}>
              {stage.phases.map((row, index) => (
                <tr key={row.num} className={tableRowClassName(index)}>
                  <td className="px-4 py-3 align-top">{row.num}</td>
                  <td className="px-4 py-3 align-top font-medium">{row.phase}</td>
                  <td className="px-4 py-3 align-top">{row.description}</td>
                  <td className="px-4 py-3 align-top">{row.keyDeliverables}</td>
                  <td className="px-4 py-3 align-top">{row.exitCriteria}</td>
                </tr>
              ))}
            </TableShell>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-h5 text-dark-primary">Risks to Watch</h2>
        <ul className="flex flex-col gap-2">
          {overview.risks.map((risk) => (
            <li
              key={risk}
              className="rounded-card bg-white p-3 text-body-3 text-dark-primary/80 shadow-brand"
            >
              {risk}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-card bg-gradient-brand p-5 text-body-2 text-white shadow-brand">
        <p className="mb-1 text-overline text-white/80">Suggested Next Step</p>
        {overview.nextStep}
      </section>
    </div>
  );
}
