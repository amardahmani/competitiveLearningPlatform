import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import React from "react";

const OutputWindow = ({ outputDetails,open,handleClose }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3" align="center">OUTPUT</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
        <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Typography variant="body2" sx={{ fontWeight: '600', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', bgcolor: '#f3f4f6' }}>
            Status: {outputDetails?.status?.description}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: '600', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', bgcolor: '#f3f4f6' }}>
            Memory: {outputDetails?.memory}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: '600', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', bgcolor: '#f3f4f6' }}>
            Time: {outputDetails?.time}
          </Typography>
        </Box>
        
        </DialogContent>
      </Dialog>
      
    </>
  );
};

export default OutputWindow;