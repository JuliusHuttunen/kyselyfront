import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Questionlist from './components/Questionlist';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Kysely
          </Typography>
        </Toolbar>
      </AppBar>
      <Questionlist />
    </div>
  );
}

export default App;
