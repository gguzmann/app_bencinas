export const bencineraBarata = (data) => {
    // Filtramos las estaciones que tienen precio para el tipo de combustible "93" y luego ordenamos el array por ese precio
    const estacionesConPrecio93 = data.filter(estacion => estacion.precios["93"]);
    estacionesConPrecio93.sort((a, b) => parseFloat(a.precios["93"].precio) - parseFloat(b.precios["93"].precio));

    // La primera estación en el array ordenado será la que tenga el precio más bajo para el tipo de combustible "93"
    const estacionMasBarata = estacionesConPrecio93[0];

    console.log("Estación con el precio más bajo para el tipo de combustible '93':", estacionMasBarata?.codigo);
    return estacionesConPrecio93
}



export const getParaderosInRegion = (data, region) => {
    console.log("getParaderosInRegion")
    return data.filter(benc => {
      const lat = Number(benc.ubicacion.latitud.replace(",", "."))
      const long = Number(benc.ubicacion.longitud.replace(",", "."))
      return (
        lat >= region.latitude - region.latitudeDelta / 2 && // Verifica si la latitud del paradero está dentro de los límites norte y sur de la región visible.
        lat <= region.latitude + region.latitudeDelta / 2 &&
        long >= region.longitude - region.longitudeDelta / 2 && // Verifica si la longitud del paradero está dentro de los límites este y oeste de la región visible.
        long <= region.longitude + region.longitudeDelta / 2
      )
    })
  }
