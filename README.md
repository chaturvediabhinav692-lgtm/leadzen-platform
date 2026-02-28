# Euonex Platform

![Version](https://img.shields.io/badge/version-0.1.0-purple.svg)
![License](https://img.shields.io/badge/license-private-black.svg)

A premium, automation-driven SaaS infrastructure for professional service businesses. The **Euonex Platform** serves as the parent infrastructure for specialized products, currently featuring **Leadzen**.

---

## 🔹 Branding Hierarchy
- **Euonex**: The parent company providing global infrastructure and system-level coordination.
- **Leadzen**: The flagship product designed for lead capture, routing, and real-time execution.

---

## 🚀 Key Features (Leadzen)
- **Universal Dashboard**: Role-specific interfaces for Business Managers and Service Professionals.
- **Lead Capture & Routing**: Automated categorization and assignment of incoming leads.
- **Real-Time Communication**: Integrated WhatsApp and messaging workflows.
- **Activity Streams**: Live tracking of interactions and priority shifts.
- **Admin Command Center**: Centralized client management and system health monitoring.

---

## 🛠 Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Backend**: Node.js, Express (Modular Architecture)
- **Styling**: Tailwind CSS 4, Framer Motion (for premium animations)
- **Icons**: Lucide React
- **Component Design**: "Dark Utility" design system with deep glassmorphism and custom glow effects.

---

## 🏗 Architecture
The platform has been transitioned to a fully API-driven architecture:
- **Centralized API Wrapper**: Standardized handling via `src/lib/api.ts`.
- **Domain Services**: Dedicated frontend services for `leads` and `tickets`.
- **Decoupled Backend**: Modular Node/Express server handling data and validation.
- **Contract-First**: Strict `{ success, data, error }` response format.

---

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/chaturvediabhinav692-lgtm/leadflow-platform.git
   ```
2. Install dependencies (Root & Backend):
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

### Running Locally
You need to run both the backend and frontend servers:

1. **Start Backend**:
   ```bash
   node backend/server.js
   ```
   (Server runs on `http://localhost:8000`)

2. **Start Frontend**:
   ```bash
   npm run dev
   ```
   (Platform runs on `http://localhost:3000`)

---

## 📧 Contact & Support
For general inquiries, technical support, or enterprise deployment:

- **Email**: [euonex@gmail.com](mailto:euonex@gmail.com)
- **Support Portal**: [Platform Support](http://localhost:3000/support)

---

© 2026 Euonex Systems Inc. All rights reserved.
