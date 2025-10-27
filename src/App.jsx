import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ContextProvider from "./context/Context";

const App = () => {
  return (
    <ContextProvider>
      <div className="flex w-full h-screen max-md:flex-row">
        <div className="min-w-[280px] max-w-[280px] flex-shrink-0 max-md:min-w-[72px] max-md:max-w-[72px]">
          <Sidebar />
        </div>
        <div className="flex-1 w-[calc(100vw-280px)] max-md:w-[calc(100vw-72px)] overflow-x-hidden">
          <Main />
        </div>
      </div>
    </ContextProvider>
  );
};

export default App;
