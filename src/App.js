import './App.css';
import ArticlesPage from './components/articles/ArticlesPage';
import { useDispatch } from "react-redux";
import { serverActions } from "./store/serverUrl";


function App() {

  const { REACT_APP_MODE } = process.env;
  const dispatch = useDispatch();
  dispatch(serverActions.setServerUrl(REACT_APP_MODE));
  


  return (
      <div className="app_container">
        <ArticlesPage />
      </div>
  );
}

export default App;
