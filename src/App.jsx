import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ContextProvider from "./context/Context";

const App = () => {
  return (
    <ContextProvider>
      <div className="flex w-full h-screen max-md:flex-row">
        <div className="min-w-[250px] max-w-[250px] flex-shrink-0 max-md:min-w-[60px] max-md:max-w-[60px]">
          <Sidebar />
        </div>
        <div className="flex-1 w-[calc(100vw-250px)] max-md:w-[calc(100vw-60px)] overflow-x-hidden">
          <Main />
        </div>
      </div>
    </ContextProvider>
  );
};

export default App;
