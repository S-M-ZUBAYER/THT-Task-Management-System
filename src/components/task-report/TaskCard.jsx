export default function TaskCard({ employeeName, reportDetails, image }) {
  return (
    <div className="border rounded-lg p-4 ">
      <div className="flex items-center space-x-2 mb-2 text-sm font-medium">
        <img
          src={image || "https://i.pravatar.cc/150?img"}
          alt="image"
          className="w-7 h-7 rounded-full"
        />
        <span>{employeeName}</span>
      </div>
      <ul className="text-sm list-decimal pl-5">
        <p className="break-words whitespace-pre-line max-w-full">
          {reportDetails}
        </p>
      </ul>
    </div>
  );
}
