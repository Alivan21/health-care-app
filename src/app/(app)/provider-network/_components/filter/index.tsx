import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Filter() {
  return (
    <div className="flex items-center space-x-5 border-b border-b-border px-5 py-4">
      <div className="flex flex-col items-start space-y-2 text-start">
        <p className="text-sm font-semibold">Search</p>
        <div className="flex items-center space-x-2 pr-3">
          <Search className="size-3 text-[#878787]" />
          <Input
            className="!h-4 !rounded-none !border-0 border-transparent !p-0 !text-xs text-[#878787]"
            placeholder="Search by condition"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col items-start space-y-2 text-start">
        <p className="text-sm font-semibold">Insurance</p>
        <Select>
          <SelectTrigger className="!h-4 w-[120px] !rounded-none !border-0 !p-0 !text-xs !text-[#878787]">
            <SelectValue placeholder="Aetna-Choice.." />
          </SelectTrigger>
          <SelectContent className="!rounded-none !p-0">
            <SelectGroup className="!p-0">
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                Aetna-Choice...
              </SelectItem>
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                Aetna-Choice...
              </SelectItem>
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                Aetna-Choice...
              </SelectItem>
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                Aetna-Choice...
              </SelectItem>
              <SelectItem className="border-b !p-2 !text-xs text-[#878787]" value="aetna">
                Aetna-Choice...
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-start space-y-2 text-start">
        <p className="text-sm font-semibold">Distance</p>
        <Select>
          <SelectTrigger className="!h-4 w-[120px] !rounded-none !border-0 !p-0 !text-xs !text-[#878787]">
            <SelectValue placeholder="> 1 mil" />
          </SelectTrigger>
          <SelectContent className="!rounded-none !p-0">
            <SelectGroup className="!p-0">
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                &gt; 1 mil
              </SelectItem>
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                5mil - 15mil
              </SelectItem>
              <SelectItem className="border-b !p-2 !text-xs text-[#878787]" value="aetna">
                &lt; 25mil
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-start space-y-2 text-start">
        <p className="text-sm font-semibold">Doctor Type</p>
        <Select>
          <SelectTrigger className="!h-4 w-[120px] !rounded-none !border-0 !p-0 !text-xs !text-[#878787]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="!rounded-none !p-0">
            <SelectGroup className="!p-0">
              <SelectItem
                className="border-b border-b-border !p-2 !text-xs text-[#878787]"
                value="aetna"
              >
                All
              </SelectItem>
              <SelectItem className="border-b !p-2 !text-xs text-[#878787]" value="aetna">
                Top
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
