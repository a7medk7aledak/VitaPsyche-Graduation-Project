import { useState, ChangeEvent, DragEvent } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface FileUploadProps {
  label: string;
  acceptedFileTypes: string;
  onFileChange: (file: File | null) => void; // Callback from parent to give it the file to store
  existingFile: File | null; // made it to prevent reseting files when going back to the previous form and return
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  acceptedFileTypes,
  onFileChange,
  existingFile,
}) => {
  const t = useTranslations("fileUpload");
  const minSize = 1024; // 1 KB
  const maxSize = 5242880; // 5 MB

  const [file, setFile] = useState<File | null>(existingFile);
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const fileSize = selectedFile.size;

      if (fileSize < minSize || fileSize > maxSize) {
        // File size is invalid
        setError(
          t("fileSizeError", {
            min: minSize / 1024,
            max: maxSize / 1048576,
          })
        );
        setFile(null); // Clear file if invalid size
      } else {
        // File size is valid
        setFile(selectedFile);
        onFileChange(selectedFile);
        setError(""); // Clear error if file size is valid
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileSize = droppedFile.size;

      if (fileSize < minSize || fileSize > maxSize) {
        // File size is invalid
        setError(
          t("fileSizeError", {
            min: minSize / 1024,
            max: maxSize / 1048576,
          })
        );
        setFile(null); // Clear file if invalid size
      } else {
        // File size is valid
        setFile(droppedFile);
        onFileChange(droppedFile);
        setError(""); // Clear error if file size is valid
      }
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
          {t("dragAndDrop")}
        </motion.p>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t("or")}
        </motion.p>

        <motion.label
          className="cursor-pointer px-4 py-2 bg-[#0f766e] text-white font-semibold rounded shadow"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {t("browseFile")}
          <input
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
          />
        </motion.label>
      </motion.div>

      {error && (
        <motion.p
          className="text-red-600 mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {file && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-md font-semibold">{t("selectedFile")}</h4>
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
                onFileChange(null);
                setError(""); // Clear error when removing file
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
