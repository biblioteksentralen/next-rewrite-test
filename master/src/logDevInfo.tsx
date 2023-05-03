import { useEffect } from "react";

const commitMessage =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE;

function logVercelInfo() {
  console.info(
    "%c🌐 Libry Content version: ",
    "color: blue",
    commitMessage
  );
}

export const useLogDevInfo = () => {
  useEffect(() => {
    logVercelInfo();
  }, []);
};
