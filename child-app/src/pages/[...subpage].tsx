import { useRouter } from "next/router";

const LogParams = () => {
  const router = useRouter();

  console.log(router);

  return (
    <div>
      Page in child app
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
    </div>
  );
};

export default LogParams;
