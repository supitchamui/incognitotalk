import Image from "next/image";
const Chats = () => {
  return (
    <div className="bg-bgColor w-1/3 border-r border-borderColor">
      <div className="h-28 w-full border-b border-borderColor items-center flex justify-center">
        <div className="w-4/5">
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white"
            placeholder="Search"
            name="search_user"
          />
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
        <div className="font-roboto ml-6">
          <p className="text-white text-xl">Someone</p>
          <p className="text-fontBgColor text-base mt-2">Past Message</p>
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
        <div className="font-roboto ml-6">
          <p className="text-white text-xl">Someone</p>
          <p className="text-fontBgColor text-base mt-2">Past Message</p>
        </div>
      </div>
    </div>
  );
};
export default Chats;
