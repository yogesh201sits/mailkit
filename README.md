# MailKit 
<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/3f9afff1-1091-4429-a952-83b507596040" />


MailKit is an open-source Gmail MCP toolkit built around a shared core library.

The project provides multiple ways to interact with Gmail:

* CLI
* Local MCP Server (STDIO)
* Remote MCP Server (Streamable HTTP)

All applications share the same core Gmail implementation, making MailKit easy to extend while avoiding duplicated business logic.

---

# Architecture

```text
                         +----------------------+
                         |      CLI Package     |
                         +----------+-----------+
                                    |
                                    |
                         +----------v-----------+
                         |                      |
+------------------+     |    @mailkit/core    |     +----------------------+
| Local MCP        +----->                      <-----+  Remote MCP App      |
| (STDIO)          |     +----------+-----------+     | (Streamable HTTP)    |
+------------------+                |                 +----------------------+
                                    |
                                    |
                         +----------v-----------+
                         |      Gmail API       |
                         +----------------------+
```
<img width="500" height="320" alt="image" src="https://github.com/user-attachments/assets/08ee86e4-5193-4b52-bbcf-14bba38b93e4" />

The repository follows a layered architecture:

* **Applications** expose MailKit through different interfaces.
* **Core** contains reusable Gmail business logic.
* Every application depends on the same shared core.

---

## Tech Stack

- **Bun** – Fast JavaScript runtime, package manager, and task runner.
- **@modelcontextprotocol/sdk** – Official SDK for building Model Context Protocol (MCP) servers.
- **@modelcontextprotocol/inspector** – Tool for testing, debugging, and inspecting MCP servers during development.
- **Zod** – Type-safe schema validation for tool inputs and outputs.

---

# Repository Structure

```text
mailkit/
│
├── apps/
│   └── mcp-remote/
│
├── packages/
│   ├── cli/
│   ├── core/
│   └── mcp-local/
│
├── package.json
├── bun.lock
└── README.md
```

---

# Applications

## CLI

Command-line interface for Gmail operations.

Examples:

```bash
mailkit emails
mailkit read <messageId>
mailkit search "from:github"
mailkit send
```

---

## Local MCP

A local Model Context Protocol server using the **STDIO** transport.

Designed for:

* Claude Desktop
* Cursor
* VS Code
* Windsurf
* MCP Inspector
* Any MCP client supporting STDIO

The client launches the server as a subprocess and communicates over standard input/output.

---

## Remote MCP

A deployable MCP server built using:

* Hono
* Streamable HTTP transport

Designed for remote AI agents and cloud-hosted integrations.

Unlike STDIO servers, remote MCP servers communicate over HTTP and can serve multiple clients.

---

# Core Package

`@mailkit/core` contains all Gmail business logic.

Responsibilities include:

* Authentication
* Gmail client creation
* Email operations
* Label operations
* Attachment handling
* Shared types
* Services

Every application reuses this package.

---

# Features

## Authentication

* OAuth 2.0
* Offline refresh tokens
* Persistent token storage

---

## Email

* List emails
* Read email
* Search emails
* Send email
* Reply to email
* Archive email
* Trash email
* Mark as read
* Mark as unread
* Star email
* Unstar email

---

## Attachments

* List attachments
* Download attachments

---

## Labels

* List labels *(in progress)*
* Create labels *(in progress)*

---

# MCP Tools

MailKit exposes Gmail functionality as MCP tools.

Current tools include:

| Tool                | Status |
| ------------------- | ------ |
| list_emails         | ✅      |
| read_email          | ✅      |
| search_emails       | ✅      |
| send_email          | ✅      |
| reply_email         | ✅      |
| archive_email       | ✅      |
| trash_email         | ✅      |
| mark_as_read        | ✅      |
| mark_as_unread      | ✅      |
| star_email          | ✅      |
| unstar_email        | ✅      |
| list_attachments    | ✅      |
| download_attachment | ✅      |
| list_labels         | ✅      |
| create_label        | ✅      |

---

# Technologies

* Bun
* TypeScript
* Google Gmail API
* Commander
* Hono
* Zod
* Model Context Protocol SDK

---

# Project Goals

MailKit aims to provide one shared Gmail toolkit that can be used through multiple interfaces.

Instead of implementing Gmail functionality multiple times, every application reuses the same core package.

This allows new interfaces to be added with minimal effort.

For example:

```text
Future UI
        │
        ▼
   @mailkit/core
        ▲
        │
CLI ─ Local MCP ─ Remote MCP
```

---

# Development Status

## Completed tools

* Shared Gmail core
* OAuth authentication
* CLI
* Local MCP Server
* Remote MCP Server foundation
* Email operations
* Attachment operations
* Label management
* Documentation
* Tests
* Service layer refinements

## Planned

* Draft support
* Thread operations
* Batch operations
* Gmail watch support
* Remote authentication
* Deployment guides

---

# Testing

The project has been tested using:

* Gmail API
* CLI commands
* Local MCP server
* Official MCP Inspector

Verified functionality includes:

* Authentication
* Email listing
* Reading emails
* Searching emails
* Sending emails
* Replying to emails
* Archive/Trash operations
* Read/Unread state updates
* Star/Unstar operations
* Attachment handling

---

# Why MailKit?

MailKit is designed around a simple principle:

> **Implement Gmail functionality once, expose it everywhere.**

Whether you're building a command-line workflow, an AI assistant, or a hosted MCP server, the same core package powers every interface.

This keeps the codebase modular, reusable, and easy to maintain.
