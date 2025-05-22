import { FiMonitor, FiDollarSign, FiShield, FiUsers } from "react-icons/fi";

const Features = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-5 mx-auto lg:pb-20">
      <div className="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-1 text-center md:text-start">
          <h2 className="font-semibold text-xl md:text-3xl text-gray-100">
            Key Features of Lomi
          </h2>
          <p className="mt-2 md:mt-4 text-gray-400 text-sm md:text-base">
            Lomi offers a powerful platform to bring your projects to life with ease. Discover the core features designed to support your campaign from start to finish.
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            <div className="flex gap-x-5">
              <FiMonitor className="shrink-0 mt-1 size-6 text-lime-500" />
              <div className="grow">
                <h3 className="text-lg font-semibold text-gray-200">
                  Transparent Tracking
                </h3>
                <p className="mt-1 text-gray-400">
                  Monitor your campaign’s progress with real-time updates and blockchain transparency, ensuring full visibility and accountability.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5">
              <FiDollarSign className="shrink-0 mt-1 size-6 text-lime-500" />
              <div className="grow">
                <h3 className="text-lg font-semibold text-gray-200">
                  Secure Transactions
                </h3>
                <p className="mt-1 text-gray-400">
                  Enjoy secure and seamless financial transactions, thanks to blockchain technology that protects your funds and personal information.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5">
              <FiShield className="shrink-0 mt-1 size-6 text-lime-500" />
              <div className="grow">
                <h3 className="text-lg font-semibold text-gray-200">
                  Comprehensive Support
                </h3>
                <p className="mt-1 text-gray-400">
                  Access extensive resources and support throughout your campaign, ensuring you have the tools and guidance needed for success.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5">
              <FiUsers className="shrink-0 mt-1 size-6 text-lime-500" />
              <div className="grow">
                <h3 className="text-lg font-semibold text-gray-200">
                  Community Engagement
                </h3>
                <p className="mt-1 text-gray-400">
                  Build and engage with a community of backers who are passionate about your project, fostering collaboration and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
