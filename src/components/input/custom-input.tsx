import { Input } from "@/components/ui/input";

type CustomInputProps = {
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
};

export default function CustomInput({
  placeholder,
  icon,
  type,
  inputWrapperClassName,
  inputClassName,
}: CustomInputProps) {
  return (
    <div
      className={`flex items-center space-x-2 rounded-lg border border-[#E8EEF3] pl-3 ${inputWrapperClassName}`}
    >
      {icon}
      <Input
        className={`!border-0 border-transparent text-[#878787] ${inputClassName}`}
        placeholder={placeholder}
        type={type || "text"}
      />
    </div>
  );
}
