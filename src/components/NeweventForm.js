import React, {useState} from "react";

const NeweventForm = (props) => {
  const [inputDate, setDate] = useState("")
  const [inputOrganizer, setOrganizer] = useState("Unesite organizatora:")
  const [inputLocation, setLocation] = useState("Unesite lokaciju:")
  const [inputAddress, setAddress] = useState("Unesite adresu:")
  const [inputTime, setTime] = useState("Unesite vrijeme:")
  
  const changeDate = (e) => {
    setDate(e.target.value)
  }

  const changeOrganizer = (e) => {
    setOrganizer(e.target.value)
  }

  const changeLocation = (e) => {
    setLocation(e.target.value)
  }

  const changeAddress = (e) => {
    setAddress(e.target.value)
  }

  const changeTime = (e) => {
    setTime(e.target.value)
  }

  const newNewevent = (e) => {
      e.preventDefault()
      props.saveNewevent({
          dejt: inputDate,
          organizer: inputOrganizer,
          location: inputLocation,
          address: inputAddress,
          time: inputTime,
          done: Math.random() > 0.5
      })
      setDate("")
      setOrganizer("Unesite organizatora:")
      setLocation("Unesite lokaciju:")
      setAddress("Unesite adresu:")
      setTime("Unesite vrijeme:")
  }
  return (
    <div>
      <h2>Stvori novi događaj</h2>
      <form onSubmit={newNewevent}>
        <input type='date' value={inputDate} onChange={changeDate} />
        <input value={inputOrganizer} onChange={changeOrganizer} />
        <input value={inputLocation} onChange={changeLocation} />
        <input value={inputAddress} onChange={changeAddress} />
        <input value={inputTime} onChange={changeTime} />
        <button type="submit">Spremi</button>
      </form>
    </div>
  );
};
export default NeweventForm;
