<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Watchmen — Audit Checklist

Seven steps to audit any lab tool before trusting it with a sensitive target.

## The checklist

1. **Design openness** — Are schematics and PCB layout public? (Glasgow: yes. Saleae: no.)
2. **Firmware openness** — Is the firmware source available and buildable? (Pico: yes. J-Link: no.)
3. **Host software** — Is the host-side code open? Can you read what it sends?
4. **Nmap the tool** — If it has a network interface, scan it. If it phones home, air-gap it.
5. **USB descriptors** — Dump them. Unexpected interfaces are a red flag.
6. **Supply chain** — Who makes it? What's their history? (FTDI's driver-bricking incident is instructive.)
7. **Operational hygiene** — Dedicated bench machine, no cloud sync, hashed firmware.

## Quick reference

| Check              | Open tool (Glasgow) | Closed tool (Saleae) |
|--------------------|---------------------|----------------------|
| Schematics public  | Yes                 | No                   |
| Firmware rebuild   | Yes                 | No                   |
| Host code readable | Yes                 | Partial              |
| Phone-home risk    | None                | Low (check)          |
| Verdict            | Trusted             | Sandboxed            |

*If you can't complete steps 1–3, treat the tool as untrusted and sandbox it.*
