import { useRef, useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

interface ProfileUploadProps {
  value?: string | null;
  onChange?: (url: string | null) => void;
}

export const ProfileUpload = ({ value, onChange }: ProfileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) setPreview(value);
  }, [value]);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(url);
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClick}
        className="shrink-0 w-[98px] h-[98px] rounded-full border-[1.5px] border-[#DFE0EB] dark:border-[#2D3D46] overflow-hidden cursor-pointer hover:border-[#44BCFF]/50 transition focus:outline-none focus:ring-2 focus:ring-[#44BCFF]/50"
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-transparent">
            <FiUpload size={20} className="text-gray-600 dark:text-white" />
            <span className="text-[11px] text-gray-600 dark:text-white font-medium">Upload</span>
          </div>
        )}
      </button>
    </>
  );
};
