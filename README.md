# Tech Vault

A full-stack tech solutions e-commerce platform — built as my final-semester (7th sem, CSIT) project.

> 🚧 **Status: In Development** — this project is actively being built. Features and setup instructions below will evolve as development progresses.

**Live preview:** [tech-vault-cyan.vercel.app](https://tech-vault-cyan.vercel.app/)

---

## About

Tech Vault is a tech-focused online store designed to deliver a smooth shopping experience for tech products — from browsing and checkout to order tracking. The project emphasizes secure authentication, local payment integration, and an AI-assisted shopping experience.

## Planned Features

- 🔐 **Google OAuth Login** — secure, frictionless authentication
- 💳 **Local Payment Integration** — eSewa & Khalti payment gateways
- 🔔 **Real-Time Order Updates** — live order status and notifications
- 🤖 **AI Shopping Assistant** — chatbot to help customers find the right products
- 🛍️ **Product Catalog** — browsing, filtering, and search
- 📦 **Order Management** — cart, checkout, and order history

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| Auth | Google OAuth |
| Payments | eSewa, Khalti |
| AI | AI-integrated chat assistant |

## Getting Started

> ⚠️ Setup steps below are a starting template — update them once the project structure and scripts are finalized.

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL instance (local or hosted)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Hrit-Codes/Tech-Vault-Frontend.git
cd Tech-Vault-Frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your database, OAuth, and payment gateway credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Environment Variables

> Update this list as features are implemented.

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ESEWA_MERCHANT_ID=
KHALTI_SECRET_KEY=
```

## Roadmap

- [ ] Product catalog & search
- [ ] Cart & checkout flow
- [ ] Google OAuth integration
- [ ] eSewa & Khalti payment integration
- [ ] Real-time order notifications
- [ ] AI chat assistant
- [ ] Admin dashboard

## Author

**Hrit Amatya**
Full Stack Developer | CSIT, Trinity International College

- GitHub: [@Hrit-Codes](https://github.com/Hrit-Codes)
- LinkedIn: [hrit-amatya](https://www.linkedin.com/in/hrit-amatya-b23289379/)
- Portfolio: [hrit-digital-world.vercel.app](https://hrit-digital-world.vercel.app/)

## License

This project is currently a personal academic project. License to be determined.
