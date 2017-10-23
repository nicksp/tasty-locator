function autocomplete(input, latInput, lngInput) {
  if (!input) return
  const dropdown = new google.maps.places.Autocomplete(input)

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace()
    latInput.value = place.geometry.location.lat()
    lngInput.value = place.geometry.location.lng()
  })

  // Prevent submitting the form on the address field
  input.on('keydown', e => {
    if (13 === e.keyCode) e.preventDefault()
  })
}

export default autocomplete
