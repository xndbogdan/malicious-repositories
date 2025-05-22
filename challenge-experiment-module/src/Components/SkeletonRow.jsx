const SkeletonRow = () => {
  return (
    <tr className="hover:bg-white/10 ease-in-out duration-200 animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-700 rounded w-28 flex items-center gap-1">
          <div className="h-4 bg-gray-600 rounded w-16"></div>
          <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
        </div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
