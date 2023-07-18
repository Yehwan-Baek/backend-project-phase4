import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogInPage from "./Organisms/LogInPage";
import SignUpPage from "./Organisms/SignUpPage"

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<NavBar/>}>
          <Route index element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Route> */}
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
