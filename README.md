# Skólanámskrártól Þjórsárskóla

Vefsíða á GitHub Pages sem heldur utan um greinahluta skólanámskrár Þjórsárskóla
2026–2027: forgangsröðun hæfniviðmiða, vægi flokka í vitnisburði og námsáætlanir.
Hún birtir líka skólanámskrána fyrir foreldra og nemendur.

**Engar upplýsingar um nemendur eru geymdar hér.**

## Síður

| Síða | Fyrir hverja | Efni |
|---|---|---|
| `index.html` | Stjórnendur og kennarar | Tólið: heildarmynd, forgangsröðun, námsáætlanir, skólanámskrá, stillingar |
| `skolanamskra.html` | Foreldrar, nemendur, almenningur | Birt skólanámskrá eftir árgangi eða grein, með vægi flokka. Uppfærist sjálfkrafa. |

## Uppsetning (einu sinni)

1. **Kveikja á GitHub Pages:** *Settings → Pages → Build and deployment → Source:
   Deploy from a branch → `main` / `(root)` → Save.* Eftir u.þ.b. mínútu er síðan á
   `https://gummif-hub.github.io/skolanamskra/`.
2. **Innskráning starfsfólks (skólastjóri, einu sinni á ári):**
   - Búa til lykil: *github.com → Settings → Developer settings → Personal access tokens →
     Fine-grained tokens → Generate new token.* Repository access: *Only select repositories →
     `skolanamskra`*. Permissions: *Contents → Read and write*. Gildistími t.d. 1 ár.
   - Í tólinu: **Stillingar → Uppsetning innskráningar (skólastjóri)**. Líma lykilinn inn og
     velja lykilorð skólans (a.m.k. 12 stafir, t.d. þrjú til fjögur orð saman).
   - Lykillinn er dulkóðaður með lykilorðinu (AES-256-GCM, PBKDF2-SHA256 600.000 umferðir)
     og aðeins dulkóðuð útgáfa er vistuð í `data/adgangur.json`.
   - Starfsfólk skráir sig inn með **nafni og lykilorði skólans**. Nafnið fylgir hverri vistun.
   - Tólið er lokað án innskráningar. Vinnugögnin (`akvardanir.json`, `almennur.json`) eru
     dulkóðuð með gagnalykli sem aðeins fæst með lykilorði skólans. Birta skólanámskráin er
     í `data/birt.json` (ódulkóðuð, aðeins það sem birtist foreldrum) og uppfærist sjálfkrafa.
   - Til að loka á aðgang (t.d. ef lykilorð lekur): eyða lyklinum á GitHub og setja upp
     innskráningu aftur með nýjum lykli og nýju lykilorði.
3. Tengja í `https://gummif-hub.github.io/skolanamskra/skolanamskra.html` af
   heimasíðu skólans.

## Hvernig vistun virkar

- Án innskráningar er tólið í skoðunarham. Breytingar geymast aðeins í þeim vafra og eru
  sendar sjálfkrafa í sameiginlega gagnagrunninn við næstu innskráningu.
- Innskráð(ur): breytingar vistast sjálfkrafa 2–3 sekúndum eftir síðustu breytingu sem ný
  útgáfa (commit) í `data/akvardanir.json` eða `data/almennur.json`.
- **Fleiri í einu:** ef annar hefur vistað á undan eru breytingar beggja sameinaðar sjálfkrafa.
  Ef tveir breyta sama reit gildir sú breyting sem vistuð var síðast. Breytingar annarra eru
  sóttar á 45 sekúndna fresti og þegar glugginn fær fókus.
- **Ekkert tapast:** óvistaðar breytingar eru afritaðar í vafrann þar til vistun hefur tekist og
  endurheimtar sjálfkrafa ef vafrinn lokast eða netið dettur út. Varað er við ef glugga er lokað
  meðan vistun stendur yfir.
- **Útgáfusaga:** undir *Stillingar → Útgáfusaga* má sjá síðustu vistanir og endurheimta eldri
  útgáfu. Öll saga er líka í *Commits* á GitHub.
- Birta síðan uppfærist innan 1–2 mínútna frá vistun.

## Skrár

- `data/grunngogn.json`: hæfniviðmið, matsviðmið og leiðbeinandi vægi úr MMS-sniðmáti
  2026 (2. útg.) og námskrár kennara 2025–2026. Byggð upp utan tólsins.
- `data/akvardanir.json`: ákvarðanir skólans (forgangsröðun, vægi, textar, námsáætlanir,
  stillingar).
- `smidi.js`: sameiginleg föll fyrir báðar síðurnar.
- `merki.png`: merki skólans.

## Heimildir

Aðalnámskrá grunnskóla (greinasvið 2024) ·
Forgangsröðun hæfniviðmiða og vægi flokka greinasviðanna 2026, 2. útg. (MMS) ·
Leiðbeinandi vægi flokka 10. b. 2026–2027 (MMS) · Námsáætlun – sniðmát og dæmi (MMS) ·
[adalnamskra.is](https://www.adalnamskra.is/grunnskoli)
