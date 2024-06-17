"use client"
import { Movie } from "@prisma/client"
import { clear } from "console"
import React, { createContext, useState, ReactNode } from "react"

interface ModalContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  updateModal: () => void
  closeModalUpdate: () => void
  isUpdateModalOpen: boolean
  movie?: unknown
  setMovieData: (row: Movie) => void
}

const defaultContextValue: ModalContextType = {
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  updateModal: () => {},
  closeModalUpdate: () => {},
  isUpdateModalOpen: false,
  setMovieData: () => {},
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
  const [movie, setMovie] = useState({})
  const setMovieData = (row: Movie) => setMovie(row)

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        updateModal,
        closeModalUpdate,
        isUpdateModalOpen,
        movie,
        setMovieData,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
