import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/authcontext";
import AuthModal from "../AuthPanel/AuthModal";

function StartEarning() {
  const [open, setOpen] = useState<boolean>(false);
  const { user, authModal: { whichAuth, setWhichAuth } } = useAuth();
  const handleAuth = () => {
    setOpen(true);
    setWhichAuth('');
  }
  return (
    <section className="flex justify-between w-full px-5 py-24">
      <div className="bg-[url('/Marketing/imgs/bg-gifts.png')] bg-no-repeat bg-bottom bg-contain text-center border border-teal rounded-lg p-6 md:p-16 py-20 md:py-21 mx-auto w-full max-w-6xl">
        <h4 className="text-white text-xl md:text-3xl pb-5">Start earning rewards today!</h4>
        <p className="text-base text-gray w-80 mx-auto">Your first reward is waiting for you after profile completion!</p>
        {user.email ? (
          <div className="mt-5">
            <Link href="/giveaways" className="buttonPrimary">View Giveaways</Link>
          </div>
        ) : (
          <button className="buttonPrimary" onClick={handleAuth}>Join now and get rewarded!</button>
        )}

      </div>
      <AuthModal setOpen={setOpen} open={open} />
    </section>
  )
}

export default StartEarning