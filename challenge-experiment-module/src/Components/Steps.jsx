import { GoArrowUpRight } from "react-icons/go";

const Steps = () => {
  return (
    <div className="">
      <div className="max-w-7xl px-4 xl:px-0 py-10  lg:pb-20 mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            How to Launch Your Campaign on Lomi
          </h2>
          <p className="mt-1 text-neutral-400">
            Follow these straightforward steps to create and manage your
            campaign. From conceptualizing your idea to launching and tracking
            its success, Lomi makes it simple and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <img
              className="w-full object-cover rounded-xl lg:h-[600px]"
              src="https://media.istockphoto.com/id/874231466/photo/young-adult-woman-walking-up-the-stairs-with-sun-sport-background.jpg?s=612x612&w=0&k=20&c=6d2vtrEvMhXNSh8TFR5hVhW_A2ZKjvOhWQhg-yLW_wk="
              alt="Campaign Creation"
            />
          </div>
          <div>
            <div className="mb-4">
              <h3 className="text-lime-400 text-xs font-medium uppercase">
                Steps
              </h3>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    1
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-white">Define Your Vision:</span>{" "}
                  Clearly outline your campaign goals and what you want to
                  achieve. Craft a compelling story that resonates with
                  potential backers.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    2
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-white">Set Up Your Campaign:</span>{" "}
                  Create your campaign page on Lomi, including details like
                  funding goals, rewards, and timelines. Upload visuals and
                  provide compelling content to attract backers.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    3
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-white">Promote Your Campaign:</span>{" "}
                  Share your campaign across social media, engage with your
                  community, and use marketing strategies to drive traffic and
                  attract backers.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    4
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-white">Track and Engage:</span> Monitor
                  your campaign’s progress, interact with backers, and keep them
                  updated on milestones and achievements.
                </p>
              </div>
            </div>
            <div className="flex justify-start z-50 md:mt-5">
              <a
                className="group inline-flex items-center bg-lime-600 hover:bg-white/10 z-50 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
                href="/create-campaign"
              >
                <p className="me-2 text-white text-sm">Create Campaign</p>
                <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
                  <GoArrowUpRight className="shrink-0 size-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
