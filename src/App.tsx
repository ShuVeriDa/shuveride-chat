import {useState} from 'react'
import './App.css'
import {Auth} from "./pages/Auth/Auth.tsx";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {ChatRoom} from "./components/ChatRoom/ChatRoom.tsx";

function App() {
  const [idInstance, setIdInstance] = useState('1101821859')
  const [apiTokenInstance, setApiTokenInstance] = useState('1fb4df2861ed45ef863acb90effe85810b1d3a2838144fa199')

  console.log(idInstance, ": idInstance ")
  console.log(apiTokenInstance, ": apiTokenInstance ")

  return (
    <Routes>
      <Route path={'/auth'} element={<Auth idInstance={idInstance}
                                           setIdInstance={setIdInstance}
                                           apiTokenInstance={apiTokenInstance}
                                           setApiTokenInstance={setApiTokenInstance}
      />}
      />
      <Route path={'/'} element={<MainLayout idInstance={idInstance}
                                             apiTokenInstance={apiTokenInstance}/>}>
        <Route path={'/room/:id'} element={<ChatRoom idInstance={idInstance}
                                                 apiTokenInstance={apiTokenInstance}
        />}
        />
      </Route>


    </Routes>
  )
}

export default App
