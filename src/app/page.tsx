"use client"

import { useState } from "react";
import ScheduleCall from "@/components/ScheduleCall";

export default function Page() {

  const [isOpen, setOpen] = useState(false)

  function toggleOpen() 
  {
    setOpen((p) => !p)
  }
  return (
    <main 
    className="w-full h-full fixed overflow-y-auto bg-blue-200">

      <div className="w-full flex items-center gap-x-4">
        <button 
        onClick={toggleOpen}
        className="font-semibold bg-blue-600 text-white rounded-md h-11 px-4">Schedule Call</button>

        <button  
          onClick={toggleOpen}
        className="font-semibold bg-red-600 text-white rounded-md h-11 px-4">Cancel Call</button>
      </div>
     {isOpen &&   <ScheduleCall close={toggleOpen}/>}
    </main>
  );
}
