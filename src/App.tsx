import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import ScrollToTop from "./Components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient=new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop/>
        <AppRoutes/>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;