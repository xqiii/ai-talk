import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark';
  apiKeys: {
    openai?: string;
    claude?: string;
  };
  setTheme: (theme: 'light' | 'dark') => void;
  setApiKey: (provider: 'openai' | 'claude', key: string) => void;
  removeApiKey: (provider: 'openai' | 'claude') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      apiKeys: {},
      setTheme: (theme) => set({ theme }),
      setApiKey: (provider, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key },
        })),
      removeApiKey: (provider) =>
        set((state) => {
          const newKeys = { ...state.apiKeys };
          delete newKeys[provider];
          return { apiKeys: newKeys };
        }),
    }),
    {
      name: 'ai-talk-settings',
    }
  )
);

