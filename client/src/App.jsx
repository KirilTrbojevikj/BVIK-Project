import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components';
import { CreateCase, DetailsCase, Home, Profile } from './pages';

const App = () => {
  return (
    <div>
     
      <div>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-case' element={<CreateCase />} />
          <Route path='/details/:id' element={<DetailsCase />} />
        </Routes>
      </div>

    </div>
  )
}

export default App