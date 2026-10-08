<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Autopsy Report #001 — Siemens SIMATIC S7-300 PLC Family

**Target class:** Level-3 Systems (Industrial control)
**Status:** PUBLIC (vendor-published documentation) / retired hardware
**Date:** 2026-10-08
**Standard:** Verified findings only. Uncertainty dated and marked.

---

## 1. Target identification

| Field              | Value                                                        |
|--------------------|--------------------------------------------------------------|
| Family             | Siemens SIMATIC S7-300                                       |
| Launch             | 1994                                                         |
| Status             | Discontinued — Siemens announced phase-out; S7-1500 successor|
| Form factor        | Modular rack PLC (DIN-rail mounting rail)                    |
| CPU range          | CPU 312 → 319 (increasing memory, speed, interfaces)         |

## 2. Public architecture (from Siemens-published manuals)

| Subsystem          | Public detail                                                 |
|--------------------|---------------------------------------------------------------|
| Processor          | Siemens-proprietary ASIC per CPU variant; specs in public system manual |
| Memory             | Load memory via SIMATIC Micro Memory Card (MMC); work memory on-CPU |
| Backplane bus      | Proprietary S7-300 backplane; modules daisy-chain via bus connectors |
| Fieldbus           | MPI (Multi-Point Interface), PROFIBUS-DP, PROFINET (later CPUs) |
| Programming        | STEP 7 (TIA Portal for later); STL/LAD/FBD languages          |
| Power              | 24 V DC via PS 305/307 power supply modules                   |

## 3. Module anatomy (retired unit)

| Slot position | Typical module        | Function                              |
|---------------|-----------------------|---------------------------------------|
| 1             | PS 307                | 24 V DC power supply                  |
| 2             | CPU 314               | Central processor                     |
| 3             | Interface/dummy       | Reserved slot                         |
| 4+            | SM 321 / SM 322       | Digital input / digital output        |
| 4+            | SM 331 / SM 332       | Analog input / analog output          |
| 4+            | CP 342-5              | PROFIBUS communication processor      |
| 4+            | FM 350-1              | Counter / function module             |

## 4. What the documentation tells us (and doesn't)

**Publicly documented (Siemens manuals):**
- Full module catalog with ordering numbers, pin assignments, wiring diagrams
- Backplane addressing rules and slot constraints
- MMC memory-card file system behavior
- PROFIBUS-DP slave configuration via public GSD files
- Diagnostic buffer structure and error codes

**Not public (correctly excluded from this report):**
- CPU ASIC internals and firmware structure
- Proprietary backplane protocol timing
- Any technique for bypassing access protection on live systems

## 5. Preservation notes

- S7-300 hardware is widely available as retired/surplus; an ideal bench PLC for education.
- Siemens maintains public manuals for discontinued modules at support.industry.siemens.com.
- GSD files for PROFIBUS configuration remain publicly distributed.
- **Research rule:** lab/test-rig units only. Never probe or interact with in-service industrial control systems. Safety findings go through coordinated disclosure (vendor + CISA/ICS-CERT).

## 6. Sources

- Siemens SIMATIC S7-300 public system manuals (support.industry.siemens.com)
- Siemens S7-300 discontinuation notices (Siemens Industry Online Support)
- PROFIBUS GSD file repository (public)

---
*Report #001. All statements above are drawn from vendor-published or community-public sources. No firmware internals, no bypass techniques, no in-service system interaction.*
