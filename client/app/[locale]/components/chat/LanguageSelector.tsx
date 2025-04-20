import React from "react";

interface LanguageSelectorProps {
  language: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onChange,
}) => {
  return (
    <select
      value={language}
      onChange={onChange}
      className="w-full p-3 border border-[#67e6c6] rounded-lg focus:ring-2 focus:ring-[#58ddbc] focus:outline-none bg-slate-800 text-white transition-colors hover:bg-slate-700"
    >
      <option value="en-US">English (US)</option>
      <option value="ar-SA">Arabic</option>
    </select>
  );
};
