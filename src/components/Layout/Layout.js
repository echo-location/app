import "./Layout.css";
import Bar from "../Bar/Bar";
const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Bar />
      <div className="layout-children">{children}</div>
    </div>
  );
};
export default Layout;
