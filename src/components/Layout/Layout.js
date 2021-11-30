import "./Layout.css";
import Bar from "../Bar/Bar";
const Layout = ({ children }) => {
  return (
    <>
      <Bar />
      <div className="Layout">{children}</div>
    </>
  );
};
export default Layout;
