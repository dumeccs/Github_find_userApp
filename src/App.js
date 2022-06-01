import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Navbar from "./Component/Layout/Navbar";
import Footer from "./Component/Layout/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Notfound from "./Pages/Notfound";
import { GithubContextProvider } from "./Context/Github/GithubContext";
import { AlertProvider } from "./Context/Alert/AlertReducers/AlertContext";
import Alert from "./Component/Layout/Alert";

function App() {
  return (
  <GithubContextProvider>
    <AlertProvider>
     <Router>
      <div >
          <div className="flex flex-col justify-between h-screen">
            
            <Navbar />

            <main className="container mx-auto px-3 pb-12">
            <Alert />
              <Routes>
                 <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/notfound" element={<Notfound/>} />
                <Route path="/*" element={<Notfound/>} />
              </Routes>
            </main>
            <Footer />
          </div>
      </div>
    </Router>
  </AlertProvider>
  </GithubContextProvider>
  
   
  );
}

export default App;
