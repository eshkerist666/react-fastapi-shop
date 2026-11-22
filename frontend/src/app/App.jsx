import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter";
import './styles'
import { useActions } from "@/shared/hooks/useActions";
import { useSelector } from "react-redux";
import LoginModal from "@/features/auth/ui/LoginModal";
import RegisterModal from "@/features/auth/ui/RegisterModal";
import { useGetMeQuery } from "@/shared/api/user";

const App = () => {
  const { data: user, isLoading, error } = useGetMeQuery()
  const { closeAuthModal, openAuthModal } = useActions()
  const modal = useSelector(state => state.authModal.type)

  return (
    <BrowserRouter>
      <div className='app-window'>
        <AppRouter />
      </div>

       {modal === 'login' && (
          <LoginModal
              onClose={() => closeAuthModal()}
              onRegister={() => openAuthModal('register')}
          />
            )}
      {modal === 'register' && (
        <RegisterModal
            onClose={() => closeAuthModal()}
            onLogin={() => openAuthModal('login')}
        />
      )}

    </BrowserRouter>
  )
}

export default App