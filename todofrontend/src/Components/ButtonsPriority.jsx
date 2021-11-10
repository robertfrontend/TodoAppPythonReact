import React from "react";

export default function ButtonsPriority(props) {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Prioridad
      </label>
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 rounded-l-md border
                   border-gray-300 bg-white text-sm font-medium text-gray-700 hover: bg-gray-50 focus: z-10 focus: "
        onClick={() => props.changePriority("baja")}
      >
        Baja
      </button>
      <button
        type="button"
        className="-ml-px relative inline-flex items-center
                    px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover: bg-gray-50 focus: z-10 focus: 
  "
        onClick={() => props.changePriority("media")}
      >
        Media
      </button>
      <button
        type="button"
        className="-ml-px relative inline-flex items-center 
                    px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover: bg-gray-50 focus: z-10 
   "
        onClick={() => props.changePriority("alta")}
      >
        Alta
      </button>
    </>
  );
}
