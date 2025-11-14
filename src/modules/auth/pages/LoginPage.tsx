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


