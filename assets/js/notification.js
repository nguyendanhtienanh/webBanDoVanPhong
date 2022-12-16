function notification(text) {
    const alert = document.querySelector(".quick-alert")
    const alertContent = document.querySelector(".quick-alert > p")
    alertContent.innerHTML = text;
    alert.style.background = "rgb(126, 232, 140)"
    alert.style.display = "flex"
    setTimeout(() => {
        alert.style.display = "none"
    }, 800)
}

function warningNotification(text) {
    const alert = document.querySelector(".quick-alert")
    const alertContent = document.querySelector(".quick-alert > p")
    alertContent.innerHTML = text;
    alert.style.background = "rgb(239, 131, 129)"
    alert.style.display = "flex"
    setTimeout(() => {
        alert.style.display = "none"
    }, 800)
}