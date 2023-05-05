import { useEffect } from "react";

const version = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

const commitMessage = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE;

function logVercelInfo() {
  console.info("%c🌐 Parent app: ", "color: blue", commitMessage, version);
}

export const useLogDevInfo = () => {
  useEffect(() => {
    logVercelInfo();
  }, []);
};
