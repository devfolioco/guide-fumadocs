# Devfolio Documentation

This is a modern documentation site built with [Fumadocs](https://fumadocs.vercel.app) and Next.js, featuring analytics, user feedback, and more.

## Features

- 📊 **Analytics Integration** - Tracks page views, time on page, and user interactions
- 👍 **Helpful Rating System** - Users can rate documentation pages
- 🤖 **Chatbot Integration** - AI-powered assistance (coming soon)
- 📱 **Mobile Responsive** - Works on all devices
- 🚀 **CI/CD Pipeline** - Automated testing and deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A PostHog account for analytics

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/devfolio-docs.git
   cd devfolio-docs
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.local.example .env.local
   ```
   Update `.env.local` with your PostHog credentials:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com  # or your self-hosted instance
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fdevfolio-docs&project-name=devfolio-docs&repository-name=devfolio-docs)

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Analytics

This project uses [PostHog](https://posthog.com) for analytics. The following events are tracked:

- Page views
- Time spent on page
- Document helpfulness ratings
- Search queries (coming soon)
- Chatbot interactions (coming soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Fumadocs](https://fumadocs.vercel.app) - Documentation framework
- [Next.js](https://nextjs.org) - React framework
- [PostHog](https://posthog.com) - Product analytics
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
