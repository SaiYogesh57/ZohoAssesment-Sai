import { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ListComponent from "./components/ListComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navbar";
import TheatresList from "./components/TheatresComponent";
import HomePage from "./components/HomePage";
import axios from "axios";
import Footer from "./components/footer";




export const AppContext=createContext(null)
function App() {
const [moviesList, setMoviesList] = useState([]);

  const fetchList = async () => {
    const body = {
      user_mail_id: "sample@gmail.com",
    };
    const response = await axios.post(
      "https://zincubate.in/api/MovieTicketChecker?action=getAllDetails",
      body
    );
    return response;
  };
  useEffect(() => {
    fetchList().then((response) => {
      setMoviesList(response.data);
    });
  }, []);
  return (
    <div className="App">
        <AppContext.Provider value={moviesList}>
      <Router>

      <Navigation />
        <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<ListComponent/>} />
        <Route path="/theatres" element={<TheatresList/>} />

        </Routes>
      </Router>
      <Footer />
      </AppContext.Provider>

    </div>
  );
}

export default App;
