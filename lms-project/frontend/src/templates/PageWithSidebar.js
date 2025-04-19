import React from 'react';
import { 
  Box, 
  Container, 
  Flex 
} from '@chakra-ui/react';
import StudentSidebar from '../components/StudentSidebar';
import useSidebarState from '../hooks/useSidebarState';

/**
 * PageWithSidebar - A template component that handles the sidebar layout
 * for student pages with proper responsiveness for sidebar collapsed state
 * 
 * @param {Object} props 
 * @param {React.ReactNode} props.children - Content to render in the main area
 * @param {string} props.bg - Background color of the main content area (default: "white")
 * @param {boolean} props.fullWidth - Whether the container should be full width
 * @returns {JSX.Element}
 */
const PageWithSidebar = ({ children, bg = "white", fullWidth = false }) => {
  const isSidebarCollapsed = useSidebarState();
  
  return (
    <Flex width="100%" height="100%">
      <StudentSidebar />
      
      <Box 
        ml={isSidebarCollapsed ? "60px" : "250px"} 
        width={isSidebarCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
        mt="85px" 
        pb={8} 
        px={{ base: 4, md: 6 }} 
        position="relative" 
        bg={bg}
        transition="all 0.3s ease"
        flex="1"
        overflowX="hidden"
      >
        <Container 
          maxW={fullWidth ? "100%" : (isSidebarCollapsed ? "container.xl" : "container.lg")} 
          p={0} 
          mx="auto" 
          transition="all 0.3s ease"
          width="100%"
        >
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default PageWithSidebar; 