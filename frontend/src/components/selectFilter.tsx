import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string | [number, number];
  label: string;
}

interface SelectFilterProps {
  data: SelectOption[];
  placeholder: string;
  onChange: (value: string | [number, number]) => void;
}

const SelectFilter = ({ data, placeholder, onChange }: SelectFilterProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data &&
          data.map((item) => (
            <SelectItem
              key={item.label}
              value={
                typeof item.value === "string"
                  ? item.value
                  : item.value.join(",")
              }
            >
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
