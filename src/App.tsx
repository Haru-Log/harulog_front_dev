import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage';
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
import DashboardPage from './pages/DashboardPage';
import LayoutWithTitle from './components/Layout/LayoutWithTitle';
import { createContext, useState } from "react";
import LoginModal from "./components/LoginRegister/LoginModal";
import RegisterModal from "./components/LoginRegister/RegisterModal";
import EditChallengePage from './pages/EditChallengePage';
import AdminPage from './pages/AdminPage';
import OauthCallbackPage from "./pages/OauthCallbackPage";

type SetModalState = {
  setLoginModal: any;
  setRegisterModal: any;
}

type ModalState = {
  loginModal: boolean;
  registerModal: boolean;
}

export const SetModalContext = createContext<SetModalState | null>(null);
export const ModalContext = createContext<ModalState | null>(null);


function App() {

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  return (
    <div className="App">

      <ModalContext.Provider value={{ loginModal, registerModal }}>
        <SetModalContext.Provider value={{ setLoginModal, setRegisterModal }}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/:nickname" element={<ProfilePage />} />
              <Route path="feed/:id" element={<FeedDetail />} />
              <Route path="challenge/:id" element={<ChallengeDetailPage />} />
              <Route path="chat" element={<ChattingPage />} />
            </Route>
            <Route element={<LayoutWithTitle />}>
              <Route path="feed" element={<FeedPage />} />
              <Route path="feed/create" element={<RecordPage />} />
              <Route path="feed/edit/:id" element={<RecordPage />} />
              <Route path="challenge" element={<ChallengePage />} />
              <Route path="challenge/create" element={<CreateChallengePage />} />
              <Route path="challenge/edit/:id" element={<EditChallengePage />} />
              <Route path="social" element={<SocialPage />} />
              <Route path="grow" element={<GrowPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile/edit" element={<EditMyInfoPage />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route path="/domain/oauth/callback" element={<OauthCallbackPage />} />
          </Routes>

          {loginModal && (
            <LoginModal />
          )}

          {registerModal && (
            <RegisterModal />
          )}

        </SetModalContext.Provider>
      </ModalContext.Provider>


    </div>
  )
    ;
}

export default App;
