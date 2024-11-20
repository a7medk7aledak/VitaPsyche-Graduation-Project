import { useState, ChangeEvent, DragEvent } from "react";
import { FiX } from "react-icons/fi";

interface FileUploadProps {
  label: string;
  acceptedFileTypes: string;
  onFileChange: (file: File | null) => void; // Callback from parent to give it the file to store
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  acceptedFileTypes,
  onFileChange,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileChange(droppedFile);
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full mb-10">
      <label className="text-xl font-medium text-[#1e256c]">{label}</label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 hover:bg-gray-100 transition duration-200"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-gray-600">Drag and drop your file here</p>
        <p className="text-sm text-gray-500">or</p>
        <label className="cursor-pointer px-4 py-2 bg-[#0f766e] text-white font-semibold rounded shadow">
          Browse File
          <input
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">Selected File:</h4>
          <p className="flex items-center gap-x-2">
            {file.name}
            <span
              onClick={() => {
                setFile(null);
              }}
            >
              <FiX className="h-5 w-5 text-red-700 cursor-pointer" />{" "}
              {/* React Icons 'FiX' icon */}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
