import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectFilter = ({ data, placeholder, onChange }) => {
  const handleChange = (value) => {
    onChange(value); // Chama a função onChange passada como prop com o valor selecionado
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data &&
          data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
