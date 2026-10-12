import { createContext, useState, useContext, useEffect } from 'react';
import { mockInventory, mockUsers, mockTransactions, mockNotifications } from '../data/mockDB';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [inventory, setInventory] = useState(mockInventory);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [usersList, setUsersList] = useState(mockUsers);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [user, setUser] = useState(null); 
  
  // Set default to Light Mode
  const [isDarkMode, setIsDarkMode] = useState(false); 
  
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const clearToast = () => {
    setToast(null);
  };

  const simulateLoading = (callback) => {
    setIsLoading(true);
    setTimeout(() => { callback(); setIsLoading(false); }, 600);
  };

  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      simulateLoading(() => {
        const foundUser = usersList.find(u => u.email === email && u.password === password);
        if (foundUser) {
          setUser(foundUser);
          resolve(foundUser);
        } else reject(new Error('Invalid credentials'));
      });
    });
  };
  
  const logout = () => {
    simulateLoading(() => setUser(null));
  };

  const updateProfile = (updatedData) => {
    setUser({ ...user, ...updatedData });
    setUsersList(usersList.map(u => u.id === user.id ? { ...u, ...updatedData } : u));
    showToast('Profile updated successfully.');
  };

  const addInventoryItem = (item) => {
    setInventory([item, ...inventory]);
    showToast('Asset provisioned successfully.');
  };

  const updateInventoryItem = (updatedItem) => {
    setInventory(inventory.map(i => i.id === updatedItem.id ? updatedItem : i));
    showToast('Asset updated successfully.');
  };

  const deleteInventoryItem = (id) => {
    setInventory(inventory.filter(i => i.id !== id));
    showToast('Asset removed from system.', 'warning');
  };

  return (
    <AppContext.Provider value={{ 
      inventory, setInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem,
      transactions, setTransactions, 
      usersList, notifications, markNotificationsRead,
      user, login, logout, updateProfile, simulateLoading,
      isDarkMode, setIsDarkMode, toast, showToast, clearToast, isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);