type BasicInformationProps = {
  icon: React.ReactNode;
  placeholder: string;
  data: string;
  textSize?: "text-sm" | "text-xs";
  wrapperClassName?: string;
};

export default function BasicInformation({
  icon,
  placeholder,
  data,
  textSize = "text-sm",
  wrapperClassName,
}: BasicInformationProps) {
  return (
    <div className={`flex items-start justify-start space-x-2 ${wrapperClassName}`}>
      <span className="rounded bg-[rgba(23,87,247,0.05)] p-1 drop-shadow-[0px_4px_0px_rgba(238,238,238,0.25)]">
        {icon}
      </span>
      <div className="flex flex-col items-start space-y-1">
        <p className={`${textSize} font-normal`}>{placeholder}</p>
        <p className={`${textSize} font-semibold`}>{data}</p>
      </div>
    </div>
  );
}
