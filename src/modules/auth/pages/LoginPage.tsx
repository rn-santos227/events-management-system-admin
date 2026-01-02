import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { ROUTES } from '@/constants/routes'
import {
  loginUser,
} from '@/modules/auth/store/authSlice'
import { useAuthState, useUserState } from '@/hooks'
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
  useToast,
} from '@/components/ui'
import { getUserFullName } from '@/types/user'
import { type LoginCredentials } from '../types/auth'

const initialCredentials: LoginCredentials = {
  email: '',
  password: '',
}

function LoginPage() {
  const dispatch = useAppDispatch()
  const authState = useAuthState()
  const userState = useUserState()

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<LoginCredentials>(initialCredentials)

  const isSubmitting = authState.status === 'loading'
  const errorMessage = authState.error ?? userState.error
  const isAuthenticated = authState.status === 'authenticated' && Boolean(authState.token)
  const authenticatedUserName = userState.profile ? getUserFullName(userState.profile) : ''
  const { showToast } = useToast()

  useEffect(() => {
    if (errorMessage) {
      showToast({
        type: 'error',
        title: 'Sign-in failed',
        message: errorMessage,
      })
    }
  }, [errorMessage, showToast])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }, [isAuthenticated, navigate])

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

  return (
    <section className="page-login-section">
      <Card className="page-login-card">
        <CardHeader>
          <CardTitle>Sign in to EMS Admin</CardTitle>
          <CardDescription>
            Use your administrator credentials to access the Events Management dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <TextField
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {errorMessage ? (
              <p className="text-sm font-medium text-red-600" role="alert">
                {errorMessage}
              </p>
            ) : null}

            {isAuthenticated && userState.profile ? (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700" role="status">
                Signed in as <span className="font-semibold">{authenticatedUserName}</span>.
              </p>
            ) : null}

            <Button
              type="submit"
              block
              isLoading={isSubmitting}
              disabled={!credentials.email || !credentials.password}
              loadingText="Signing in"
            >
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="page-login-footer">
          <p>
            Having trouble accessing your account? Reach out to the platform owner to reset your credentials.
          </p>
          {authState.lastLoginAt ? (
            <p className="text-xs text-slate-400">
              Last successful login: {new Date(authState.lastLoginAt).toLocaleString()}
            </p>
          ) : null}
        </CardFooter>
      </Card>
      <LoaderOverlay open={isSubmitting} message="Signing you in…" />
    </section>
  )
}

export default LoginPage
