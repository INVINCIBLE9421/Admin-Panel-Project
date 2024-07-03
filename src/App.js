import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import DataFetcher from './components/dataFetcher';
import DashBoard from './pages/dashboardPage';
import ProductPage from './pages/productPage';
import AccountPage from './pages/accountPage';
import Login from './pages/loginPage';
import NavBar from './components/Navbar/navBar';
import AddNewProduct from './pages/addNewProduct';
import { useAuth } from './components/auth';
import { PrivateRouter } from './components/privateRouter';

function App() {
  const { user } = useAuth();
  const status = window.localStorage.getItem("loginStatus");

  return (
    <div className='App'>
      {!status && <DataFetcher />}
      <NavBar />
      <Routes>
        <Route path='/' element={status === "true" ? <Navigate to='/dashboard' /> : <Navigate to="/login" />} />
        <Route path='/dashboard' element={<PrivateRouter><DashBoard /></PrivateRouter>} />
        <Route path='/product' element={<PrivateRouter><ProductPage /></PrivateRouter>} />
        <Route path='/account' element={<PrivateRouter><AccountPage /></PrivateRouter>} />
        <Route path='/addProduct' element={<PrivateRouter><AddNewProduct /></PrivateRouter>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PrivateRouter><DashBoard /></PrivateRouter>} />
      </Routes>
    </div>
  );
}

export default App;
