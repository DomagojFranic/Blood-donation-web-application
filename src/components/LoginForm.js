import React from "react";

const LoginForm = ({
  userLogin,
  changeName,
  changePassword,
  username,
  pass,
}) => (
  <form onSubmit={userLogin}>
    <div>
      Korisničko ime:
      <input
        type="text"
        value={username}
        name="Username"
        onChange={changeName}
      />
    </div>
    <div>
      Lozinka:
      <input
        type="password"
        value={pass}
        name="Pass"
        onChange={changePassword}
      />
    </div>
    <button type="submit">Prijava</button>
  </form>
);

export default LoginForm;
