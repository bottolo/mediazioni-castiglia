# Mediazioni Castiglia - Financial Consulting Website

A modern, responsive website for Gaetano Castiglia, a financial and credit consultant. This website showcases the
consultant's services, availability, experience, and provides multiple ways for potential clients to get in touch.

## Features

- **Professional Landing Page**: Clean, modern design with responsive layouts for both mobile and desktop
- **Interactive Calendar**: View the consultant's availability with day and week views
- **Service Showcase**: Visually appealing cards highlighting different financial services
- **Interactive Map**: Find office locations with an interactive Leaflet map
- **Awards Gallery**: Horizontally scrollable gallery showcasing achievements
- **Experience Timeline**: Visual representation of career history
- **Photo Gallery**: Interactive swipeable cards showing client interactions
- **Contact Options**: Multiple ways to get in touch including:
    - Contact form with validation
    - Direct email
    - WhatsApp integration
    - Appointment scheduling
- **Terms of Service**: Accessible legal information via modal dialog

## Technology Stack

### Frontend

- **Framework**: React with TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS with custom components
- **Custom UI Components**
- **State Management**: React Hooks
- **Responsive Design**: Mobile-first approach with responsive layouts

### Backend

- **Runtime**: Bun (modern JavaScript runtime)
- **Framework**: Hono (lightweight web framework)
- **API Validation**: Zod with @hono/zod-validator
- **Email Service**: Resend for contact form submissions
- **Google APIs**: Integration with Google services
- **Storage**: MegaJS for file management
- **Utilities**: Lodash for data manipulation

## Screenshots

*[Screenshots would be placed here]*

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mediazioni-castiglia.git
   cd mediazioni-castiglia
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   # Frontend
   cd /frontend
   bun run dev

   # Backend (in a separate terminal)
   bun run dev
   ```

4. Build for production:
   ```bash
   /frontend
   bun run build
   ```

### Prerequisites

- [Bun](https://bun.sh/) - Make sure to install Bun runtime
- TypeScript 5.7.2 or higher

## Project Structure

```
├── src/                    # Frontend code
│   ├── assets/             # Icons and images
│   ├── components/         # UI components
│   │   ├── ui/             # Base UI components
│   │   └── ...            
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── utils/              # Helper functions
│   └── ...
├── backend/                # Backend API code
│   ├── index.ts            # Server entry point
│   ├── routes/             # API routes
│   │   ├── resend/         # Email sending functionality
│   │   ├── types/          # TypeScript type definitions
│   │   └── ...
│   └── ...
├── public/                 # Static assets
└── package.json            # Project configuration
```

## Customization

The website uses CSS variables for theming, making it easy to customize colors, gradients, and other visual elements.
Main theme colors and gradients can be adjusted in the CSS variables.

## Credits

- Developed by [bottolo](https://github.com/bottolo)
- Designed by [frankie](https://github.com/FrankieBortot)
- Icons and assets: Various sources with appropriate licensing

## License

MIT License. See [LICENSE](LICENSE) for details.

---

*This project is a professional website for Mediazioni Castiglia, showcasing financial consulting services offered by
Gaetano Castiglia.*
