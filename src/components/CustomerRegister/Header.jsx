import React from 'react'

const Header = () => {
  return (
    <div>
      <p>
          Tässä näkymässä voit katsoa asiakkaita asiakasrekisteristä.
      </p>
      <p>
          Tulostusnappi tulostaa kaikki asiakkaat, jotka ovat avattuja – eli näet koko asiakkaan kaikki tiedot –
          ja näkyvillä jossain kohtaa sivua.
      </p>
      <p>
          Alla oleva filtterikenttä käy kaikki asiakkaat läpi kaikista kentistä.
          Se käy muun muassa syntymäpäivä-, syntymävuosi-, huomioitavaa- ja jopa Ilves vai Tappara -kentän läpi.
          Iästä ei ole kenttää, joten filtteri ei käy niitä läpi.
      </p>
    </div>
  )
}

export default Header
