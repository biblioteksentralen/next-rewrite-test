import { LayoutProps } from "../../../../../.next/types/app/layout";

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <h1>Layout</h1>
      <h2>Layout params</h2>
      <pre>{decodeURIComponent(JSON.stringify(props.params, null, 2))}</pre>
      {props.children}
    </div>
  );
};

export default Layout;
