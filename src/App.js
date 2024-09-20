import Header from "./Components/Header";
import Main from "./Components/Main";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Header />
      <Main />
    </DataProvider>
  );
}

export default App;
