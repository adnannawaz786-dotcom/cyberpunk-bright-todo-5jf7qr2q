import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import GlassCard from './ui/GlassCard';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return (
      <GlassCard className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">No tasks yet</h3>
          <p className="text-gray-400 max-w-sm">
            Create your first task to get started on your cyberpunk journey to productivity.
          </p>
        </motion.div>
      </GlassCard>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="space-y-6">
      {/* Progress Stats */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="text-cyan-400">
              <span className="font-semibold">{pendingTodos.length}</span>
              <span className="text-gray-400 ml-1">pending</span>
            </div>
            <div className="text-green-400">
              <span className="font-semibold">{completedTodos.length}</span>
              <span className="text-gray-400 ml-1">completed</span>
            </div>
          </div>
          <div className="text-gray-400">
            {todos.length > 0 && (
              <span>
                {Math.round((completedTodos.length / todos.length) * 100)}% complete
              </span>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ 
              width: todos.length > 0 ? `${(completedTodos.length / todos.length) * 100}%` : '0%' 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </GlassCard>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></div>
            Active Tasks
          </h3>
          <div className="space-y-3">
            <AnimatePresence>
              {pendingTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={() => onToggleTodo(todo.id)}
                    onDelete={() => onDeleteTodo(todo.id)}
                    onEdit={(newText) => onEditTodo(todo.id, newText)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
            Completed Tasks
            <span className="text-sm text-gray-400 ml-2">({completedTodos.length})</span>
          </h3>
          <div className="space-y-3">
            <AnimatePresence>
              {completedTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={() => onToggleTodo(todo.id)}
                    onDelete={() => onDeleteTodo(todo.id)}
                    onEdit={(newText) => onEditTodo(todo.id, newText)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;