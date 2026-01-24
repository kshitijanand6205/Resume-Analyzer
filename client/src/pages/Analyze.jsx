import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResultCard from "../components/ResultCard";
import "../App.css";

export default function Analyze() {
  const [result, setResult] = useState(null);

  return (
    <div className="analyze-container">
      <div className="analyze-card">
        <ResumeForm onResult={setResult} />
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}