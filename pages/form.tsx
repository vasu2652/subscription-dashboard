import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Form() {
  return (
    <Container maxWidth="sm">
      <Box >
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard ={'>'} Next.js + Material-UI
        </Typography>
      </Box>
    </Container>
  );
}