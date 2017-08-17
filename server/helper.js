// https://developers.google.com/maps/documentation/geocoding/start

let getAddressAndLocation = (data) => {
  let formatted_address =
    data.results[0]['formatted_address']

  let lat =
    data.results[0]['geometry']['location']['lat']

  let lng =
    data.results[0]['geometry']['location']['lng']

  return {
    formatted_address: formatted_address,
    lat: lat,
    lng: lng
  }
}

module.exports = { getAddressAndLocation }