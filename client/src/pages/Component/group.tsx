import hashString from "@/utils/hashString";
import Image from "next/image";

interface Group {
  groupName: string;
  people: number;
}
interface GroupItemProps {
  onGroupClick: (groupName: string, isPrivate: boolean) => void;
  group: Group;
  selectedGroup: string;
}

const GroupItem: React.FC<GroupItemProps> = ({
  onGroupClick,
  group,
  selectedGroup,
}) => {
  return (
    <div
      className={`h-28 w-full cursor-pointer  border-b border-borderColor items-center flex ${
        group.groupName === selectedGroup ? "bg-purple bg-opacity-40" : ""
      }`}
      onClick={() => {
        onGroupClick(group.groupName, false);
        console.log(group.groupName);
      }}
    >
      <Image
        src={`/G${
          group.groupName ? hashString(group.groupName as string) % 9 : 0
        }.png`}
        alt=""
        width={75}
        height={50}
        className="ml-6"
      ></Image>
      <div className="font-roboto ml-6">
        <p
          className={`text-white text-xl ${
            group.groupName === selectedGroup ? "font-bold" : ""
          }`}
        >
          {`${group.groupName} (${group.people})`}
        </p>
      </div>
    </div>
  );
};

export default GroupItem;
