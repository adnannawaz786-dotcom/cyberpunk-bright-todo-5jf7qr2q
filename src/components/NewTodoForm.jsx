import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import  useTodos  from '../utils/todoStore';

const NewTodoForm = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);
  const addTodo = useTodos(state => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({
        text: text.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setText('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const priorityColors = {
    low: 'from-green-400/20 to-emerald-500/20 border-green-400/30',
    medium: 'from-yellow-400/20 to-orange-500/20 border-yellow-400/30',
    high: 'from-red-400/20 to-pink-500/20 border-red-400/30'
  };

  const priorityTextColors = {
    low: 'text-green-300',
    medium: 'text-yellow-300',
    high: 'text-red-300'
  };

  return (
    <GlassCard className="mb-8">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-3">
          <motion.div 
            className="flex-1 relative"
            whileTap={{ scale: 0.995 }}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Add a new task to your cyberpunk agenda..."
              className="w-full bg-black/20 border border-cyan-400/30 rounded-lg px-4 py-3 
                       text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 
                       focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300
                       backdrop-blur-sm"
            />
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-purple-500/10 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: text ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          
          <motion.button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white 
                     rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed
                     hover:from-cyan-400 hover:to-purple-500 transition-all duration-300
                     shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            Add
          </motion.button>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded || text ? 'auto' : 0, 
            opacity: isExpanded || text ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-2 border-t border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-cyan-400" />
                <span className="text-sm text-gray-300 font-medium">Priority:</span>
              </div>
              
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <motion.button
                    key={level}
                    type="button"
                    onClick={() => setPriority(level)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300
                              ${priority === level 
                                ? `bg-gradient-to-r ${priorityColors[level]} ${priorityTextColors[level]}` 
                                : 'bg-black/20 border-gray-600/50 text-gray-400 hover:border-gray-500/50'
                              }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.form>
    </GlassCard>
  );
};

export default NewTodoForm;
