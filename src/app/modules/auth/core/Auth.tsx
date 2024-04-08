import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { WithChildren } from '../../../../_duhope/helpers'
import { LayoutSplashScreen } from '../../../../_duhope/layout/core'
import * as authHelper from './AuthHelpers'
import { AuthModel } from './_models'
import { getUserByToken } from './_requests'
import { UserProps } from '../../../types/app.type'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth:any) => void
  currentUser: UserProps | undefined
  setCurrentUser: Dispatch<SetStateAction<UserProps | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserProps | undefined>()
  const saveAuth = (auth: any) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    // saveAuth(undefined)
    // setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            // setCurrentUser({})
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (authHelper.getAuth()&&authHelper.getAuth()?.user) {
      requestUser(authHelper.getAuth()?.user)
      setCurrentUser(authHelper.getAuth()?.user)
    } else {
      // logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthInit, AuthProvider, useAuth }

