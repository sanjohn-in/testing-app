type StoreState = {
  isAuth: boolean
  userName: string
  email: string
}

export const useStore = () => {
  const state = useState<StoreState>('store', () => ({
    isAuth: false,
    userName: '',
    email: '',
  }))

  const login = (userName: string, email: string) => {
    state.value.isAuth = true
    state.value.userName = userName
    state.value.email = email
  }

  const logout = () => {
    state.value.isAuth = false
    state.value.userName = ''
    state.value.email = ''
  }

  return {
    state,
    login,
    logout,
  }
}
