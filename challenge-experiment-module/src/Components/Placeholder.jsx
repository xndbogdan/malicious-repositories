import { string } from "prop-types";
import { FaRegFrown } from "react-icons/fa";

const Placeholder = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
      <FaRegFrown className="text-6xl text-gray-500 mb-4" />{" "}
      <h2 className="text-xl font-semibold text-gray-300">{title}</h2>
      <p className="text-gray-400 mt-2">{desc}</p>
    </div>
  );
};

export default Placeholder;

Placeholder.propTypes = {
  title: string,
  desc: string,
};
