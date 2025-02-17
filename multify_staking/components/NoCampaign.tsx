import { useRouter } from "next/router";
import { FC, useCallback } from "react";

const NoCampaign: FC = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("giveaway/add");
  }, []);

  return (
    <div className="md:h-[40vh] lg:h-[70vh] flex flex-col items-center justify-center">
      <div className="mb-[48px] text-2xl text-center">
        You don't have any giveaways at the moment
      </div>

      <button
        className="text-lg buttonPrimary px-[113px] py-[18px] business-step6"
        onClick={handleClick}
      >
        Create giveaway
      </button>
    </div>
  );
};

export default NoCampaign;