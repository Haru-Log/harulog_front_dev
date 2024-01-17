import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import ChallengePage from './pages/ChallengePage';
import SocialPage from './pages/SocialPage';
import ChattingPage from './pages/ChattingPage';
import RecordPage from './pages/RecordPage';
import CreateChallengePage from './pages/CreateChallengePage';
import GrowPage from './pages/GrowPage';
import FeedDetail from './pages/FeedDetail';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import EditMyInfoPage from './pages/EditMyInfoPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LayoutWithTitle from './components/Layout/LayoutWithTitle';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="feed/:id" element={<FeedDetail />} />
          <Route path="challenge/:id" element={<ChallengeDetailPage />} />
          <Route path="chat" element={<ChattingPage />} />
        </Route>
        <Route element={<LayoutWithTitle />}>
          <Route path="edit" element={<EditMyInfoPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/create" element={<RecordPage />} />
          <Route path="challenge" element={<ChallengePage />} />
          <Route path="challenge/create" element={<CreateChallengePage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="grow" element={<GrowPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
