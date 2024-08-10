import React from 'react';
import TaskManager from './components/TaskManager';
import { Container, Grid } from '@mui/material';

const App = () => {
  return (
    <Container>
        <Grid item xs={12} sm={8} md={9}>
          <TaskManager />
        </Grid>
    </Container>
  );
};

export default App;
