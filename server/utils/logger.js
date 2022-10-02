const info = (...newevents) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...newevents);
  }  
}

const mistake = (...newevents) => {
  console.error(...newevents);
}

module.exports = {info, mistake}