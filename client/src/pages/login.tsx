import Image from "next/image";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col items-center bg-bgColor w-screen h-screen justify-center">
      <Image src="/logo.png" alt="" width={400} height={200}></Image>
      <form className="w-1/4 mt-10 flex flex-row">
        <input
          type="text"
          className="w-full h-16 rounded-2xl bg-borderColor pl-5 text-white"
          placeholder="Enter your name"
          name="username"
        />
        <button
          type="button"
          className="w-16 h-16 bg-purple rounded-full ml-5"
          name="Go"
          onClick={() => {
            router.push("/home");
          }}
        >
          Go
        </button>
      </form>
    </div>
  );
};
export default Login;
