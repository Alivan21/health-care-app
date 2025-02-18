import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type CustomInputProps = {
  name: string;
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
};

export default function CustomFormInput({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  inputWrapperClassName,
  inputClassName,
  inputProps,
  error,
}: CustomInputProps) {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      {!!label && (
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <div
              className={`flex w-full items-center space-x-1 rounded-lg border ${
                error ? "border-red-500" : "border-[#E8EEF3]"
              } bg-white ${icon ? "pl-3" : "pl-0"} ${inputWrapperClassName}`}
            >
              {icon}
              <Input
                {...field}
                {...inputProps}
                className={`!border-0 border-transparent text-[#878787] ${inputClassName}`}
                placeholder={placeholder}
                type={type}
              />
            </div>
            {!!error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </>
        )}
      />
    </div>
  );
}
