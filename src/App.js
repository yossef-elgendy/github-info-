
import './App.css';
import Form from './components/Form';
import CardContainer from './components/Card';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';

function App() {
    const [userInfo, setUserInfo] = useState(null)
    const [forkedRepos, setForkedRepos] = useState([])
    const [mostActiveRepos, setMostActiveRepos] = useState([])
    const [loadingBuffer , setLoadingBuffer ] = useState(false)
  return (
    <div className="App">
      
      <Form 
        setUserInfo={setUserInfo}  
        setForkedRepos={setForkedRepos} 
        setMostActiveRepos={setMostActiveRepos}
        setLoadingBuffer = {setLoadingBuffer}
      />

      
        <div className='App-body'>
          { loadingBuffer && (
            <CircularProgress />
          )}
          { userInfo && !loadingBuffer && (
            <CardContainer
              userInfo={userInfo} 
              forkedRepos={forkedRepos}
              mostActiveRepos={mostActiveRepos}
            />
          )}
        </div>
     
      
      
      
      
    </div>
  );
}

export default App;
