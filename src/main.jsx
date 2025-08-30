// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import ContextProvider from './config/Context.jsx'

// createRoot(document.getElementById('root')).render(
//   <ContextProvider>
//     <App />
//   </ContextProvider>,
// )


// App.jsx
// import React from "react";
// import ContextProvider from "./context";
// import ContextProvider from "./context/ContextProvider.jsx";

// import Chat from "./components/Chat";

// function App() {
//   return (
//     <ContextProvider>
//       <Chat />
//     </ContextProvider>
//   );
// }

// export default App;



// main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import ContextProvider from "./context/ContextProvider.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ContextProvider>
//     <App />
//   </ContextProvider>
// );


// src/main.jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/Context";   // ✅ correct import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
