# ThermTools — Satellite Thermal Control Calculators

Free, browser-based thermal control system (TCS) design calculators for spacecraft.
Fourth member of the SatTools family, alongside
[SatTools](https://sunelliot.github.io/link-budget-calculator/) (communications),
[OrbitTools](https://sunelliot.github.io/orbit-design-tools/) (orbit design) and
[EPSTools](https://sunelliot.github.io/eps-design-tools/) (power). Same architecture:
static multi-page site, shared `styles.css` / `i18n.js` (EN/中文) / `share.js`,
PWA service worker, zero backend — nothing leaves the browser.

## Tools

| Category | Tool | What it computes |
|---|---|---|
| Environment | `environment-fluxes.html` | Solar constant by season, albedo & Earth IR with the altitude view factor |
| Heat Balance | `heat-balance.html` | Single-node radiative equilibrium — hot/cold bounding case temperatures |
| Heat Balance | `transient.html` | Lumped-capacity T(t) over two orbits — eclipse swing & time constant |
| Rejection & Control | `radiator.html` | Radiator area from Q/T/ε/environment, plus cold-case heater check |
| Rejection & Control | `heater.html` | Survival heater power from conductive+radiative losses, duty & orbit energy |
| Insulation & Conduction | `mli.html` | MLI effective emissivity from layers (with flight degradation) & heat leak |
| Insulation & Conduction | `conduction.html` | Series kA/L path with bolted joints — total G and per-segment ΔT |
| Reference | `reference.html` | Coating α/ε BOL→EOL, material k/c_p, component temp limits, constants |

## Design flow

Environment fluxes → Heat Balance (hot/cold) → Transient swing check →
Radiator sizes the hot case, Heater covers the cold case (energy feeds EPSTools'
power budget) → MLI/Conduction set the couplings used by the Heater tool.
Eclipse durations come from OrbitTools' Beta Angle & Eclipse tool.

## Conventions (shared with the family)

- `?v=N` cache-busting on shared assets; `sw.js` `CACHE` bumped whenever any
  shipped file changes (cache-first service worker).
- EN/中文: static text via `DICT` in `i18n.js`, dynamic text via `t(en, zh)`,
  block content via `.en-only` / `.zh-only`.
- `share.js` serializes all id'd inputs into the URL for shareable calculations.

## Models & accuracy

Single/lumped-node balances, ideal-MLI formula with flight degradation factors,
first-cut derating screens — for concept and preliminary design. Verify with a
multi-node thermal model (Thermal Desktop / ESATAN) and unit ICD limits for flight.
