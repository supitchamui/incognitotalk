import Chats from "./list-chat";
import Friends from "./list-friend";
import Groups from "./list-group";
import SidebarMenu from "./sidebar-menu";
import { useState } from "react";

const Sidebar = () => {
  const [currentPage, setPage] = useState("all-chats");

  return (
    <>
      <SidebarMenu setPage={setPage} />{" "}
      {(() => {
        switch (currentPage) {
          case "friends":
            return <Friends />;
          case "groups":
            return <Groups />;
          case "all-chats":
            return <Chats />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Sidebar;
