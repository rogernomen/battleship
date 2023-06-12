import React from 'react';
import {BoardComponent} from "./modules";
import styles from './App.module.css'

function App() {
  return (
      <div className={styles.root}>
        <BoardComponent />
      </div>
  );
}

export default App;
