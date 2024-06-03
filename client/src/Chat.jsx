import { useContext, useEffect, useRef, useState } from "react";
import Profile from "./Profile.jsx";
import Logo from "./Logo";
import { UserContext } from "./UserContext.jsx";
import { uniqBy } from "lodash";
import axios from "axios";
import Contact from "./Contact.jsx";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const { username, id, setId, setUsername } = useContext(UserContext);
  const divUnderMessages = useRef();

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);

  function connectToWs() {
    const ws = new WebSocket('ws://localhost:4040');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected. Trying to reconnect.');
        connectToWs();
      }, 1000);
    });
  }
  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({userId,username}) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }
  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    console.log({ev,messageData});
    if ('online' in messageData) {
      showOnlinePeople(messageData.online);
    } else if ('text' in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages(prev => ([...prev, {...messageData}]));
      }
    }
  }
  function logout() {
    axios.post('/logout').then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
    });
  }
  function sendMessage(ev, file = null) {
    if (ev) ev.preventDefault();
    ws.send(JSON.stringify({
      recipient: selectedUserId,
      text: newMessageText,
      file,
    }));
    if (file) {
      axios.get('/messages/' + selectedUserId).then(res => {
        setMessages(res.data);
      });
    } else {
      setNewMessageText('');
      setMessages(prev => ([...prev, {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        _id: Date.now(),
      }]));
    }
  }

  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };
  }
  useEffect(() => {
    axios.get('/people').then(res => {
      const offlinePeopleArr = res.data
        .filter(p => p._id !== id)
        .filter(p => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach(p => {
        offlinePeople[p._id] = p;
      });
      setOfflinePeople(offlinePeople);
    });
  }, [onlinePeople]);

  useEffect(() => {
    if (selectedUserId) {
      axios.get('/messages/'+selectedUserId).then(res => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  const onlinePeopleExclOurUser = {...onlinePeople};
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, '_id');


  return (
    <div className="background">
      <div className="form-card">
        <div className="auth">
          <div className="form-title">Discom</div>
          <div className="form-subtitle">Connect with your friends</div>
          <div className="auth">
            <div className="auth-label">Username</div>
            <input type="text" className="auth-input" value={username} readOnly />
          </div>
          <div className="auth">
            <button onClick={() => {
              setId(null);
              setUsername(null);
            }} className="auth-button">Logout</button>
          </div>
        </div>
      </div>
      <div className="chat-wrapper">
        <div>
          {Object.keys(onlinePeople).map(userId => (
            <div key={userId} className="auth" onClick={() => setSelectedUserId(userId)}>
              {onlinePeople[userId]}
            </div>
          ))}
          {Object.keys(offlinePeople).map(userId => (
            <div key={userId} className="auth" onClick={() => setSelectedUserId(userId)}>
              {offlinePeople[userId].username}
            </div>
          ))}
        </div>
        <div>
          {!selectedUserId && (
            <div className="form-subtitle">Select a person from the sidebar</div>
          )}
          {!!selectedUserId && (
            <div>
              <div>
                {messages.map(message => (
                  <div key={message._id} className={message.sender === id ? 'text-right' : 'text-left'}>
                    <div className={`inline-block p-2 my-2 rounded-md text-sm ${message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}>
                      {message.text}
                      {message.file && (
                        <div>
                          <a target="_blank" rel="noopener noreferrer" href={axios.defaults.baseURL + '/uploads/' + message.file}>
                            {message.file}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
          {!!selectedUserId && (
            <form onSubmit={sendMessage} className="auth">
              <input
                type="text"
                value={newMessageText}
                onChange={ev => setNewMessageText(ev.target.value)}
                placeholder="Type your message here"
                className="auth-input"
              />
              <label className="auth">
                <input type="file" className="hidden" onChange={sendFile} />
              </label>
              <button type="submit" className="auth-button">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
