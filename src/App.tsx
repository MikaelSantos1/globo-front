


import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Toaster } from "./components/ui/toaster"

import { AppRoutes } from "./routes/route"
import { AuthProvider } from "./context/authContext"

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="dark">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>

      </QueryClientProvider>

    </div>
  )
}

export default App
