# Hope Tampere - Asiakastietolomakkeen lukuohjelma

Kehittämäni sovellus, joka lukee Hope Tampereen Google Formsin asiakaslomakkeita ja antaa intuitiivisemman tavan lukea lomakkeiden tietoja.

Jotta lukusovellusta voisi käyttää, täytyy
1. luoda Google Forms -lomake, jossa kysytään seuraavat kysymykset sanatarkasti:
   - _Yhteydenottoni koskee_
   
     Kysymysmuodoksi _Valintaruudut_, joissa on vaihtoehtoina:
     - Asiakaskäyntiä
     - Harrastustukihakemusta
     
   - _Sähköpostiosoite_
   - _Huoltajan nimi_
   - _Huoltajan syntymävuosi_
   - _Osoite, postinumero ja postitoimipaikka_
   - _Puhelinnumero_
   - _Elämäntilanne_
   - _Ilves vai Tappara_
   - _Kaikkien muiden taloudessa asuvien täysi-ikäisten koko nimi ja syntymävuosi_
       
     Kenttiin halutaan teksti muodossa `Etunimi1 Sukunimi1 (syntymävuosi1), Etunimi2 Sukunimi2 (syntymävuosi2) ja Etunimi3 Sukunimi3 (syntymävuosi3)`.
     
     Koska asiakkaalta vaaditaan tarkkuutta, tähän laitetaan validointi:
     
     ⋮ -> Vastauksen vahvistus -> Säännöllinen lauseke -> Vastineet -> `[^\(0-9\),]+\([0-9]{4}\)((,| ja )[^\(0-9\),]+\([0-9]{4}\))*`

   - _1\. lapsen sukupuoli_
   - _1\. lapsen syntymäpäivä_
   - _1\. lapsen vaatekoko_
   - _1\. lapsen kenkäkoko_
   - _1\. lapsen kiinnostuksen kohteet_
   - _2\. lapsen sukupuoli_
   - _2\. lapsen syntymäpäivä_
   - _2\. lapsen vaatekoko_
   - _2\. lapsen kenkäkoko_
   - _2\. lapsen kiinnostuksen kohteet_
   - ⋮ (niin monta lapsikenttää kuin halutaan)
     
     Lasten syntymäpäiviin laitetaan kysymysmuodoksi Formsissa _Päivämäärä_.
     Lapsikenttiin ei ole mahdollista laittaa dynaamisesti vaihtuvia lapsikenttiä, joten kysymykset täytyy staattisesti kirjoittaa tarpeeksi. (Jospa vain Hopella olisi omat luotettavat palvelimet...)

  Jotkin kysymykset voidaan jättää pois aiheuttamatta virheitä, mm. _Ilves vai Tappara_

2. luoda _Service Account_ Googleen

3. laittaa Service Accountin tiedot config.js tiedostoon

4. seurata README.docx-tiedoston ohjeita.
