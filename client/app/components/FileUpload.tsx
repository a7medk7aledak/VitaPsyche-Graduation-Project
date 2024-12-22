import { useState, ChangeEvent, DragEvent } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex flex-col space-y-2 w-full mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.label
        className="text-xl font-medium text-[#1e256c]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {label}
      </motion.label>

      <motion.div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 hover:bg-gray-100 transition duration-200"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Drag and drop your file here
        </motion.p>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          or
        </motion.p>

        <motion.label
          className="cursor-pointer px-4 py-2 bg-[#0f766e] text-white font-semibold rounded shadow"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Browse File
          <input
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
          />
        </motion.label>
      </motion.div>

      {file && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-md font-semibold">Selected File:</h4>
          <motion.p
            className="flex items-center gap-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {file.name}
            <span
              onClick={() => {
                setFile(null);
              }}
            >
              <FiX className="h-5 w-5 text-red-700 cursor-pointer" />
            </span>
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};
