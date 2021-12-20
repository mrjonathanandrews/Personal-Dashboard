fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("image-author").textContent = `By: ${data.user.name}`
    })
    .catch(error => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1501696461415-6bd6660c6742?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzY5OTEyNTI&ixlib=rb-1.2.1&q=85")`
        document.getElementById("image-author").textContent = `By: Pietro De Grandi`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response => {
        if (!response.ok) {
            throw Error("Something went wrong")
        }
        return response.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>$${data.market_data.current_price.usd}</p>
            <p>$${data.market_data.high_24h.usd}</p>
            <p>$${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(error => {
        console.error(error)
    })

function displayCurrentTime() {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let am_pm = "AM"

    if (hours > 12) {
        hours = hours - 12
        am_pm = "PM"
    } else if (hours === 0) {
        hours = 12
    }

    if (minutes < 10) {
        minutes = "0" + minutes.toString()
    }

    if (seconds < 10) {
        seconds = "0" + seconds.toString()
    }

    let time = hours + ":" + minutes + ":" + seconds + " " + am_pm

    document.getElementById("time").innerHTML = time
}

setInterval(displayCurrentTime, 1000)

navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(response => {
            if (!response.ok) {
                throw Error("Weather data is unavailable")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            const temp = Math.round(data.main.temp)
            const city = data.name
            console.log(city)
            document.getElementById("weather").innerHTML = `
                <div id="weather-top">
                    <img src=${iconURL} />
                    <p id="temp">${temp}°F</p>
                </div>
                <p id="city">${city}</p>
            `
        })
        .catch(err => console.error(err))
})