"use client";
import { useParams } from "next/navigation";
import { PageProps } from "../../../../../.next/types/app/layout";

const LogParams = (props: PageProps) => {
  const params = useParams();

  return (
    <div>
      <h1>Page in child app 1</h1>
      <h2>Page props</h2>
      <pre>{decodeURIComponent(JSON.stringify(props, null, 2))}</pre>
      <h2>Router props</h2>
      <pre>
        {decodeURIComponent(JSON.stringify({ params }, null, 2))}
      </pre>
    </div>
  );
};

export default LogParams;
