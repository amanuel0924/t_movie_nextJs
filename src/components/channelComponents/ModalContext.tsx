"use client"
import { Channel } from "@prisma/client"
import React, { createContext, useState, ReactNode } from "react"

interface ModalContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  updateModal: () => void
  closeModalUpdate: () => void
  isUpdateModalOpen: boolean
  channel?: unknown
  setChannelData: (row: Channel) => void
}

const defaultContextValue: ModalContextType = {
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  updateModal: () => {},
  closeModalUpdate: () => {},
  isUpdateModalOpen: false,
  setChannelData: () => {},
}

const ModalContext = createContext<ModalContextType>(defaultContextValue)

interface ModalProviderProps {
  children: ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const updateModal = () => setIsUpdateModalOpen(true)
  const closeModalUpdate = () => setIsUpdateModalOpen(false)
  const [channel, setChannel] = useState({})
  const setChannelData = (row: Channel) => setChannel(row)

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        updateModal,
        closeModalUpdate,
        isUpdateModalOpen,
        channel,
        setChannelData,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
