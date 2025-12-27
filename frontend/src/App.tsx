import Header from "./components/Header.tsx";
import Opinions from "./components/Opinions.tsx";
import NewOpinion from "./components/NewOpinion.tsx";
import OpinionsContextProvider from "./store/opinions-context-provider.tsx";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <OpinionsContextProvider>
          <NewOpinion />
          <Opinions />
        </OpinionsContextProvider>
      </main>
    </>
  );
}

export default App;
