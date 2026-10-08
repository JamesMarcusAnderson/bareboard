<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Autopsy Report #002 — Philips IntelliVue Patient Monitor Family

**Target class:** Level-3 Systems (Medical)
**Status:** PUBLIC (vendor-published documentation) / retired hardware
**Date:** 2026-10-08
**Standard:** Verified findings only. Uncertainty dated and marked.

---

## 1. Target identification

| Field              | Value                                                        |
|--------------------|--------------------------------------------------------------|
| Family             | Philips IntelliVue (MP20/MP30/MP40/MP50/MP60/MP70)            |
| Launch             | Early 2000s                                                  |
| Status             | Legacy; superseded by IntelliVue MX series                   |
| Form factor        | Bedside monitor with modular measurement slots               |

## 2. Public architecture (from Philips-published documentation)

| Subsystem          | Public detail                                                 |
|--------------------|---------------------------------------------------------------|
| Display            | Integrated color TFT; touchscreen on later models             |
| Measurements       | Plug-in modules: ECG, SpO2, NIBP, invasive pressure, CO2      |
| Networking         | Philips clinical network (wired); HL7 output to EMR systems  |
| Power              | AC mains + internal battery backup                            |
| Alarms             | Tiered audible/visual alarm system per IEC 60601-1-8          |

## 3. Module anatomy (retired unit)

| Component          | Function                                                      |
|--------------------|---------------------------------------------------------------|
| Mainframe          | Display, processing, user interface, alarm management          |
| M3001A MMS module  | Multi-measurement server: ECG, SpO2, NIBP in one module       |
| Recorder module    | Thermal strip-chart recorder (optional)                       |
| Battery module     | Hot-swappable backup power                                    |

## 4. What the documentation tells us (and doesn't)

**Publicly documented (Philips manuals):**
- Full operator and service manuals with block diagrams
- Measurement module specifications and accuracy claims
- Network configuration guides for clinical LAN integration
- Alarm configuration and clinical workflow documentation
- Decommissioning and data-sanitization procedures

**Not public (correctly excluded from this report):**
- Firmware internals and real-time OS details
- Network protocol specifics beyond published integration guides
- Any technique affecting live clinical devices

## 5. Preservation notes

- Retired IntelliVue units are common as hospital surplus; excellent for biomedical-engineering education.
- Philips publishes operator manuals publicly; service manuals via authorized channels.
- **Research rule:** decommissioned units only. Any networked medical device gets air-gapped before power-on. Patient data sanitization verified before any bench work.

## 6. Sources

- Philips IntelliVue public operator documentation
- IEC 60601-1-8 (alarm systems standard, public)
- HL7 integration guides (public)

---
*Report #002. All statements above are drawn from vendor-published or public-standard sources. No firmware internals, no live-device interaction.*
