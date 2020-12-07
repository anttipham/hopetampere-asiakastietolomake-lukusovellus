import React from 'react'
import styled from 'styled-components'
import TableRow from '../../TableRow'

const OnPrint = styled.div`
  display: none;

  @media print {
    display: block;
  }
`
const SmallNote = styled.i`
  font-size: 0.7em;
`
const Space = styled.div`
  padding-bottom: 25px;
`
const SignatureLine = styled.hr`
  border-color: black;
  border-bottom: 1px;
`

const PrintView = ({ family }) => {
  const headerStyle = {
  }

  return (
    <OnPrint>
      <table>
        <tbody>
          <TableRow label="Nimi" headerStyle={headerStyle} rowsAreSpaced>
            {family.nimi}
          </TableRow>
          <TableRow label="Sähköposti" headerStyle={headerStyle} rowsAreSpaced>
            {family.sähköposti}
          </TableRow>
          <TableRow label="Lasten määrä" headerStyle={headerStyle} rowsAreSpaced>
            {family.lapset.length}
          </TableRow>
          <TableRow label="Täysi-ikäisten määrä" headerStyle={headerStyle} rowsAreSpaced>
            {family.aikuiset.length + 1}
          </TableRow>
        </tbody>
      </table>
      <SmallNote>
        *Lomakkeen täyttäjä mukaanlukien
      </SmallNote>

      <Space />
      <Space />

      <p>
        Ymmärrän, että Hope – Yhdessä & Yhteisesti ry:ltä saamani lahjoitukset on tarkoitettu
        vain perheeni henkilökohtaiseen käyttöön. Sitoudun siihen, että en myy niitä eteenpäin.
        Tällä asiakastietolomakkeella ilmoittamani tiedot tallennetaan Hopen asiakasrekisterijärjestelmään.
        Vakuutan, että nämä tiedot ovat totuudenmukaisia.
      </p>
      <p>
        Tietosuojaseloste on nähtävissä täällä: https://hopeyhdistys.fi/kaipaan-apua/
      </p>

      <Space />

      <p>
        Allekirjoitus
      </p>
      <Space />
      <SignatureLine />
    </OnPrint>
  )
}

export default PrintView
