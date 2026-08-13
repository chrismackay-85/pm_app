import { DataDictionaryView } from "@/components/notes/DataDictionaryView";

export default function DataDictionaryPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-h4 text-dark-primary">Data Dictionary</h1>
      <DataDictionaryView />
    </div>
  );
}
