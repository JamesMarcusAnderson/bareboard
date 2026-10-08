<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Level 0 — Silicon: Fabs & Lithography Nodes

The foundation layer. Every chip on every board starts here: the foundry, the process node, and the transistor architecture.

| Node       | Transistor type | Production fabs                          | Example parts                          |
|------------|-----------------|------------------------------------------|----------------------------------------|
| 180 nm     | Planar          | TSMC, UMC, SMIC                          | ATmega103, PIC16C54B                   |
| 130 nm     | Planar          | TSMC, UMC, IBM                           | PowerPC 750 (G3), Geode GXm            |
| 90 nm      | Planar          | TSMC, Intel, IBM                         | PowerPC 970, early Core 2              |
| 65 nm      | Planar          | TSMC, Intel, Samsung                     | Xbox 360 Xenon (rev), PS3 RSX (rev)    |
| 45 nm      | Planar / Hi-k   | Intel, TSMC, Samsung                     | Intel Core i7 (Nehalem), AMD Phenom II |
| 32 nm      | Hi-k metal gate | Intel, TSMC                              | Intel Sandy Bridge, AMD Llano          |
| 28 nm      | Hi-k metal gate | TSMC, Samsung, GlobalFoundries           | AMD GCN GPUs, Apple A7 (Samsung)       |
| 22 nm      | FinFET          | Intel                                    | Intel Ivy Bridge, Haswell              |
| 16/14 nm   | FinFET          | TSMC, Samsung, Intel, GlobalFoundries    | Apple A9/A10, AMD Ryzen (14 nm)        |
| 10 nm      | FinFET          | TSMC, Samsung, Intel                     | Apple A11, Intel Cannon Lake           |
| 7 nm       | FinFET          | TSMC, Samsung                            | AMD Zen 2/3, Apple A12–A14, M1         |
| 5 nm       | FinFET          | TSMC, Samsung                            | Apple A15/M2, Qualcomm Snapdragon 8 Gen 1 |
| 4 nm       | FinFET          | TSMC, Samsung                            | Apple A16, Snapdragon 8 Gen 2          |
| 3 nm       | GAAFET          | TSMC, Samsung                            | Apple A17 Pro, M3                      |

## Foundry reference

| Foundry          | HQ       | Leading node (2026) | Notes                              |
|------------------|----------|---------------------|------------------------------------|
| TSMC             | Taiwan   | 3 nm / 2 nm risk    | Apple, AMD, NVIDIA, Qualcomm       |
| Samsung Foundry  | S. Korea | 3 nm GAA            | Exynos, Qualcomm (select), Tesla    |
| Intel Foundry    | USA      | Intel 18A           | Foundry services + own products    |
| SMIC             | China    | 7 nm (DUV)          | Domestic Chinese fabless            |
| GlobalFoundries  | USA      | 12 nm               | Exited leading-edge race (2018)    |
| UMC              | Taiwan   | 28/22 nm            | Mature-node specialist             |

*Scope: public foundry and node data only. No proprietary PDK or process details.*
