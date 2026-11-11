import Tooltip from "@/components/ui/Tooltip";
import { navigateWithDelay as navigationTestAll } from "@/utils/navigationHelper";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiCircle, FiNavigation } from "react-icons/fi";
import { useOnClickOutside } from "usehooks-ts";
import { MapDataContext, NavigationContext } from "../pages/Map";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
  SECTOR_META_MAP,
  SectorId,
} from "../utils/types";

function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const { allObjects, objects, activeSector, navigateToStoreAcrossSectors } =
    useContext(MapDataContext) as MapDataContextType;
  const [suggestions, setSuggestions] = useState<ObjectItem[]>(allObjects);
  const [isAutocomplete, setIsAutocomplete] = useState<boolean>(false);
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigation, setNavigation } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;

  useEffect(() => {
    setSuggestions(allObjects);
  }, [allObjects]);

  useOnClickOutside(suggestionsRef, () => {
    setIsAutocomplete(false);
    setIsEditMode(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setIsAutocomplete(true);
      const filteredSuggestions = allObjects.filter((obj) =>
        obj.name.toLowerCase().includes(value.trim().toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setIsAutocomplete(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (isAutocomplete) {
      if (event.key === "ArrowDown") {
        if (selectedIndex < suggestions.length - 1) {
          setSelectedIndex((prevIndex) => prevIndex + 1);
          setInputValue(suggestions[selectedIndex + 1].name);
        }
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        if (selectedIndex > 0) {
          setSelectedIndex((prevIndex) => prevIndex - 1);
          setInputValue(suggestions[selectedIndex - 1].name);
        }
        event.preventDefault();
      } else if (event.key === "Enter" && selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex]);
        event.preventDefault();
        navigateToStoreAcrossSectors(suggestions[selectedIndex]);
      }
    }
  }

  useEffect(() => {
    if (suggestionsRef.current && selectedIndex >= 0) {
      const suggestionElements = suggestionsRef.current.children;
      if (suggestionElements[selectedIndex]) {
        suggestionElements[selectedIndex].scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  function handleSuggestionClick(selectedObject: ObjectItem) {
    setInputValue(selectedObject.name);
    setIsAutocomplete(false);
    navigateToStoreAcrossSectors(selectedObject);
  }
  function handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsEditMode(false);

    if (inputValue.length > 1) {
      setIsAutocomplete(true);
    }
    event.currentTarget.select();
  }

  function handleInputBlur() {
    setIsAutocomplete(false);
    setSelectedIndex(-1);
  }

  function handleSearch(inputValue: string) {
    const matchingObject = allObjects.find(
      (obj) => obj.name.toLowerCase() === inputValue.trim().toLowerCase()
    );
    if (!matchingObject) {
      if (inputValue === "Test") {
        const delay = 500;
        navigationTestAll(objects, 0, delay, navigation, setNavigation);
        return;
      } else {
        setIsInputInvalid(true);
        return;
      }
    }
    navigateToStoreAcrossSectors(matchingObject);
    setSelectedIndex(-1);
  }

  return (
    <div className="w-full md:w-72 xl:w-96 flex flex-row min-w-0">
      <div className="flex flex-inline rounded w-full shadow-sm border border-gray-200 bg-white">
        <div className="h-12 w-11 center flex-none rounded-l bg-white text-blue-500 text-[8px]">
          <div className="w-full h-8 center border-gray-200 border-r">
            <FiCircle />
          </div>
        </div>
        <div className="flex flex-1 min-w-0 relative">
          <input
            className={`h-12 px-3 w-full min-w-0 flex-1 text-gray-900 text-sm focus:outline-none ${
              isInputInvalid && "input-error"
            }`}
            placeholder="Buscar loja, box ou serviço..."
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            ref={inputRef}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            onAnimationEnd={() => setIsInputInvalid(false)}
          />

          {isAutocomplete && (
            <ul
              ref={suggestionsRef}
              className="absolute w-full z-30 mt-[3.25rem] bg-white rounded shadow-md max-h-60 h-min overflow-auto"
              key={"suggestions"}
            >
              {suggestions.length > 0 ? (
                suggestions.map((obj, index) => {
                  const secId = (obj.sectorId || "verde") as SectorId;
                  const secMeta = SECTOR_META_MAP[secId];
                  const isOther = secId !== activeSector;
                  return (
                    <li
                      key={obj.id || index}
                      className={`cursor-pointer p-2.5 border-t text-gray-700 hover:bg-gray-100 active:bg-gray-200 text-sm flex items-center justify-between gap-2 ${
                        selectedIndex === index
                          ? "border-l-4 border-blue-500 bg-gray-100"
                          : ""
                      }`}
                      onMouseDown={() => handleSuggestionClick(obj)}
                    >
                      <span className="font-medium truncate">{obj.name}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex-none ${secMeta.badgeClass}`}
                      >
                        {isOther ? `Ir p/ ${secMeta.name}` : secMeta.shortName}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li
                  className="p-2 text-gray-500 text-sm md:text-md"
                  key={"no-result"}
                >
                  Nenhum local encontrado
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="">
          <Tooltip content="Traçar rota" className="bg-blue-500">
            <button
              className="h-12 w-12 flex flex-none center justify-center rounded-r bg-blue-500 text-white"
              onClick={() => handleSearch(inputValue)}
              aria-label="search"
            >
              <FiNavigation />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
