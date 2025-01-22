import { Input } from "@/components/ui/input";

type CustomInputProps = {
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function CustomInput({
  placeholder,
  icon,
  type,
  inputWrapperClassName,
  inputClassName,
  inputProps,
}: CustomInputProps) {
  return (
    <div
      className={`flex w-full items-center space-x-1 rounded-lg border border-[#E8EEF3] bg-white ${icon ? "pl-3" : "pl-0"} ${inputWrapperClassName}`}
    >
      {icon}
      <Input
        className={`!border-0 border-transparent text-[#878787] ${inputClassName}`}
        placeholder={placeholder}
        type={type || "text"}
        {...inputProps}
      />
    </div>
  );
}
