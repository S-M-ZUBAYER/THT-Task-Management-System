import UploaderModal from "./UploaderModal";

const ResourceList = ({ title, items }) => {
  return (
    <div className="p-4 border rounded-xl space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-blue-900">{title}</h3>
        <UploaderModal />
      </div>
      {items.map(({ name, date }, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center text-sm text-gray-700 border-b py-2 last:border-b-0"
        >
          <div className="flex items-center gap-2">
            📎 <span>{name}</span>
          </div>
          <span className="text-gray-400 text-xs">{date}</span>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;
