import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import ScrollToTop from "./Components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient=new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop/>
        <AppRoutes/>
        <Toaster richColors position="top-right"/>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;