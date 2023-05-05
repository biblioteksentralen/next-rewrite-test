import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params;

  return {
    props: { params },
    revalidate: 15,
  };
};

const LogParams = (props: any) => {
  const router = useRouter();

  return (
    <div>
      <h1>Page in child app 1</h1>
      <h2>Query from router</h2>
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
      <h2>Params from getStaticProps</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default LogParams;
