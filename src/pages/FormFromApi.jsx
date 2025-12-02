// FormFromApi.tsx
import { useEffect, useState } from "react";

export function FormFromApi() {
  const [formHtml, setFormHtml] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/form")
      .then((res) => res.text())
      .then((html) => setFormHtml(html))
      .catch((err) => {
        console.error("Error fetching form:", err);
      });
  }, []);

  if (!formHtml) return <p>Loading form...</p>;

  return (
    <div dangerouslySetInnerHTML={{ __html: formHtml }} />
  );
}
