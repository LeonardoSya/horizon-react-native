import { store } from '@/app/store'
import { selectAuth } from '@/features/auth-slice'

// * 如useAppSelector这样的React hook只能在jsx/hook中调用，而不能在普通函数/模块顶层调用
// * hook调用需要在React的渲染周期内进行

// * 因此直接从Redux store中获取状态，而不是使用useAppSelector hook

export const getAccessToken = () => {
  const state = store.getState()
  const { accessToken } = selectAuth(state)
  return `b ${accessToken}`
}
