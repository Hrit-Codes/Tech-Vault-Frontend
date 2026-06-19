import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return(
    <BrowserRouter>
      <ScrollToTop/>
        <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;