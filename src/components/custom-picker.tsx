import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import React, { useState } from "react";

type CustomPickerProps = {
  values: string[];
  onChange: (value: string) => void;
};

const CustomPicker = ({ values, onChange }: CustomPickerProps) => {
  const [selectedValue, setSelectedValue] = useState(values[0] || "");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={handleValueChange}
      style={[styles.picker]}
    >
      {values.map((value) => (
        <Picker.Item key={value} label={value} value={value} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 45,
    width: "100%",
  },
});

export default CustomPicker;
