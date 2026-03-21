// useAppwrite.ts
export const refreshAuthStore = async () => {
  try {
    const useAuthStore = (await import('@/store/auth.store')).default;
    await useAuthStore.getState().fetchAuthenticatedUser();
  } catch (e) {
    console.error('refreshAuthStore error', e);
  }
};

export const clearAuthStore = async () => {
  try {
    const useAuthStore = (await import('@/store/auth.store')).default;
    useAuthStore.getState().setIsAuthenticated(false);
    useAuthStore.getState().setUser(null);
  } catch (e) {
    console.error('clearAuthStore error', e);
  }
};