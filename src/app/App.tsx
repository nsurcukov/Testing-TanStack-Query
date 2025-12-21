import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import TaskDetail from "@/components/TaskDetail/TaskDetail"
import Home from "@/page/Home"
import { queryClient } from "@/shared/query-client"




function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App