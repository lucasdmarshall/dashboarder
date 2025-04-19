import { useState, useEffect } from 'react';

/**
 * Custom hook to manage sidebar collapsed state across components
 * Handles both local state and subscribes to global sidebar events
 * @returns {boolean} - Whether the sidebar is collapsed
 */
const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Get initial state from localStorage on mount
    const storedState = localStorage.getItem('sidebarCollapsed');
    return storedState === 'true';
  });
  
  // Subscribe to custom event for sidebar toggle
  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setIsCollapsed(e.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarToggle', handleSidebarToggle);
    return () => window.removeEventListener('sidebarToggle', handleSidebarToggle);
  }, []);
  
  return isCollapsed;
};

export default useSidebarState; 