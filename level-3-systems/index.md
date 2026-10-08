<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Level 3 — Systems: Critical Infrastructure, Medical & Avionics

Complete systems where hardware failure has human consequences. Listed for awareness and lawful research on retired/surplus units only — never in-service equipment.

## Medical devices

| Device                    | Examples                              | Why it matters                          | Research rule                          |
|---------------------------|---------------------------------------|-----------------------------------------|----------------------------------------|
| Infusion pump             | Baxter Plum 360, B. Braun Infusomat   | Drug dosing is life-critical            | Retired units only; air-gap networked  |
| Pacemaker / ICD           | Medtronic, Abbott, Boston Scientific  | Implanted; wireless telemetry           | Explanted/retired only; no RF attacks  |
| Insulin pump / CGM        | Medtronic MiniMed, Dexcom G6/G7       | Closed-loop dosing                      | Retired units only                     |
| Patient monitor           | Philips IntelliVue, GE CARESCAPE      | Vital-signs aggregation                 | Decommissioned units only              |

## Industrial / infrastructure PLCs

| Device                    | Examples                              | Why it matters                          | Research rule                          |
|---------------------------|---------------------------------------|-----------------------------------------|----------------------------------------|
| Water-treatment PLC       | Allen-Bradley ControlLogix, Siemens S7| Public water supply                     | Lab/test rigs only; coordinated disclosure |
| Power-grid RTU / relay    | SEL, ABB, Schneider Electric          | Grid stability                            | Never touch live grid assets           |
| Traffic-signal controller | Econolite, Siemens M50                | Road safety                               | Decommissioned cabinets only           |
| Smart meter               | Itron, Landis+Gyr                     | Billing + grid telemetry                  | Own meter / lab units only             |

## Avionics

| Device                    | Examples                              | Why it matters                          | Research rule                          |
|---------------------------|---------------------------------------|-----------------------------------------|----------------------------------------|
| GPS / FMS unit            | Garmin G1000, Honeywell Primus        | Navigation integrity                      | Bench units only; no RF spoofing       |
| Transponder / ADS-B       | Garmin GTX, uAvionix                  | Air-traffic visibility                    | Receive-only research                  |
| Engine controller (FADEC) | Woodward, BAE Systems               | Engine control authority                  | Surplus/bench units only               |

## Responsible-research rules

1. **Retired/surplus units only.** Never probe in-service life-critical or infrastructure equipment.
2. **Air-gap networked gear.** Anything with a network interface gets isolated before power-on.
3. **Coordinated disclosure.** Findings affecting safety go to the vendor and ICS-CERT/CISA before any publication.
4. **No weaponization.** Research is defensive: understanding failure modes, not creating them.

*Scope: public device identification and research safety rules. No firmware internals, no bypass techniques.*
