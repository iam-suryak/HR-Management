import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Clock, Flag, Zap, Plus, 
  Search, MessageCircle, Calendar, ChevronRight, Check, Sparkles 
} from 'lucide-react';

export default function TasksTab({ onShowNotification }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'in_progress' | 'completed' | 'high'
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Wiring Dashboard Analytics",
      description: "Implement live telemetry charts and attendance summary widgets for HR management team.",
      priority: "High",
      status: "In Progress",
      completed: false,
      progress: 85,
      dueDate: "27 April",
      comments: 3,
      assignees: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 2,
      title: "API Integration for Attendance Radius",
      description: "Geofencing GPS verification endpoint for Jalan Pemuda Office HQ with mock fallback.",
      priority: "Medium",
      status: "In Progress",
      completed: false,
      progress: 60,
      dueDate: "29 April",
      comments: 1,
      assignees: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 3,
      title: "Review Q2 Employee Health Benefits",
      description: "Complete annual healthcare insurance enrolment and wellness allowance questionnaire.",
      priority: "Normal",
      status: "Completed",
      completed: true,
      progress: 100,
      dueDate: "25 April",
      comments: 0,
      assignees: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 4,
      title: "Mobile Push Notification Setup",
      description: "Configure push reminders for daily attendance check-in and unread HR announcements.",
      priority: "High",
      status: "Pending",
      completed: false,
      progress: 35,
      dueDate: "30 April",
      comments: 2,
      assignees: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
      ]
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        const nextProgress = nextCompleted ? 100 : 50;
        const nextStatus = nextCompleted ? "Completed" : "In Progress";
        
        onShowNotification?.({
          title: nextCompleted ? "Task Completed 🎉" : "Task Reopened",
          message: `${t.title} is now ${nextStatus.toLowerCase()}.`,
          type: nextCompleted ? "success" : "info"
        });

        return {
          ...t,
          completed: nextCompleted,
          progress: nextProgress,
          status: nextStatus
        };
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      description: "Personal assigned task created in Work Mate mobile workspace.",
      priority: "Medium",
      status: "In Progress",
      completed: false,
      progress: 0,
      dueDate: "02 May",
      comments: 0,
      assignees: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
      ]
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setShowAddForm(false);

    onShowNotification?.({
      title: "New Task Created",
      message: `"${newTask.title}" added to your task backlog.`,
      type: "success"
    });
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'in_progress') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'high') return t.priority === 'High';
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const inProgressCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-2xl p-2.5 border border-slate-100/90 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block">TOTAL</span>
          <div className="text-lg font-bold text-slate-900 mt-0.5">{tasks.length}</div>
          <span className="text-[9.5px] text-[#635BFF] font-semibold">Active Sprint</span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 border border-slate-100/90 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block">IN PROGRESS</span>
          <div className="text-lg font-bold text-[#635BFF] mt-0.5">{inProgressCount}</div>
          <span className="text-[9.5px] text-slate-500 font-medium">Under review</span>
        </div>

        <div className="bg-white rounded-2xl p-2.5 border border-slate-100/90 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block">COMPLETED</span>
          <div className="text-lg font-bold text-emerald-600 mt-0.5">{completedCount}</div>
          <span className="text-[9.5px] text-emerald-600 font-medium">Done this week</span>
        </div>
      </div>

      {/* Filter Tabs & Add Action */}
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: `All (${tasks.length})` },
            { id: 'in_progress', label: `Pending (${inProgressCount})` },
            { id: 'completed', label: `Done (${completedCount})` },
            { id: 'high', label: 'High Priority' },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                filter === f.id 
                  ? 'bg-[#635BFF] text-white shadow-xs' 
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(prev => !prev)}
          className="w-7 h-7 rounded-full bg-[#635BFF] hover:bg-[#5248E2] text-white flex items-center justify-center transition active:scale-90 flex-shrink-0 cursor-pointer shadow-xs"
          title="Create New Task"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Quick Add Task Input */}
      {showAddForm && (
        <form onSubmit={handleAddTask} className="bg-white rounded-2xl p-3 border border-[#635BFF]/30 shadow-xs space-y-2 animate-in fade-in duration-150">
          <div className="text-xs font-bold text-slate-900">Add New Sprint Task</div>
          <input 
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="e.g. Implement Biometric Auth check"
            className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
            autoFocus
          />
          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-[10.5px] px-3 py-1 rounded-lg text-slate-500 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-[10.5px] px-3 py-1 rounded-lg bg-[#635BFF] hover:bg-[#5248E2] text-white font-bold cursor-pointer shadow-2xs"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-2xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800">No tasks in this view</p>
            <p className="text-[11px] text-slate-400 mt-0.5">All tasks for this filter have been completed!</p>
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div 
              key={t.id}
              className={`bg-white rounded-2xl p-3.5 border transition-all duration-150 space-y-2.5 shadow-2xs ${
                t.completed 
                  ? 'border-emerald-100/80 bg-emerald-50/20' 
                  : 'border-slate-100/90 hover:border-[#635BFF]/30'
              }`}
            >
              {/* Task Header & Checkbox */}
              <div className="flex items-start space-x-2.5">
                <button
                  type="button"
                  onClick={() => toggleTaskCompletion(t.id)}
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition flex-shrink-0 cursor-pointer mt-0.5 ${
                    t.completed 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : 'border-2 border-slate-300 hover:border-[#635BFF] text-transparent'
                  }`}
                  title={t.completed ? "Mark incomplete" : "Mark complete"}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      t.priority === 'High' 
                        ? 'bg-rose-100 text-rose-700' 
                        : t.priority === 'Medium' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-blue-100 text-blue-700'
                    }`}>
                      {t.priority}
                    </span>

                    <span className={`text-[9px] font-semibold ${
                      t.completed ? 'text-emerald-600' : 'text-slate-400'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold leading-snug ${
                    t.completed ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}>
                    {t.title}
                  </h4>

                  <p className="text-[10.5px] text-slate-500 leading-normal line-clamp-2 mt-1">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9.5px] font-semibold">
                  <span className="text-slate-400">Progress</span>
                  <span className={t.completed ? 'text-emerald-600' : 'text-[#635BFF]'}>
                    {t.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      t.completed ? 'bg-emerald-500' : 'bg-[#635BFF]'
                    }`}
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
              </div>

              {/* Card Footer: Due Date, Assignees, Comments */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px] text-slate-400 font-semibold">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Due {t.dueDate}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3 text-slate-400" />
                    <span>{t.comments}</span>
                  </div>

                  <div className="flex -space-x-1.5">
                    {t.assignees.map((a, i) => (
                      <img 
                        key={i} 
                        src={a} 
                        alt="Assignee" 
                        className="w-4 h-4 rounded-full ring-1 ring-white object-cover" 
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
