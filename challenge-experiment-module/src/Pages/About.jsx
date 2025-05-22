import { FiPhone, FiMail, FiGithub } from "react-icons/fi";
import AboutPageCard from "../Components/AboutPageCard";
import { PiTelegramLogo } from "react-icons/pi";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";

const About = () => {
  return (
    <div className="max-w-[85rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-28 mx-auto min-h-screen">
      <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-bottom-left -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 "></div>
      </div>
      <div className="max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-12 grid items-start lg:grid-cols-2 gap-6 lg:gap-16">
          <AboutPageCard />
          <div className="divide-y  divide-gray-800">
            {/* Telegram */}
            <div className="flex gap-x-7 py-6  px-3">
              <PiTelegramLogo className="shrink-0 size-6 mt-1.5  text-gray-200" />
              <div className="grow">
                <h3 className="font-semibold  text-gray-200">Telegram</h3>
                <p className="mt-1 text-sm  text-gray-500">
                  Reach out to us on Telegram for quick support.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-1 text-sm focus:outline-none  text-gray-300 hover:text-gray-100 focus:text-gray-200"
                  href="https://t.me/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Telegram
                  <GoArrowUpRight />
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex gap-x-7 py-6  px-3">
              <FiGithub className="shrink-0 size-6 mt-1.5  text-gray-200" />
              <div className="grow">
                <h3 className="font-semibold  text-gray-200">GitHub</h3>
                <p className="mt-1 text-sm  text-gray-500">
                  Check out our open-source projects on GitHub.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-1 text-sm   hover: focus:outline-none focus: text-gray-300 hover:text-gray-100 focus:text-gray-200"
                  href="https://github.com/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit GitHub
                  <GoArrowUpRight />
                </a>
              </div>
            </div>

            {/* X (Twitter) */}
            <div className="flex gap-x-7 py-6  px-3">
              <RiLinkedinBoxLine className="shrink-0 size-6 mt-1.5  text-gray-200" />
              <div className="grow">
                <h3 className="font-semibold  text-gray-200">Linkedin</h3>
                <p className="mt-1 text-sm  text-gray-500">
                  Follow us for updates and announcements.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-1 text-sm   hover: focus:outline-none focus: text-gray-300 hover:text-gray-100 focus:text-gray-200"
                  href="https://www.linkedin.com/in/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect us on linkedin
                  <GoArrowUpRight />
                </a>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex gap-x-7 py-6  px-3">
              <FiPhone className="shrink-0 size-6 mt-1.5  text-gray-200" />
              <div className="grow">
                <h3 className="font-semibold  text-gray-200">Call Us</h3>
                <p className="mt-1 text-sm  text-gray-500">
                  You can reach us by phone for direct inquiries.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-1 text-sm   hover: focus:outline-none focus: text-gray-300 hover:text-gray-100 focus:text-gray-200"
                  href="tel:+1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +1 234 567 890
                  <GoArrowUpRight />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-x-7 py-6  px-3">
              <FiMail className="shrink-0 size-6 mt-1.5  text-gray-200" />
              <div className="grow">
                <h3 className="font-semibold  text-gray-200">Email Us</h3>
                <p className="mt-1 text-sm  text-gray-500">
                  Feel free to send us an email for any inquiries.
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-x-1 text-sm   hover: focus:outline-none focus: text-gray-300 hover:text-gray-100 focus:text-gray-200"
                  href="mailto:contact@lomi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact@lomi.com
                  <GoArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
