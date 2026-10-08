<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Level 1 — Interconnect: Bus Standards & Protocols

The wires between chips. Public specifications and open standards.

| Bus / Protocol   | Type         | Speed              | Spec availability              |
|------------------|--------------|--------------------|--------------------------------|
| I2C              | Serial       | 100k–3.4M          | Public (NXP UM10204)           |
| SPI              | Serial       | 10M+               | De facto public standard       |
| UART             | Serial       | 115k–3M            | Public                         |
| USB 2.0 / 3.x    | Serial       | 480M–20G           | USB-IF (membership/fee)        |
| PCIe             | Serial       | 2.5–64 GT/s        | PCI-SIG (membership)           |
| I2S              | Audio serial | varies             | Public (Philips legacy)        |
| CAN bus          | Multi-master | 1M                 | ISO 11898 (public standard)    |
| Ethernet         | Network      | 10M–400G           | IEEE 802.3 (public)            |
| JTAG             | Debug        | varies             | IEEE 1149.1 (public)           |
| SWD              | Debug        | varies             | ARM public documentation       |

## Board-level notes

- **Power rails:** documented in public schematics (Framework, Raspberry Pi, Arduino)
- **Impedance control:** IPC-2221 (public standard) for high-speed layout
- **Connector standards:** public (USB-IF, PCIe, JEDEC for memory)

*Scope: public bus specifications and open board documentation only.*
