import { useState, useEffect } from 'react'

export const useRouter = (routes: any) => {
  const [currentComponent, setCurrentComponent] = useState(null)

  const init = () => {
    const path = window.location.pathname
    const route = routes.find(route => new RegExp(`^${route.uri}`).test(path))
    route && setCurrentComponent(route.component)
  }

  useEffect(() => {
    window.addEventListener('popstate', init)
    init() // 初始化当前路由

    return () => {
      window.removeEventListener('popstate', init)
    }
  }, [])

  const push = path => {
    window.history.pushState({}, '', path)
    init()
  }
  const replace = path => {
    window.history.replaceState({}, '', path)
    init()
  }

  return { currentComponent, push, replace }
}
