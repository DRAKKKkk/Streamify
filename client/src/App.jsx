import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* More routes will be added here */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<HomePage />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/watch/:videoId" element={<VideoDetail />} />
        <Route path="/collections" element={<AdminDashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/subscriptions" element={<MySubscriptions />} />
      </Route>
    </Routes>
  );
}
export default App;