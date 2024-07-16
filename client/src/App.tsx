import { BackgroundHeading } from "./Components/BackgroundHeading.tsx";
import { Footer } from "./Components/Footer.tsx";
import { TodoList } from "./Components/TodoList.tsx";
import { Header } from "./Components/Header.tsx";
import { Sidebar } from "./Components/Sidebar.tsx";

const App = () => {
  return (
    <div className="font-sans bg-[#6199d4] h-screen flex flex-col justify-center items-center">
      <BackgroundHeading />
      <main className="relative w-[60%] max-sm:w-[80%] h-2/3 max-sm:h-4/5 max-lg:min-h-[300px] bg-white rounded-[8px] shadow-[0_6px_6px_rgba(0,0,0,0.08)] flex flex-col">
        <Header />
        <section className="flex flex-1">
          <TodoList />
          <Sidebar />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
