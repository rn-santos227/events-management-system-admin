import { useState, type ChangeEvent, type FormEvent } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  loginUser,
  type LoginCredentials,
} from '@/modules/auth/store/authSlice'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  LoaderOverlay,
  TextField,
} from '@/components/ui'
import { getUserFullName } from '@/types/user'

const initialCredentials: LoginCredentials = {
  email: '',
  password: '',
}

function LoginPage() {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth)
  const userState = useAppSelector((state) => state.user)
  const [credentials, setCredentials] = useState<LoginCredentials>(initialCredentials)

  const isSubmitting = authState.status === 'loading' || userState.status === 'loading'
  const errorMessage = authState.error ?? userState.error
  const isAuthenticated = authState.status === 'authenticated' && Boolean(userState.profile)
  const authenticatedUserName = userState.profile ? getUserFullName(userState.profile) : ''

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const field = name as keyof LoginCredentials
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!credentials.email || !credentials.password) return
    dispatch(loginUser(credentials))
  }

}

export default LoginPage
