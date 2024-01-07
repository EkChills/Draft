
"use client"

import { type Dispatch, type SetStateAction, createContext, useState, useContext } from "react";

type InitialStateType = {
  pageTitle:string;
  setPageTitle:Dispatch<SetStateAction<string>>;
  customerId?:string;
  setCustomerId:Dispatch<SetStateAction<string>>
}


const initialState:InitialStateType = {
  pageTitle:'',
  setPageTitle:() => {
    return
  },
  customerId:'',
  setCustomerId:() => {
    return
  }
}

export const DocumentContext = createContext(initialState)

export const DocumentContextProvider = ({children}:React.PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  

  

  return (
    <DocumentContext.Provider value={{ pageTitle, setPageTitle, customerId, setCustomerId }}>
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocumentContext = () => {
  return useContext(DocumentContext)
}