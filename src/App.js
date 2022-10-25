import { ToDoList } from './components'

import ToDoListProvider from './context/ToDoListContext'

function App() {
  return (
    <ToDoListProvider>
      <ToDoList />
    </ToDoListProvider>
  )
}

export default App
