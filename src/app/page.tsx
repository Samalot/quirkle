"use client"

import { useEffect, useMemo, useState } from "react";

interface TileProps {
  option: string;
  selected: boolean;
  onClick: Function;
}

const Tile = ({option, selected, onClick}: TileProps) => {
  const borderStyle = selected
    ? "bg-blue-100 border-2 border-blue-200"
    : "bg-white border-2 border-gray-400";

  const hoverStyle = "transition-shadow duration-300 cursor-pointer hover:shadow-md hover:shadow-gray-400 hover:scale-105";

  return (
    <button
      style={{width: 200, height: 200}}
      className={`text-center py-16 px-4 rounded-lg ${borderStyle} ${hoverStyle}`}
      onClick={() => onClick()}
    >
      <span className="text-lg font-bold t dark:text-white">{option}</span>
    </button>
  );
};

interface Option {
  text: string;
}

const Page = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelected(previousSelected => (previousSelected == id) ? null : id);
  };

  const options: Option[] = [
    {text: "Marie Curie"},
    {text: "Isaac Newton"},
    {text: "Albert Einstein"},
    {text: "Charles Darwin"},
  ];

  return (
    <main className="mx-auto max-w-6xl">
      <div className="grid grid-cols-2 gap-6">
        {
          options.map(({text}, index) => (
            <Tile key={`option-${index}`} option={text} selected={selected == index} onClick={() => handleSelect(index)} />
          ))
        }
      </div>
        
    </main>
  );
}

export default Page;
