<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Level 2 — Controllers: Firmware & Flash

The code that runs below the OS. Public firmware projects and documented flash interfaces.

| Component            | Public firmware / docs                          | Interface       |
|----------------------|-------------------------------------------------|-----------------|
| Coreboot             | Open-source firmware (GPL)                      | x86 platforms   |
| U-Boot               | Open-source bootloader (GPL)                    | ARM, MIPS, x86  |
| m1n1 (Asahi)         | Open-source Apple Silicon bootloader (MIT)      | Apple M1/M2     |
| CircuitPython        | Open-source (MIT)                               | RP2040, SAMD   |
| Arduino bootloader   | Open-source (GPL/LGPL)                          | AVR, SAMD      |

## Flash memory (public datasheets)

| Part          | Vendor    | Size    | Interface | Datasheet |
|---------------|-----------|---------|-----------|-----------|
| W25Q32        | Winbond   | 32 Mb   | SPI       | Public    |
| W25Q64        | Winbond   | 64 Mb   | SPI       | Public    |
| W25Q128       | Winbond   | 128 Mb  | SPI       | Public    |
| MX25L6406E    | Macronix  | 64 Mb   | SPI       | Public    |
| AT25DF641     | Dialog    | 64 Mb   | SPI       | Public    |

*Scope: open-source firmware and publicly released flash datasheets only.*
