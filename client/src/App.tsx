import { BackgroundHeading } from "./Components/BackgroundHeading";
import { Footer } from "./Components/Footer";
import { TodoList } from "./Components/TodoList";
import { Header } from "./Components/Header";
import { Sidebar } from "./Components/Sidebar";
import { useEffect } from "react";
import { Snackbar } from "./Components/Snackbar";
import { useAppContext } from "./contexts/AppContextProvider";
import axios from "axios";
import { AUTH_ENDPOINT, BASE_URL } from "./utils/utils.ts";
import Cookies from "js-cookie";

const App = () => {
  const {
    loggedIn,
    setLoggedIn,
    getTodos,
    snackbarMessage,
    snackbarOpen,
    setSnackbarOpen,
    setSnackbarMessage,
    setUserEmail,
  } = useAppContext();

  const token = Cookies.get("authToken");

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${AUTH_ENDPOINT}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success === true) {
        setUserEmail(response.data.decoded);
        setLoggedIn(true);
      }
    } catch (e) {
      setSnackbarMessage("Error when authenticating token");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  useEffect(() => {
    if (loggedIn) {
      getTodos();
    }
  }, [loggedIn]);

  return (
    <div className="font-sans bg-[#6199d4] h-screen flex flex-col justify-center items-center">
      <BackgroundHeading />
      <main className="relative w-[60%] max-sm:w-[80%] h-2/3 max-sm:h-4/5 max-lg:min-h-[300px] bg-white rounded-[8px] shadow-[0_6px_6px_rgba(0,0,0,0.08)] flex flex-col">
        <Header />
        <section className="flex flex-1 overflow-hidden">
          <TodoList />
          <Sidebar />
        </section>
      </main>
      <Footer />
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default App;
