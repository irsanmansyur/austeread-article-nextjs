import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { BsArrowDownShort } from "react-icons/bs";
import { useAuth } from "@/contexts/auth";
import { AppInterface } from "@/commons/interface/app";

export default function NavbarAccount() {
  const { user } = useAuth();
  return (
    <>
      {!user ? (
        <Link href={"/auth/login"} className="font-bold">
          Sign in
        </Link>
      ) : (
        <DropdownAcount user={user} />
      )}
    </>
  );
}

const DropdownAcount = ({ user }: { user: AppInterface.User }) => {
  const { logout } = useAuth();

  const htmlRef = useRef<HTMLDivElement>(null);
  const [dropdwonActive, setDropdwonActive] = useState(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // @ts-ignore
      if (htmlRef.current && !htmlRef.current.contains(event.target)) {
        setDropdwonActive(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const DropDown = () => {
    return (
      <div className="position absolute mt-3 left-1/2 -translate-x-1/2 border bg-white shadow z-10 rounded">
        <div className="flex flex-col">
          <Link href={"/user/account"} className="hover:bg-gray-200 py-2 px-4 text-sm whitespace-nowrap">
            Manage Profile
          </Link>
          <Link href={"d"} className="bg-gray-normal  py-2 px-4 text-sm whitespace-nowrap">
            Manage Newsletter
          </Link>
          <hr className="my-2" />
          <button
            className="hover:bg-gray-200 py-2 px-4 text-sm"
            onClick={(e) => {
              logout();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="relative font-normal" ref={htmlRef}>
      <div className="flex  items-center gap-3 cursor-pointer" onClick={() => setDropdwonActive(!dropdwonActive)}>
        <span>Account</span>
        <BsArrowDownShort className={`${dropdwonActive ? "rotate-180" : "rotate-0"}`} />
      </div>
      {dropdwonActive && <DropDown />}
    </div>
  );
};
