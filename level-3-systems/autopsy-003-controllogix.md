<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Autopsy Report #003 — Allen-Bradley ControlLogix 1756 Platform

**Target class:** Level-3 Systems (Industrial control)
**Status:** PUBLIC (vendor-published documentation) / mixed availability
**Date:** 2026-10-08
**Standard:** Verified findings only. Uncertainty dated and marked.

---

## 1. Target identification

| Field              | Value                                                        |
|--------------------|--------------------------------------------------------------|
| Family             | Allen-Bradley ControlLogix (1756 series)                     |
| Manufacturer       | Rockwell Automation                                          |
| Launch             | 1997                                                         |
| Status             | Active product line (successor to PLC-5)                     |
| Form factor        | Modular chassis PLC (4/7/10/13/17 slot chassis)              |

## 2. Public architecture (from Rockwell-published documentation)

| Subsystem          | Public detail                                                 |
|--------------------|---------------------------------------------------------------|
| Processor          | 1756-L7x / L8x controllers; specs in public technical data    |
| Memory             | SD card for program storage; on-controller memory             |
| Backplane          | ControlLogix chassis backplane (1756-A4/A7/A10/A13/A17)      |
| Networks           | EtherNet/IP, ControlNet, DeviceNet via communication modules  |
| Programming        | Studio 5000 Logix Designer; ladder, structured text, FBD      |
| Power              | 1756-PA72 / PB72 / PA75 / PB75 power supplies                |

## 3. Module anatomy

| Slot               | Typical module        | Function                              |
|--------------------|-----------------------|---------------------------------------|
| Chassis            | 1756-A7               | 7-slot chassis backbone               |
| 0                  | 1756-L71              | Logix controller                      |
| 1                  | 1756-EN2T             | EtherNet/IP bridge                    |
| 2+                 | 1756-IB16             | DC digital input                      |
| 2+                 | 1756-OB16E            | DC digital output                     |
| 2+                 | 1756-IF8              | Analog input                          |
| 2+                 | 1756-OF8              | Analog output                         |

## 4. What the documentation tells us (and doesn't)

**Publicly documented (Rockwell manuals):**
- Complete hardware installation manuals with wiring diagrams
- Module technical data sheets (public PDFs)
- EtherNet/IP public specifications (ODVA)
- System design considerations and grounding guidelines

**Not public (correctly excluded from this report):**
- Controller firmware internals
- Proprietary backplane protocol details
- Any technique affecting live industrial systems

## 5. Preservation notes

- ControlLogix is current-generation; retired chassis/modules appear as industrial surplus.
- Rockwell maintains an extensive public literature library (literature.rockwellautomation.com).
- **Research rule:** lab/test-rig units only. Never interact with in-service control systems. Coordinated disclosure for safety findings.

## 6. Sources

- Rockwell Automation public literature library
- ODVA EtherNet/IP public specifications
- ControlLogix system user manuals (public)

---
*Report #003. All statements above are drawn from vendor-published or public-standard sources. No firmware internals, no live-system interaction.*
