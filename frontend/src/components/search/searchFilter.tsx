"use client";

import React, { useState } from "react";
import { SearchBar } from "./searchBar";
import SelectFilter from "../selectFilter";

import { IFindAllFilters } from "@/interfaces/recipe/find-all-filters.interface";
import {
  allergensData,
  priceData,
  timeData,
  trendingData,
} from "@/static/search_filters";
import { Checkbox } from "../ui/checkbox";

type SearchFilterProps = {
  onFilterChange: (filters: IFindAllFilters) => void;
};

const mapSelectOptions = (
  data: { id: string; name: string; values?: any }[]
) => {
  return data.map((item) => ({
    value: item.values ? item.values : item.id,
    label: item.name,
  }));
};

const SearchFilter = ({ onFilterChange }: SearchFilterProps) => {
  const [filters, setFilters] = useState<IFindAllFilters | undefined>({});
  const [showAllergens, setShowAllergens] = useState(false);

  const handleFilters = ({ key, value }: { key: string; value: any }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    onFilterChange({ ...filters, [key]: value });
    console.log("Filtros selecionados:", filters);
  };

  return (
    <div>
      <div className="flex mb-4">
        <SearchBar
          handleSearch={(value: string) =>
            handleFilters({ key: "name", value })
          }
        />
      </div>

      <div className="grid gap-6 grid-flow-col">
        <SelectFilter
          data={mapSelectOptions(trendingData.data)}
          placeholder="O que você prefere?"
          onChange={(value) => handleFilters({ key: "trending", value })}
        />

        <SelectFilter
          data={mapSelectOptions(timeData.data)}
          placeholder="Quanto tempo você tem?"
          onChange={(value) => {
            handleFilters({ key: "time", value: value });
          }}
        />

        <SelectFilter
          data={mapSelectOptions(priceData.data)}
          placeholder="Qual o seu orçamento?"
          onChange={(value) => {
            handleFilters({ key: "price", value: value });
          }}
        />

        <div>
          <button
            className="text-sm font-medium "
            onClick={() => setShowAllergens(!showAllergens)}
          >
            {showAllergens ? "Ocultar opções de alergias" : "Escolher alergias"}
          </button>

          {showAllergens && (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Quais alergias você possui?
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {allergensData.data.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <Checkbox
                      id={item.id}
                      checked={filters?.allergens?.includes(item.name)}
                      onCheckedChange={(checked) => {
                        const newAllergens = checked
                          ? [...(filters?.allergens || []), item.name]
                          : (filters?.allergens || []).filter(
                              (name) => name !== item.name
                            );

                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          allergens: newAllergens,
                        }));
                      }}
                    />
                    <label htmlFor={item.id} className="ml-2 text-sm">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
