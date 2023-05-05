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
      <h1>Page in parent app</h1>
      <a href="/child">Visit child app</a>
      <h2>Query from router</h2>
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
      <h2>Params from getStaticProps</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <h2>Im really hosted on</h2>
      <p>{process.env.NEXT_PUBLIC_VERCEL_URL}</p>
    </div>
  );
};

export default LogParams;
