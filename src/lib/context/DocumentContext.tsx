
"use client"

import { type Dispatch, type SetStateAction, createContext, useState, useContext } from "react";

type InitialStateType = {
  pageTitle:string;
  setPageTitle:Dispatch<SetStateAction<string>>;
  customerId?:string;
  setCustomerId:Dispatch<SetStateAction<string>>;
  setSpaceId:Dispatch<SetStateAction<string>>;
  spaceId?:string;
}


const initialState:InitialStateType = {
  pageTitle:'',
  setPageTitle:() => {
    return
  },
  customerId:'',
  setCustomerId:() => {
    return
  },
  setSpaceId:() => {return},
  spaceId:''
}

export const DocumentContext = createContext(initialState)

export const DocumentContextProvider = ({children}:React.PropsWithChildren) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [spaceId, setSpaceId] = useState<string>('')
  

  

  return (
    <DocumentContext.Provider value={{ pageTitle, setPageTitle, customerId, setCustomerId, spaceId,setSpaceId }}>
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocumentContext = () => {
  return useContext(DocumentContext)
}