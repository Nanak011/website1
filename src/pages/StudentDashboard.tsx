import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, ClockIcon, BookOpenIcon, GraduationCapIcon, FileTextIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Experiment, Task } from '../types';

const StudentDashboard = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch experiments
        const { data: experimentsData, error: experimentsError } = await supabase
          .from('experiments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (experimentsError) throw experimentsError;
        setExperiments(experimentsData);

        // Fetch tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .order('due_date', { ascending: true })
          .limit(5);

        if (tasksError) throw tasksError;
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const menuItems = [
    {
      title: 'Conduct Experiment',
      icon: BeakerIcon,
      description: 'Access virtual labs',
      path: '/experiments',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'History',
      icon: ClockIcon,
      description: 'View past experiments',
      path: '/history',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Tasks',
      icon: BookOpenIcon,
      description: 'View assigned tasks',
      path: '/tasks',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Grades',
      icon: GraduationCapIcon,
      description: 'Check your marks',
      path: '/grades',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Reports',
      icon: FileTextIcon,
      description: 'Download experiment summaries',
      path: '/reports',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Student Dashboard</h1>
          <p className="text-purple-200 text-lg">Welcome back! Ready to explore science?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <Link to={item.path} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} p-3 mb-4`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
                  <p className="text-purple-200">{item.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            {/* Recent Experiments */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Experiments</h2>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-white/5 rounded-lg" />
                  ))}
                </div>
              ) : experiments.length > 0 ? (
                <div className="space-y-4">
                  {experiments.map((experiment) => (
                    <div
                      key={experiment.id}
                      className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-white font-medium">{experiment.title}</h3>
                      <p className="text-purple-200 text-sm">{experiment.type}</p>
                      <p className="text-purple-200 text-xs">
                        {new Date(experiment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-purple-200">No recent experiments</p>
              )}
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Upcoming Tasks</h2>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-white/5 rounded-lg" />
                  ))}
                </div>
              ) : tasks.length > 0 ? (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-white font-medium">{task.title}</h3>
                      <p className="text-purple-200 text-sm">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                      <div className="flex items-center mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'completed'
                              ? 'bg-green-500/20 text-green-200'
                              : task.status === 'graded'
                              ? 'bg-blue-500/20 text-blue-200'
                              : 'bg-yellow-500/20 text-yellow-200'
                          }`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        {task.grade && (
                          <span className="ml-2 text-purple-200 text-sm">
                            Grade: {task.grade}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-purple-200">No upcoming tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;