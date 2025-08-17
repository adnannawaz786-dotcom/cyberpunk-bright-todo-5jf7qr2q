import React from 'react';
import { motion } from 'framer-motion';
import TodoList from '../components/TodoList';
import NewTodoForm from '../components/NewTodoForm';
import GlassCard from '../components/ui/GlassCard';
import { useTodos } from '../utils/todoStore';

const TodoPage = () => {
  const { todos, completedCount, totalCount } = useTodos();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            CYBER TODO
          </h1>
          <div className="flex items-center justify-center space-x-4 text-cyan-300">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32"></div>
            <p className="text-lg font-mono tracking-wider">NEURAL TASK INTERFACE</p>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32"></div>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div variants={itemVariants} className="mb-8">
          <GlassCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{totalCount}</div>
                <div className="text-sm text-gray-300 font-mono tracking-wide">TOTAL TASKS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{completedCount}</div>
                <div className="text-sm text-gray-300 font-mono tracking-wide">COMPLETED</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">{completionPercentage}%</div>
                <div className="text-sm text-gray-300 font-mono tracking-wide">EFFICIENCY</div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-6">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* New Todo Form */}
        <motion.div variants={itemVariants} className="mb-8">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 font-mono tracking-wide">
              + NEW TASK PROTOCOL
            </h2>
            <NewTodoForm />
          </GlassCard>
        </motion.div>

        {/* Todo List */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-cyan-400 font-mono tracking-wide">
                ACTIVE TASKS
              </h2>
              {todos.length > 0 && (
                <div className="text-sm text-gray-400 font-mono">
                  {todos.filter(todo => !todo.completed).length} PENDING
                </div>
              )}
            </div>
            <TodoList />
          </GlassCard>
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-8 text-gray-400 font-mono text-sm"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>SYSTEM ONLINE</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TodoPage;