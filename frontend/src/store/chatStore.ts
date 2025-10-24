import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Session, ChatConfig } from '../types/chat';
import { nanoid } from 'nanoid';

interface ChatState {
  sessions: Session[];
  currentSessionId: string | null;
  config: ChatConfig;
  isStreaming: boolean;

  // Session actions
  createSession: () => void;
  deleteSession: (id: string) => void;
  setCurrentSession: (id: string) => void;
  getCurrentSession: () => Session | null;

  // Message actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;

  // Config actions
  setConfig: (config: Partial<ChatConfig>) => void;
  setStreaming: (isStreaming: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      config: {
        model: '',
        provider: 'ollama',
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: '你是一个有帮助的AI助手。请用中文回答所有问题。',
      },
      isStreaming: false,

      createSession: () => {
        const newSession: Session = {
          id: nanoid(),
          title: '新对话',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          sessions: [...state.sessions, newSession],
          currentSessionId: newSession.id,
        }));
      },

      deleteSession: (id: string) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== id);
          const newCurrentId =
            state.currentSessionId === id
              ? newSessions[0]?.id || null
              : state.currentSessionId;

          return {
            sessions: newSessions,
            currentSessionId: newCurrentId,
          };
        });
      },

      setCurrentSession: (id: string) => {
        set({ currentSessionId: id });
      },

      getCurrentSession: () => {
        const state = get();
        return (
          state.sessions.find((s) => s.id === state.currentSessionId) || null
        );
      },

      addMessage: (message) => {
        const state = get();
        const currentSession = state.getCurrentSession();

        if (!currentSession) {
          // Create a new session if none exists
          state.createSession();
          const newSession = get().getCurrentSession();
          if (!newSession) return;

          const newMessage: Message = {
            ...message,
            id: nanoid(),
            timestamp: new Date(),
          };

          set((state) => ({
            sessions: state.sessions.map((s) =>
              s.id === newSession.id
                ? {
                    ...s,
                    messages: [...s.messages, newMessage],
                    updatedAt: new Date(),
                    title:
                      s.messages.length === 0 && message.role === 'user'
                        ? message.content.slice(0, 30) + '...'
                        : s.title,
                  }
                : s
            ),
          }));
          return;
        }

        const newMessage: Message = {
          ...message,
          id: nanoid(),
          timestamp: new Date(),
        };

        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === state.currentSessionId
              ? {
                  ...s,
                  messages: [...s.messages, newMessage],
                  updatedAt: new Date(),
                  title:
                    s.messages.length === 0 && message.role === 'user'
                      ? message.content.slice(0, 30) + '...'
                      : s.title,
                }
              : s
          ),
        }));
      },

      updateMessage: (id: string, content: string) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === state.currentSessionId
              ? {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === id ? { ...m, content } : m
                  ),
                  updatedAt: new Date(),
                }
              : s
          ),
        }));
      },

      deleteMessage: (id: string) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === state.currentSessionId
              ? {
                  ...s,
                  messages: s.messages.filter((m) => m.id !== id),
                  updatedAt: new Date(),
                }
              : s
          ),
        }));
      },

      clearMessages: () => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === state.currentSessionId
              ? {
                  ...s,
                  messages: [],
                  updatedAt: new Date(),
                }
              : s
          ),
        }));
      },

      setConfig: (config) => {
        set((state) => ({
          config: { ...state.config, ...config },
        }));
      },

      setStreaming: (isStreaming) => {
        set({ isStreaming });
      },
    }),
    {
      name: 'ai-talk-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
        config: state.config,
      }),
    }
  )
);

