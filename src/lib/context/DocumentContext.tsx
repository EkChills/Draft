
"use client"

import { type Dispatch, type SetStateAction, createContext, useState, useContext } from "react";

type InitialStateType = {
  pageTitle:string;
  setPageTitle:Dispatch<SetStateAction<string>>
}


const initialState:InitialStateType = {
  pageTitle:'',
  setPageTitle:() => {
    return
  }
}

export const DocumentContext = createContext(initialState)

export const DocumentContextProvider = ({children}:React.PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  

  return (
    <DocumentContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocumentContext = () => {
  return useContext(DocumentContext)
}