import React, { useState, useEffect, useRef } from "react";
import Newevent from "./components/Newevent";
import LoginForm from "./components/LoginForm";
import NeweventForm from "./components/NeweventForm";
import Changeable from "./components/Changeable";
import neweventActions from "./services/newevents";
import loginActions from "./services/login";

import './Application.css'

const App = (props) => {
  const [newevents, setNewevents] = useState([]);
  const [printAll, setPrint] = useState(true);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(null);

  const neweventFormRef = useRef()

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginActions.login({
        username,
        pass,
      });
      window.localStorage.setItem(
        "prijavljeniKorisnik",
        JSON.stringify(user)
      );
      neweventActions.setToken(user.token);
      setUser(user);
      setUsername("");
      setPass("");
      console.log(user);
    } catch (exception) {
      alert("Neispravni podaci");
    }
  };

  const neweventsToPrint = printAll
    ? newevents
    : newevents.filter((newevent) => newevent.organizer === "KBC Split");

  const changeDoneNewevent = (id) => {
    const newevent = newevents.find((ne) => ne.id === id);
    const modNewevent = {
      ...newevent,
      done: !newevent.done,
    };

    neweventActions.update(id, modNewevent).then((response) => {
      console.log(response);
      setNewevents(newevents.map((ne) => (ne.id !== id ? ne : response.data)));
    });
  };

  const deleteNewevent = (id) => {
    neweventActions.deletee(id).then((response) => {
      console.log(response);
      setNewevents(newevents.filter((ne) => ne.id !== id));
    });
  };

  useEffect(() => {
    neweventActions.getAll().then((res) => setNewevents(res.data));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "prijavljeniKorisnik"
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      neweventActions.setToken(user.token);
    }
  }, []);

  const newNewevent = (newObject) => {
    neweventFormRef.current.changeVisibility()
    neweventActions.create(newObject).then((res) => {
      setNewevents(newevents.concat(res.data));
    });
  };

  const loginForm = () => {
    return (
      <Changeable title="Prijavi se">
        <LoginForm
          username={username}
          pass={pass}
          changeName={({ target }) => setUsername(target.value)}
          changePassword={({ target }) => setPass(target.value)}
          userLogin={userLogin}
        />
      </Changeable>
    );
  };

  const neweventForm = () => (
    <Changeable title='Novi događaj' ref={neweventFormRef}>
      <NeweventForm
        saveNewevent={newNewevent}
      />
    </Changeable>
  )

  return (
    <div className="main">
        <h1 className="maintitle">CRVENI KRIŽ SPLIT</h1>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>Prijavljeni ste kao {user.name}.</p>
            {neweventForm()}
          </div>
        )}

        <h1>Novi događaji</h1>
        <div>
          <button onClick={() => setPrint(!printAll)}>
            Filter{printAll ? ": Svi događaji" : ": KBC Split"}
          </button>
        </div>
        <table className="newtable">
          <thead>
            <tr>
              <th className="columnheader"><h2>Datum</h2></th>
              <th className="columnheader"><h2>Organizator</h2></th>
              <th className="columnheader"><h2>Lokacija</h2></th>
              <th className="columnheader"><h2>Adresa</h2></th>
              <th className="columnheader"><h2>Vrijeme</h2></th>
            </tr>
          </thead>
          <tbody>
            {neweventsToPrint.map((ne) => (
              <Newevent
                key={ne.id}
                newevent={ne}
                changeDone={() => changeDoneNewevent(ne.id)}
                deleteNewevent={() => deleteNewevent(ne.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;
