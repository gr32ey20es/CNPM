import { useState } from "react"

export function useMultipartForm(steps){
    const [currentStep,setCurrentStep] = useState(0)
    const next = ()=>{
        setCurrentStep(it=>{
            if(currentStep>=steps.length-1)return it
            return it+1
        })
    }
    const back = ()=>{
        setCurrentStep(it=>{
            if(currentStep<=0)return it;
            return it-1;
        })
    }
    return {
        currentStep,
        step: steps[currentStep],
        steps,
        next,
        back,
        isfirst:currentStep===0,
        isend:currentStep===steps.length
    }
    
}