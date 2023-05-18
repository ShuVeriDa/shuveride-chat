import {useEffect, useState} from 'react'
import './App.css'
import {Auth} from "./pages/Auth/Auth.tsx";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {ChatRoom} from "./components/ChatRoom/ChatRoom.tsx";

function App() {
  const getIdInstance =  localStorage.getItem('idInstance');
  const getApiTokenInstance =  localStorage.getItem('apiTokenInstance');




  const [idInstance, setIdInstance] = useState(getIdInstance)
  const [apiTokenInstance, setApiTokenInstance] = useState(getApiTokenInstance)


  useEffect(() => {
    if (getIdInstance && getApiTokenInstance) {
      setIdInstance(getIdInstance);
      setApiTokenInstance(getApiTokenInstance);
    }
  }, [setIdInstance, setApiTokenInstance, getIdInstance, getApiTokenInstance]);

  const handleLogout = () => {
    localStorage.removeItem('idInstance');
    localStorage.removeItem('apiTokenInstance');
    setIdInstance(null);
    setApiTokenInstance(null);
  };

  if (!idInstance || !apiTokenInstance) {
    return <Auth idInstance={idInstance!}
                 setIdInstance={setIdInstance}
                 apiTokenInstance={apiTokenInstance!}
                 setApiTokenInstance={setApiTokenInstance}
    />
  }

  return (
    <Routes>
      <Route path={'/auth'} element={<Auth idInstance={idInstance!}
                                           setIdInstance={setIdInstance}
                                           apiTokenInstance={apiTokenInstance!}
                                           setApiTokenInstance={setApiTokenInstance}
      />}
      />
      <Route path={'/'} element={<MainLayout idInstance={idInstance!}
                                             apiTokenInstance={apiTokenInstance!}
                                             handleLogout={handleLogout}
      />}>
        <Route path={'/room/:id'} element={<ChatRoom idInstance={idInstance!}
                                                 apiTokenInstance={apiTokenInstance!}
        />}
        />
      </Route>
    </Routes>
  )
}

export default App
