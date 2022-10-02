import React from 'react'
import './Newevent.css'
                     
const Newevent = ({newevent, deleteNewevent, changeDone}) => {
  const mark = newevent.done
  ? 'označi kao neodrađeno' : 'označi kao odrađeno'
  
  return (
    <tr className='newevent'>
      <td className={newevent.done ? 'neodrađeno' : 'odrađeno'}>{newevent.dejt}</td>
      <td className={newevent.done ? 'neodrađeno' : 'odrađeno'}>{newevent.organizer}</td>
      <td className={newevent.done ? 'neodrađeno' : 'odrađeno'}>{newevent.location}</td>
      <td className={newevent.done ? 'neodrađeno' : 'odrađeno'}>{newevent.address}</td>
      <td className={newevent.done ? 'neodrađeno' : 'odrađeno'}>{newevent.time}</td>
      <td><button onClick={deleteNewevent}><span role="img" aria-label="delete">❌</span></button></td>
      <td><button onClick={changeDone}>{mark}</button></td>
    </tr>
  )
}

export default Newevent