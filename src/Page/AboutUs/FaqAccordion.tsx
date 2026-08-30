import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react"

type FaqAccordionProp={
    question:string,
    answer:string
}
export default function FaqAccordion({question, answer}:FaqAccordionProp){
    const [isOpen, setIsOpen]=useState(false);

    return(
        <div
        onClick={()=>setIsOpen(!isOpen)}
        className="bg-section-alternative backdrop-blur-sm border border-secondary-400/5 hover:border-primary-400/30 rounded-lg p-6 transition-colors duration-300"
        >   
            <div className="w-full flex justify-between">
                <h3 className="font-semibold tracking-wide text-base mb-2">
                    {question}
                </h3>
                <button onClick={()=>setIsOpen(!isOpen)} className="w-5 h-5 hover:cursor-pointer">
                    {isOpen?<ChevronUp/>:<ChevronDown/>}
                </button>
            </div>
            {isOpen && (
                <p className="text-description font-light text-sm leading-relaxed">
                    {answer}
                </p>
            )}
        </div>
    )
}