const dataSheetParser = (data) => {
  const lapset = JSON.parse(data.lapset).map((lapsi) => ({
    ...lapsi,
    syntymäpäivä: new Date(lapsi.syntymäpäivä)
  }))

  return {
    aika: new Date(data.aika),
    tyyppi: data.tyyppi,
    sähköposti: data.sähköposti,
    nimi: data.nimi,
    syntymävuosi: Number(data.syntymävuosi),
    osoite: data.osoite,
    puhelinnumero: data.puhelinnumero,
    elämäntilanne: data.elämäntilanne,
    ilvestappara: data.ilvestappara,
    aikuiset: JSON.parse(data.aikuiset),
    lapset,
    huomioitavaa: data.huomioitavaa,
    id: data.id,
  }
}

export default dataSheetParser