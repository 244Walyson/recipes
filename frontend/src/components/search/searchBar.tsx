"use client";

import React, { useState, useEffect } from "react";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

type SearchBarProps = Readonly<{
  handleSearch: (search: string) => void;
}>;

export function SearchBar({ handleSearch }: SearchBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleSearch(inputValue);
  };

  return (
    <Command>
      <CommandInput
        placeholder="Pesquise por Strogonof, bolo de cenoura, pão de queijo..."
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onInput={handleInput}
      />
      {open && <CommandList></CommandList>}
    </Command>
  );
}
