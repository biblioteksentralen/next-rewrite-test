import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: "blocking" });

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params;

  return {
    props: { params },
    revalidate: 15,
  };
};

const LogParams = (props) => {
  const router = useRouter();

  console.log({router, props});

  return (
    <div>
      Page in child app
      <pre>{JSON.stringify(router.query, null, 2)}</pre>
    </div>
  );
};

export default LogParams;
