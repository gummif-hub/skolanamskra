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
2. **Lykill til að vista:** *github.com → Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token.*
   - Repository access: *Only select repositories → `skolanamskra`*
   - Permissions: *Contents → Read and write*

   Lykillinn er settur inn í tólinu undir **Stillingar → Vistun á GitHub**. Hann er
   aðeins geymdur í þeim vafra.
3. Tengja í `https://gummif-hub.github.io/skolanamskra/skolanamskra.html` af
   heimasíðu skólans.

## Hvernig vistun virkar

- Án lykils er tólið í skoðunarham. Breytingar geymast aðeins í þeim vafra og má
  sækja þær sem skrá.
- Með lykli vistast breytingar í `data/akvardanir.json` sem ný útgáfa (commit). Öll
  saga er í *Commits* og eldri útgáfu má endurheimta þaðan.
- Ef tveir vista í einu fær sá seinni boð um að endurhlaða síðuna. Ekkert yfirskrifast.
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
