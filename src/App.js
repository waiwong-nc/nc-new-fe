import './App.scss';
import { useDispatch } from "react-redux";
import { serverActions } from "./store/serverUrl";
import {RouterProvider } from 'react-router-dom'; 
import router from './router'; 


function App() {

  const { REACT_APP_MODE } = process.env;
  const dispatch = useDispatch();
  dispatch(serverActions.setServerUrl(REACT_APP_MODE));
  
  return <RouterProvider router={router} />
};

export default App;
