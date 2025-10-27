import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ContextProvider from "./context/Context";

const App = () => {
  const [sidebarExtended, setSidebarExtended] = useState(true);

  return (
    <ContextProvider>
      <div className="flex w-full h-screen max-md:flex-row bg-linear-to-br from-slate-50 to-blue-50/30">
        <div className="shrink-0">
          <Sidebar
            extended={sidebarExtended}
            setExtended={setSidebarExtended}
          />
        </div>
        <div className="flex-1 overflow-hidden shadow-inner">
          <Main />
        </div>
      </div>
    </ContextProvider>
  );
};

export default App;
