import { createContext, useState } from 'react'

import { rowItems, images, availableFilters as arrayOfFilters } from '../data'

export const ToDoListContext = createContext()
export const ToDoListUpdateContext = createContext()

export default function ToDoListProvider({ children }) {
  const [toDoListItems, setToDoListItems] = useState(() => rowItems)
  const [toDoListImages, setToDoListImages] = useState(() => images)
  const [availableFilters, setAvailableFilters] = useState(arrayOfFilters)
  const [currentFilters, setCurrentFilters] = useState([])
  const [searchInputValue, setSearchInputValue] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  const toggleFilter = (filter) => {
    const filterLower = filter.toLowerCase()

    if (currentFilters.includes(filterLower)) {
      const filteredArray = currentFilters.filter((value) => value !== filterLower)
      setCurrentFilters(filteredArray)

      return
    }

    setCurrentFilters((prevState) => [...prevState, filterLower])
  }

  const clearFiltersArray = () => {
    setCurrentFilters([])
    setSearchInputValue('')
  }

  const changeSearchInputValue = (value) => {
    setSearchInputValue(value)
  }

  const changeRowAvailabilityStatus = (rowID) => {
    const indexOfRow = toDoListItems.findIndex(({ id }) => id === rowID)

    let newArray = toDoListItems
    newArray[indexOfRow].canEdit = !newArray[indexOfRow].canEdit

    setToDoListItems([...newArray])
  }

  const deleteRowByID = (rowID) => {
    setToDoListItems((prevState) => prevState.filter(({ id }) => id !== rowID))

    if (selectedRows.includes(rowID))
      setSelectedRows((prevState) => [...prevState.filter((id) => id !== rowID)])
  }

  const selectRow = (rowID) => {
    if (selectedRows.includes(rowID)) {
      const newArray = selectedRows.filter((id) => id !== rowID)
      setSelectedRows(newArray)
      return
    }

    setSelectedRows((prevState) => [...prevState, rowID])
  }

  const deleteSelectedRows = () => {
    const newRows = toDoListItems.filter(({ id }) => !selectedRows.includes(id))

    let newImages = [...toDoListImages]

    selectedRows.forEach((i) => {
      const imageID = toDoListItems[i].image
      newImages[imageID].busy = false
    })

    setSelectedRows([])
    setToDoListItems(newRows)
    setToDoListImages([...newImages])
  }

  const getSelectedRowsLength = () => selectedRows.length

  const changeCompanyIcon = (rowID, imageID) => {
    const rowIndex = toDoListItems.findIndex(({ id }) => id === rowID)
    const imageIndex = toDoListImages.findIndex(({ id }) => id === imageID)
    let newRows = [...toDoListItems]
    const oldImageID = newRows[rowIndex].image

    newRows[rowIndex].image = imageIndex

    setToDoListItems([...newRows])

    let newImages = [...toDoListImages]
    newImages[imageIndex].busy = true
    newImages[oldImageID].busy = false

    setToDoListImages([...newImages])
  }

  return (
    <ToDoListContext.Provider
      value={{
        toDoListImages,
        toDoListItems,
        currentFilters,
        availableFilters,
        searchInputValue,
        selectedRows,
      }}
    >
      <ToDoListUpdateContext.Provider
        value={{
          toggleFilter,
          clearFiltersArray,
          changeSearchInputValue,
          changeRowAvailabilityStatus,
          deleteRowByID,
          selectRow,
          deleteSelectedRows,
          getSelectedRowsLength,
          changeCompanyIcon,
        }}
      >
        {children}
      </ToDoListUpdateContext.Provider>
    </ToDoListContext.Provider>
  )
}
