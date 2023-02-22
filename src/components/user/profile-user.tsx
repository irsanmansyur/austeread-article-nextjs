import { AppInterface } from "@/commons/interface/app";
import Image from "next/image";
import { BsPencilFill } from "react-icons/bs/index";
import ChangePassword from "./change-password";

type Props = {
  user: AppInterface.User;
};
export default function ProfileUser({ user }: Props) {
  return (
    <>
      <div className="profile flex flex-col gap-3 items-center">
        <div className="relative">
          <Image width={100} height={100} alt="profil user" src="" className="!h-[100px] !w-[100px] rounded-full bg-white backdrop-blur border" />
          <label
            htmlFor="changeImage"
            className="absolute right-[-7px] top-[60px] cursor-pointer flex w-[35px] h-[35px] items-center justify-center rounded-full bg-black text-white"
          >
            <BsPencilFill />
          </label>
          <input type="file" id="changeImage" className="hidden" />
        </div>

        <div>
          <span className="font-Garnett-Light">You are logged in as</span> <span className="font-bold">{user.fullname} </span> <br />
        </div>
        <button className="text-primary-others">Sign out</button>
      </div>
      <div className="cradential">
        <h3 className="text-center font-bold pb-4">Cradentials</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs">Email</p>
            <span className="text-sm">ranti@gmail.com</span>
          </div>
          <div>
            <p className="text-xs">Password</p>
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
}
