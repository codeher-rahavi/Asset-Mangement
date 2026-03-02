import { Fragment, useState } from "react";
import ComSidebar from "../../components/sidebar/compressed";
import SideBar from "../../components/sidebar/sidebar";

const BuildingOverView = () => {

  const [sidebar, setSidebar] = useState(true);

  return (
    <Fragment>
      {
        sidebar ? <SideBar /> : <ComSidebar />
      }
    </Fragment>
  );
};

export default BuildingOverView;