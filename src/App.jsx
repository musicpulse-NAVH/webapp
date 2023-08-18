import Navbar from "./components/layout/Navbar";
import Fans from "./pages/Fans";
import CreateMusicNft from "./pages/CreateMusicNft";
import Collection from "./pages/Collection";
import FanMusicDetail from "./pages/FanMusicDetail";
import "./index.css";

import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Fans />} />
        <Route path="/musicdetail/:id" element={<FanMusicDetail />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/create" element={<CreateMusicNft />} />
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
      </Routes>
      {/* Footer */}
    </HashRouter>
  );
}

export default App;