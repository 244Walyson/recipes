import React from "react";
import SearchContainer from "./searchContainer";

const SearchPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col max-w-4xl items-center justify-center">
        <div className="flex items-center justify-center mb-14">
          <h1 className="text-6xl font-bold text-center">
            Busque pela sua receita favorita
          </h1>
        </div>
        <div className="flex w-full p-8">
          <SearchContainer />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
