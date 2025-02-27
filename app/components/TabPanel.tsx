import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  value: number;
  index: number;
  dir?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, dir, ...other }) => {
  const theme = useTheme(); // Get theme from MUI context

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir={dir || theme.direction} // Use provided dir or theme direction
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;