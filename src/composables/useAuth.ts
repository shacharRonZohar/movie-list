import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export interface User {
  id: string
  username: string
  displayName: string
  createdAt: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Fetch current user
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await $fetch<{ user: User }>('/api/auth/me')
      return response.user
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await $fetch<{ user: User }>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      return response.user
    },
    onSuccess: user => {
      queryClient.setQueryData(['auth', 'me'], user)
      router.push('/')
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null)
      queryClient.clear()
      router.push('/login')
    },
  })

  return {
    user: computed(() => userData.value),
    isLoading,
    isAuthenticated: computed(() => !!userData.value && !isError.value),
    isError,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: computed(() => loginMutation.isPending.value),
    loginError: computed(() => loginMutation.error.value),
    logout: logoutMutation.mutate,
    isLoggingOut: computed(() => logoutMutation.isPending.value),
    refetch,
  }
}
