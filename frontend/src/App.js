import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import Sample from './Pages/Sample';

function App() {
  return (
    <div className='App'>
      <Route path = '/' component = { Homepage } exact/>
      <Route path = '/chats' component = { ChatPage } />
      <Route path = '/sample' component = { Sample } />
    </div>
  );
}

export default App;
