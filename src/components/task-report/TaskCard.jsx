export default function TaskCard({ employeeName, reportDetails, image }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2 text-sm font-medium">
        <img
          src={image || "https://i.pravatar.cc/150?img"}
          alt="image"
          className="w-7 h-7 rounded-full"
        />
        <span>{employeeName}</span>
      </div>
      <ol className="list-decimal text-sm text-gray-700 pl-5 mt-5">
        {reportDetails}
      </ol>
    </div>
  );
}
