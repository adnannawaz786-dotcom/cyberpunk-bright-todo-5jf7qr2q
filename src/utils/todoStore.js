import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all', // 'all', 'active', 'completed'
      
      addTodo: (text) => {
        const newTodo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
          priority: 'normal', // 'low', 'normal', 'high'
          category: 'general'
        }
        set((state) => ({
          todos: [...state.todos, newTodo]
        }))
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }))
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
      },

      editTodo: (id, newText) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText.trim() } : todo
          )
        }))
      },

      setPriority: (id, priority) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, priority } : todo
          )
        }))
      },

      setCategory: (id, category) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, category } : todo
          )
        }))
      },

      setFilter: (filter) => {
        set({ filter })
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed)
        }))
      },

      reorderTodos: (startIndex, endIndex) => {
        set((state) => {
          const result = Array.from(state.todos)
          const [removed] = result.splice(startIndex, 1)
          result.splice(endIndex, 0, removed)
          return { todos: result }
        })
      },

      getFilteredTodos: () => {
        const { todos, filter } = get()
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      },

      getTodosByCategory: (category) => {
        const { todos } = get()
        return todos.filter((todo) => todo.category === category)
      },

      getTodosByPriority: (priority) => {
        const { todos } = get()
        return todos.filter((todo) => todo.priority === priority)
      },

      getStats: () => {
        const { todos } = get()
        return {
          total: todos.length,
          completed: todos.filter((todo) => todo.completed).length,
          active: todos.filter((todo) => !todo.completed).length,
          highPriority: todos.filter((todo) => todo.priority === 'high' && !todo.completed).length
        }
      },

      // Cyberpunk theme specific actions
      glitchEffect: false,
      setGlitchEffect: (enabled) => set({ glitchEffect: enabled }),
      
      neonMode: true,
      setNeonMode: (enabled) => set({ neonMode: enabled }),

      // Bulk operations
      toggleAllTodos: () => {
        const { todos } = get()
        const allCompleted = todos.every((todo) => todo.completed)
        set((state) => ({
          todos: state.todos.map((todo) => ({
            ...todo,
            completed: !allCompleted
          }))
        }))
      },

      importTodos: (todoList) => {
        const processedTodos = todoList.map((todo, index) => ({
          id: (Date.now() + index).toString(),
          text: todo.text || todo.title || 'Untitled Task',
          completed: todo.completed || false,
          createdAt: todo.createdAt || new Date().toISOString(),
          priority: todo.priority || 'normal',
          category: todo.category || 'general'
        }))
        set((state) => ({
          todos: [...state.todos, ...processedTodos]
        }))
      },

      exportTodos: () => {
        const { todos } = get()
        return JSON.stringify(todos, null, 2)
      }
    }),
    {
      name: 'cyberpunk-todo-storage',
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration logic for version updates
          return {
            ...persistedState,
            neonMode: true,
            glitchEffect: false
          }
        }
        return persistedState
      }
    }
  )
)

export default useTodoStore