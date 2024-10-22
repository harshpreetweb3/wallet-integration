import {useCallback, useState} from 'react';
import './App.css';
import getProvider from "./utils/getProvider"
import { TLog } from './types';

function App() {

  const [logs, setLogs] = useState<TLog[]>([]);

  const createLog = useCallback(
    (log: TLog) => {
      return setLogs((logs) => [...logs, log]); 
    },
    [setLogs]
  );

  const provider = getProvider();

   /** Connect */
   const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {

      const res = await provider.connect();
      console.log(res.publicKey.toString());
      
    } catch (error : any) {
      createLog({
        status: 'error',
        method: 'connect',
        message: error.message,
      });
    }
  }, [createLog]);



  return (
    <div className="App">
      <header className="App-header">
        
        <button onClick={handleConnect}> connect to phantom </button>
      </header>
    </div>
  );
}

export default App;
