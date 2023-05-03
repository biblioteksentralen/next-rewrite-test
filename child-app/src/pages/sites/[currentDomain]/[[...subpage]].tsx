import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

//@ts-ignore
const Header = dynamic(() => import("master/Header"), {
  ssr: false,
  loading: () => <>Laster..</>,
});

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

  console.log("router.query", router.query);

  return (
    <div>
      <Header />
      <h1>Page in child app</h1>
      <h2>Router</h2>
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
      <h2>Props</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default LogParams;
