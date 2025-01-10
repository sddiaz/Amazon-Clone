"use client";

import { Department } from "@/app/types";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DepartmentData from "../../../../public/data/departments.json";
import Overlay from "../Shared/Overlay";

const SearchBar = () => {
  //#region Variables

  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the entire search container

  //#endregion

  //#region Methods & Helper Functions

  const handleSearch = () => {
    // Update Search Suggestions
    const stored = localStorage.getItem("suggestions");
    const localSuggestions = stored ? [...JSON.parse(stored)] : [];
    if (!localSuggestions.includes(searchInput)) {
      const newSuggestions = [...localSuggestions, searchInput];
      setSuggestions(newSuggestions);
      localStorage.setItem("suggestions", JSON.stringify(newSuggestions));
    }
  };

  const handleDeleteSuggestion = (suggestion: string) => {
    const newSuggestions = suggestions.filter(item => item !== suggestion);
    setSuggestions(newSuggestions);
    localStorage.setItem("suggestions", JSON.stringify(newSuggestions));
  };

  //#endregion

  //#region Hooks

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // This code will only run in the browser
    const storedSuggestions = localStorage.getItem("suggestions");
    if (storedSuggestions) {
      const parsedSuggestions = JSON.parse(storedSuggestions).filter(
        (suggestion: string) =>
          suggestion?.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(parsedSuggestions);
    }
  }, [searchInput]);

  //#endregion

  return (
    <>
      {isSearching && <Overlay />}
      <div
        ref={containerRef} // Attach ref to the entire container
        id="searchFill"
        className="w-[100%] h-[100%] flex p-[10px] text-white items-center justify-between"
      >
        <div
          id="search"
          className="w-[100%] h-[100%] flex justify-center items-center"
        >
          <select
            id="searchDropdown"
            className="amazon-focus cursor-pointer focus:z-10 relative bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 px-2 rounded-l-lg h-[100%] text-[12px] [&>option]:bg-white [&>option]:text-gray-900"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(Number(e.target.value))}
          >
            {(DepartmentData as Department[])?.map((x) => {
              return (
                <option className="w-auto" key={x.id} value={x.id}>
                  {x.name}
                </option>
              );
            })}
          </select>
          <div className="relative flex-1 h-full">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
              onFocus={() => setIsSearching(true)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              placeholder="Search Amazon-Clone"
              className={`${
                isSearching ? "relative z-50" : ""
              } amazon-focus focus:z-90 relative w-full min-w-[500px] h-full placeholder-gray-500 text-black text-sm pl-2 font-normal`}
            />

            {/* Suggestions Panel */}
            {isSearching && suggestions.length > 0 && 
              <div className="absolute w-full bg-white border border-gray-300 rounded-b shadow-lg z-50">
                  <ul className="max-h-96 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        onClick={() => {
                          setSearchInput(suggestion);
                          setSuggestions([...suggestions]); // Force re-render
                        }}
                      >
                        <div className="flex items-center justify-between text-[#000] text-[14px]">
                          {suggestion}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSuggestion(suggestion);
                            }}
                          >
                            <X size={16} className="mr-2" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
              </div>}
          </div>
          <button
            id="searchButton"
            className="amazon-focus rounded-r-lg focus:z-10 relative bg-orange-300 hover:bg-orange-400 h-[100%] w-[80px] flex justify-center items-center "
          >
            <div className="text-gray-600" onClick={handleSearch}>
              <Search size={23} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
