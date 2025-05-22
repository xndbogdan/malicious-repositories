import {
  FaTelegramPlane,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto border-t border-white/20">
      <div className="text-center">
        <a
          className="flex justify-center items-center space-x-3 text-xl font-semibold text-gray-50 hover:text-lime-400 transition-colors duration-300 pb-5"
          href="/"
        >
          <img src="/lomiLogo.png" alt="Logo" className="w-8 h-8" />
          <span>1omi.</span>
        </a>

        <div className="mt-3">
          <p className="text-gray-50">
            Join the{" "}
            <a
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
              href="#"
            >
              Lomi Community
            </a>{" "}
            and help bring dreams to life.
          </p>
          <p className="text-gray-400">© Lomi 2024, All rights reserved.</p>
        </div>

        <div className="mt-3 space-x-2">
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-50 hover:bg-lime-500 ease-in-out duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lomi on Telegram"
          >
            <FaTelegramPlane className="shrink-0 size-4" />
          </a>
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-50 hover:bg-lime-500 ease-in-out duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lomi on GitHub"
          >
            <FaGithub className="shrink-0 size-4" />
          </a>
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-50 hover:bg-lime-500 ease-in-out duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lomi on LinkedIn"
          >
            <FaLinkedin className="shrink-0 size-4" />
          </a>
          <a
            className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-50 hover:bg-lime-500 ease-in-out duration-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            href="mailto:contact@lomi.com"
            aria-label="Contact Lomi via Email"
          >
            <FaEnvelope className="shrink-0 size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
