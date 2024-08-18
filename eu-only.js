function getCookie(name) {
  const value = `; ${document.cookie}`
  return value?.split(`; ${name}=`)[1]?.split(";")[0]
}

function handleZarazConsentAPIReady() {
  const consent_cookie = getCookie("zaraz-consent")
  const isEUCountry = "{{system.device.location.isEUCountry}}" === "1"
  if (!consent_cookie) {
    if (isEUCountry) {
      zaraz.consent.modal = true
    } else {
      zaraz.consent.setAll(true)
      zaraz.consent.sendQueuedEvents()
    }
  }
}

if (zaraz.consent?.APIReady) {
  handleZarazConsentAPIReady()
} else {
  document.addEventListener("zarazConsentAPIReady", handleZarazConsentAPIReady)
}