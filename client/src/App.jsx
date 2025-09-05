import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";

import Channel from "./pages/Channel/Channel";
import ChannelVideos from "./pages/Channel/ChannelVideos";
import ChannelPlaylist from "./pages/Channel/ChannelPlaylist";
import ChannelTweets from "./pages/Channel/ChannelTweets";
import ChannelSubscribers from "./pages/Channel/ChannelSubscribers";

import EditChannel from "./pages/EditChannel";
import EditPersonalInfo from "./components/EditPersonalInfo";
import ChangePassword from "./components/ChangePassword";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* More routes will be added here */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<HomePage />} />

        <Route path="/channel/:username" element={<Channel />}>
          <Route path="videos" element={<ChannelVideos />} />
          <Route path="playlists" element={<ChannelPlaylist />} />
          <Route path="tweets" element={<ChannelTweets />} />
          <Route path="subscribed" element={<ChannelSubscribers />} />
        </Route>

        <Route path="/edit" element={<EditChannel />}>
          <Route path="personalInfo" element={<EditPersonalInfo />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
        
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