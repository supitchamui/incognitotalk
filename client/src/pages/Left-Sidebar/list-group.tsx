import Image from "next/image";

const Groups = () => {
  return (
    <div className="bg-bgColor w-1/3 border-r border-borderColor">
      <div className="h-35 w-full border-b border-borderColor items-center flex justify-center flex-col">
        <div className="w-4/5">
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white mt-4"
            placeholder="Search"
            name="search_user"
          />
        </div>
        <div className="w-11/12 items-center flex justify-center">
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white mt-3 mb-4"
            placeholder="Enter Group Name"
            name="group_name"
          />
          <button
            type="button"
            name="all-chats"
            className="w-20 h-12 rounded-xl text-white ml-2 bg-purple"
          >
            Create
          </button>
        </div>
      </div>
      <div className="h-28 w-full border-b border-borderColor items-center flex cursor-pointer">
        <Image
          src="/Frame_8.png"
          alt=""
          width={75}
          height={50}
          className="ml-6"
        ></Image>
        <div className="font-roboto ml-6 flex">
          <p className="text-white text-xl mr-2">Someone</p>
          <p className="text-fontBgColor text-base mt-0.5 text-purple">(1)</p>
        </div>
      </div>
    </div>
  );
};

export default Groups;
