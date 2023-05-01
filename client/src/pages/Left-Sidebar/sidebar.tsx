import React, { useState } from "react";
import Chats from "./list-chat";
import Friends from "./list-friend";
import Groups from "./list-group";
import SidebarMenu from "./sidebar-menu";

interface SidebarProps {
  onGroupClick: (groupName: string) => void; // Update the type of onGroupClick
  selectedGroup: string;
  isPrivate: (isPrivate: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onGroupClick,
  selectedGroup,
  isPrivate,
}) => {
  const [currentPage, setPage] = useState("all-chats");

  return (
    <>
      <SidebarMenu setPage={setPage} currentPage={currentPage} />
      {(() => {
        switch (currentPage) {
          case "friends":
            isPrivate(true);
            return <Friends onGroupClick={onGroupClick} />;
          case "groups":
            return (
              <Groups
                onGroupClick={onGroupClick}
                selectedGroup={selectedGroup}
              />
            );
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
