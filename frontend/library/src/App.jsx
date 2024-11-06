import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Add from './Pages/Add';
import Books from './Pages/Books';
import Update from './Pages/Update';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Books />} />        
        <Route path='/add' element={<Add />} />        
        <Route path='/update/:id' element={<Update />} />        
      </Routes>
    </div>
  );
}

export default App;
