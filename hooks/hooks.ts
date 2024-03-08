import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/app/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const usseAppSelector: TypedUseSelectorHook<RootState> = useSelector