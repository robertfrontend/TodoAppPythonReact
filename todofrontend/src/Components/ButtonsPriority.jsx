import React from "react";

export default function ButtonsPriority(props) {
  console.log(props.priority);
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Prioridad
      </label>
      <button
        type="button"
        className={
          props.priority === "baja"
            ? `relative inline-flex items-center px-4 py-2 rounded-l-md border
                   border-gray-300 bg-white text-sm font-medium text-white bg-gray-50 focus: z-10 bg-indigo-500`
            : `relative inline-flex items-center px-4 py-2 rounded-l-md border
                   border-gray-300 bg-white text-sm font-medium text-gray-700 hover: bg-gray-50 focus: z-10`
        }
        onClick={() => props.changePriority("baja")}
      >
        Baja
      </button>
      <button
        type="button"
        className={
          props.priority === "media"
            ? `-ml-px relative inline-flex items-center
                    px-4 py-2 border border-gray-300 bg-white text-sm font-medium bg-gray-50 z-10 bg-indigo-500 text-white`
            : `-ml-px relative inline-flex items-center
                    px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover: bg-gray-50 z-10`
        }
        onClick={() => props.changePriority("media")}
      >
        Media
      </button>
      <button
        type="button"
        className={
          props.priority === "alta"
            ? `-ml-px relative inline-flex items-center 
                    px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium bg-indigo-500 z-10 text-white`
            : `-ml-px relative inline-flex items-center 
                    px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover: z-10`
        }
        onClick={() => props.changePriority("alta")}
      >
        Alta
      </button>
    </>
  );
}
