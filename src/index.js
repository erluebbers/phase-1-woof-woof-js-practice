document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  
  fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => data.forEach((obj) => addPups(obj)))

  function addPups (obj) {
    let pup = document.createElement('span')
    pup.innerText = ` ${obj.name} `
    dogBar.appendChild(pup)
    pup.addEventListener('click', () => {
      let dogCard = document.createElement('div')
      dogCard.innerHTML = `
        <img src=${obj.image} />
        <h2> ${obj.name} </h2>
        <button id="good-bad-btn"> ${obj.isGoodDog === true ? 'Good Boy!' : 'Bad Boy!'}</button>
      `
      document.querySelector('#dog-info').appendChild(dogCard)
      let goodBadBtn = document.querySelector('#good-bad-btn')
          goodBadBtn.addEventListener('click', () => {
          fetch(`http://localhost:3000/pups/${obj.id}`, {
            method: 'PATCH',
            headers: 
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
            body: JSON.stringify({isGoodDog: !obj.isGoodDog})
          })
          .then(() => goodBadBtn.innerText = `${obj.isGoodDog === true ? 'Good Boy!' : 'Bad Boy!'}`)
          console.log(goodBadBtn)
        }) 
    })
  }



  
})