'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  Settings,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';
import Logo from '@/components/Logo';
import { User, Column, AdminSession } from '@/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);

  const usersPerPage = 10;

  // Default columns
  const defaultColumns: Column[] = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      id: 'datePurchased',
      label: 'Date Purchased',
      type: 'date',
      required: true
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['Active', 'Inactive', 'Pending']
    }
  ];

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      const sessionData = localStorage.getItem('adminSession');
      if (!sessionData) {
        router.replace('/admin/login');
        return;
      }

      try {
        const session: AdminSession = JSON.parse(sessionData);
        if (Date.now() > session.expiresAt) {
          localStorage.removeItem('adminSession');
          router.replace('/admin/login');
          return;
        }
        setIsAuthenticated(true);
      } catch {
        router.replace('/admin/login');
        return;
      }
    };

    checkAuth();

    // Load data from localStorage
    const loadData = () => {
      try {
        const savedUsers = localStorage.getItem('adminUsers');
        const savedColumns = localStorage.getItem('adminColumns');

        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        }

        if (savedColumns) {
          setColumns(JSON.parse(savedColumns));
        } else {
          setColumns(defaultColumns);
          localStorage.setItem('adminColumns', JSON.stringify(defaultColumns));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setColumns(defaultColumns);
      }
      setIsLoading(false);
    };

    loadData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/login');
  };

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
  };

  const saveColumns = (updatedColumns: Column[]) => {
    setColumns(updatedColumns);
    localStorage.setItem('adminColumns', JSON.stringify(updatedColumns));
  };

  const handleAddUser = (userData: Record<string, string | number | boolean>) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: String(userData.name || ''),
      email: String(userData.email || ''),
      datePurchased: String(userData.datePurchased || ''),
      status: userData.status as 'Active' | 'Inactive' | 'Pending',
      ...userData
    };

    saveUsers([...users, newUser]);
    setShowModal(false);
  };

  const handleEditUser = (userData: Record<string, string | number | boolean>) => {
    if (!editingUser) return;

    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? { ...user, ...userData }
        : user
    );

    saveUsers(updatedUsers);
    setEditingUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      saveUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddColumn = (columnData: Omit<Column, 'id'>) => {
    const newColumn: Column = {
      id: Date.now().toString(),
      ...columnData
    };

    saveColumns([...columns, newColumn]);
    setShowColumnModal(false);
  };

  const handleDeleteColumn = (columnId: string) => {
    // Prevent deletion of required default columns
    const defaultIds = defaultColumns.map(col => col.id);
    if (defaultIds.includes(columnId)) {
      alert('Cannot delete required columns');
      return;
    }

    if (confirm('Are you sure you want to delete this column? This will remove the data from all users.')) {
      const updatedColumns = columns.filter(col => col.id !== columnId);
      const updatedUsers = users.map(user => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [columnId]: _, ...rest } = user;
        return rest as User;
      });

      saveColumns(updatedColumns);
      saveUsers(updatedUsers);
    }
  };

  const exportData = () => {
    const csvContent = [
      columns.map(col => col.label).join(','),
      ...users.map(user =>
        columns.map(col => String(user[col.id] || '')).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `byteboost-academy-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="glass-effect border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="medium" href="/" />
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Admin Panel</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">User Management</h1>
            <p className="text-gray-400">Manage Byteboost Academy users and data</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => setShowColumnModal(true)}
              className="glass-effect text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Columns
            </button>
            <button
              onClick={() => {
                setEditingUser(null);
                setShowModal(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-400 mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-gray-400">Total Users</p>
              </div>
            </div>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-400 mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'Active').length}
                </p>
                <p className="text-gray-400">Active Users</p>
              </div>
            </div>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center">
              <EyeOff className="w-8 h-8 text-gray-400 mr-4" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'Pending').length}
                </p>
                <p className="text-gray-400">Pending Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
            />
          </div>
          <button
            onClick={exportData}
            className="glass-effect text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Users Table */}
        <div className="glass-effect rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5">
                    {columns.map((column) => (
                      <td key={column.id} className="px-6 py-4 whitespace-nowrap text-gray-200">
                        {column.id === 'status' ? (
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'Active'
                                ? 'bg-green-900 text-green-200'
                                : user.status === 'Inactive'
                                ? 'bg-red-900 text-red-200'
                                : 'bg-yellow-900 text-yellow-200'
                            }`}
                          >
                            {user.status}
                          </span>
                        ) : (
                          String(user[column.id] || '')
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700">
              <div className="text-sm text-gray-400">
                Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-slate-700 text-gray-300 rounded hover:bg-slate-600 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-slate-700 text-gray-300 rounded hover:bg-slate-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Modal */}
      {showModal && <UserModal />}
      {/* Column Modal */}
      {showColumnModal && <ColumnModal />}
    </div>
  );

  function UserModal() {
    const [formData, setFormData] = useState<Record<string, string | number | boolean>>(
      editingUser || {}
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingUser) {
        handleEditUser(formData);
      } else {
        handleAddUser(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="glass-effect rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {columns.map((column) => (
                <div key={column.id}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {column.label} {column.required && <span className="text-red-400">*</span>}
                  </label>
                  {column.type === 'select' ? (
                    <select
                      required={column.required}
                      value={String(formData[column.id] || '')}
                      onChange={(e) => setFormData({ ...formData, [column.id]: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select {column.label}</option>
                      {column.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : column.type === 'textarea' ? (
                    <textarea
                      required={column.required}
                      value={String(formData[column.id] || '')}
                      onChange={(e) => setFormData({ ...formData, [column.id]: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={column.type}
                      required={column.required}
                      value={String(formData[column.id] || '')}
                      onChange={(e) => setFormData({ ...formData, [column.id]: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function ColumnModal() {
    const [columnData, setColumnData] = useState<{
      label: string;
      type: 'text' | 'email' | 'date' | 'select' | 'textarea';
      required: boolean;
      options: string;
    }>({
      label: '',
      type: 'text',
      required: false,
      options: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const options = columnData.type === 'select'
        ? columnData.options.split(',').map((opt: string) => opt.trim()).filter(Boolean)
        : undefined;

      handleAddColumn({
        label: columnData.label,
        type: columnData.type,
        required: columnData.required,
        options
      });

      setColumnData({ label: '', type: 'text', required: false, options: '' });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="glass-effect rounded-xl max-w-2xl w-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Manage Columns</h2>

            {/* Existing Columns */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Existing Columns</h3>
              <div className="space-y-2">
                {columns.map((column) => (
                  <div key={column.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{column.label}</span>
                      <span className="text-gray-400 text-sm ml-2">({column.type})</span>
                      {column.required && <span className="text-red-400 text-sm ml-2">Required</span>}
                    </div>
                    {!defaultColumns.some(def => def.id === column.id) && (
                      <button
                        onClick={() => handleDeleteColumn(column.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Column */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Add New Column</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Column Label
                </label>
                <input
                  type="text"
                  required
                  value={columnData.label}
                  onChange={(e) => setColumnData({ ...columnData, label: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Column Type
                </label>
                <select
                  value={columnData.type}
                  onChange={(e) => setColumnData({ ...columnData, type: e.target.value as 'text' | 'email' | 'date' | 'select' | 'textarea' })}
                  className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="date">Date</option>
                  <option value="select">Select</option>
                  <option value="textarea">Textarea</option>
                </select>
              </div>

              {columnData.type === 'select' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Options (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={columnData.options}
                    onChange={(e) => setColumnData({ ...columnData, options: e.target.value })}
                    placeholder="Option1, Option2, Option3"
                    className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="required"
                  type="checkbox"
                  checked={columnData.required}
                  onChange={(e) => setColumnData({ ...columnData, required: e.target.checked })}
                  className="h-4 w-4 text-blue-600 bg-slate-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="required" className="ml-2 text-sm text-gray-300">
                  Required field
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowColumnModal(false)}
                  className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Add Column
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}