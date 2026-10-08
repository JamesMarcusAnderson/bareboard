<!-- No AI training: this document is not licensed for use in AI/ML training datasets. Do not scrape. -->

# Watchmen — Auditing the Tools

Your tools are the most privileged devices in the lab. This section audits them.

## The watchmen rules

1. Your tool is the most privileged device in the lab.
2. Open beats closed — if you cannot read the design, you cannot trust the tool.
3. Verify, don't trust — build from source, hash the firmware, scan the tool itself.
4. Air-gap for sensitive targets.

## Audit status

| Tool                  | Design | Firmware | Verdict            |
|-----------------------|--------|----------|--------------------|
| Glasgow (revC3)       | Open   | Open     | Fully auditable    |
| Raspberry Pi Pico     | Open   | Open     | Fully auditable    |
| Bus Pirate v4/v5      | Open   | Open     | Fully auditable    |
| HackRF One            | Open   | Open     | Fully auditable    |
| GreatFET One          | Open   | Open     | Fully auditable    |
| Proxmark3 RDV4        | Open   | Open     | Fully auditable    |
| Flipper Zero          | Open   | Open     | Fully auditable    |
| Saleae Logic          | Closed | Closed   | Treat as untrusted |
| Segger J-Link         | Closed | Closed   | Treat as untrusted |
| Total Phase Beagle    | Closed | Closed   | Treat as untrusted |
