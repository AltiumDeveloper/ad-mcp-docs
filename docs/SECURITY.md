# Security Policy

This repository holds documentation only. Security issues in the Altium Designer MCP Server extension itself are in
scope for this policy too, because this is where its users look.

## Reporting a vulnerability

Please report it privately rather than opening a public issue:

- use GitHub's [private vulnerability reporting](https://github.com/AltiumDeveloper/ad-mcp-docs/security/advisories/new)
  ("Report a vulnerability" under the repository's **Security** tab), or
- email **security@altium.com**.

Include enough detail to reproduce the issue: the product and version, the AI client, the steps, and the impact. We
aim to acknowledge reports within a few business days.

## Scope

In scope: anything that lets the server be reached from outside your machine, a tool that changes design data
without declaring itself as destructive, a query that escapes the sandbox described in
[Is it safe?](https://docs.developer.altium.com/ad-mcp-docs/security/), and documentation that
describes the security model wrongly.

Out of scope: what your AI provider does with a conversation, which is governed by your agreement with that provider.
