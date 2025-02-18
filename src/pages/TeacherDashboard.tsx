import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, ClockIcon, BookOpenIcon, GraduationCapIcon, FileTextIcon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Task, User } from '../types';

const TeacherDashboard = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'student')
          .order('created_at', { ascending: false })
          .limit(5);

        if (studentsError) throw studentsError;
        setStudents(studentsData);

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
      title: 'Student History',
      icon: ClockIcon,
      description: 'View student experiments',
      path: '/history',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Assign Tasks',
      icon: BookOpenIcon,
      description: 'Create new assignments',
      path: '/tasks/assign',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'View Tasks',
      icon: UsersIcon,
      description: 'Check student submissions',
      path: '/tasks/view',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Assign Grades',
      icon: GraduationCapIcon,
      description: 'Grade student work',
      path: '/grades',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Reports',
      icon: FileTextIcon,
      description: 'Generate class reports',
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
          <h1 className="text-4xl font-bold text-white mb-4">Teacher Dashboard</h1>
          <p className="text-purple-200 text-lg">Manage your virtual classroom</p>
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
            {/* Recent Students */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Students</h2>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-white/5 rounded-lg" />
                  ))}
                </div>
              ) : students.length > 0 ? (
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-white font-medium">{student.name}</h3>
                      <p className="text-purple-200 text-sm">{student.email}</p>
                      <p className="text-purple-200 text-xs">
                        Joined: {new Date(student.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-purple-200">No students found</p>
              )}
            </div>

            {/* Pending Tasks */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Pending Tasks</h2>
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
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-purple-200">No pending tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherDashboard;