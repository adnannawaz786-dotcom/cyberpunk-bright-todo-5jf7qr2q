import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Edit3, Trash2 } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit,
  isEditing,
  editText,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSaveEdit(todo.id);
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <GlassCard className="p-4">
        <div className="flex items-center justify-between group">
          <div className="flex items-center flex-1 min-w-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggle(todo.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400'
                  : 'border-gray-400 hover:border-cyan-400'
              }`}
            >
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>

            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={() => onSaveEdit(todo.id)}
                className="flex-1 bg-transparent border-b-2 border-cyan-400 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors duration-200"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 transition-all duration-200 ${
                  todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-white'
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!isEditing && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(todo.id, todo.text)}
                  className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </>
            )}
            {isEditing && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSaveEdit(todo.id)}
                  className="p-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onCancelEdit}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </>
            )}
          </div>
        </div>

        {todo.createdAt && (
          <div className="mt-2 text-xs text-gray-500">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default TodoItem;