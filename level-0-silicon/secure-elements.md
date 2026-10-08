<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Level 0 — Silicon: Secure Elements & Root of Trust

The secure enclaves and trust anchors baked into silicon. Public knowledge only — no register maps, no internal documentation.

| Element                | Vendor      | Public interface                          | What's public                          |
|------------------------|-------------|-------------------------------------------|----------------------------------------|
| Secure Enclave (SEP)   | Apple       | No public interface                       | Research talks (BH2016, MOSEC2020)     |
| Platform Security Proc.| AMD         | No public interface                       | coreboot docs, BH2020 research         |
| CSME / Management Eng.| Intel       | No public interface                       | REcon2014 research, coreboot tools     |
| Titan M2               | Google      | No public interface                       | Public security whitepapers            |
| Pluton                 | Microsoft   | No public interface                       | Public architecture overviews          |
| Secure Element SE050   | NXP         | I2C, public datasheet                     | Full public datasheet                  |
| OPTIGA Trust M         | Infineon    | I2C, public datasheet                     | Full public datasheet                  |
| ATECC608               | Microchip   | I2C, public datasheet                     | Full public datasheet + app notes      |

## The pattern

Consumer secure elements fall into two camps: **documented** (NXP, Infineon, Microchip publish full datasheets) and **sealed** (Apple, AMD, Intel, Google, Microsoft publish nothing). The sealed ones are where public research — conference talks, open-source firmware projects — becomes the documentation of last resort.

*Scope: public product briefs, research talks, and open-source project documentation only.*
