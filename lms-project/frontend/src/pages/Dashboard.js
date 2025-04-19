import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PageWithSidebar from '../templates/PageWithSidebar';

const DashboardPage = () => {
  return (
    <PageWithSidebar>
      <Box p={5}>
        <Text fontSize="2xl" fontWeight="bold">Dashboard Page</Text>
        {/* Additional content for the Dashboard page goes here */}
      </Box>
    </PageWithSidebar>
  );
};

export default DashboardPage;
