# TikTok TechJam 2025 - Frontend

A revolutionary creator economy platform frontend that combines interest-bearing stablecoins, social engagement tokens, and delegated transfers. Built with Next.js 15, React 19, and TypeScript for seamless integration with the [TikTok TechJam Backend](https://github.com/gitaalekhyapaul/techjam-be).

## 🚀 Features

### **Creator Economy Platform**

- **Dual-Token System**: TK (stable USD) and TKI (interest-bearing engagement tokens)
- **Creator Dashboard**: Comprehensive earnings tracking and analytics
- **Fan Interface**: Easy clap/gift submission with real-time interest accrual
- **Wallet Integration**: MetaMask and other wallet connections

### **Core Functionality**

- **Interest Accrual**: Real-time TKI balance updates with compound-like growth
- **Intent Management**: Submit, track, and manage clap/gift intents
- **Delegated Transfers**: ERC-7710 delegation for permissionless operations
- **Creator Discovery**: Browse and support content creators
- **Transaction History**: Complete audit trail of all actions

### **Technical Features**

- **Next.js 15**: App Router with server-side rendering
- **React 19**: Latest React features with concurrent rendering
- **TypeScript**: Full type safety for contract interactions
- **Tailwind CSS**: Utility-first styling with custom components
- **Responsive Design**: Mobile-first approach for all devices

## 🏗️ Architecture

### **Frontend Structure**

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Landing page
├── creator/                # Creator dashboard
├── subscription/           # Subscription management
└── globals.css            # Global styles

components/
├── ui/                     # Reusable UI components
├── creator.tsx             # Creator-specific components
├── subs.tsx                # Subscription components
├── tiktok-*.tsx           # Core TikTok interface components
└── wallet-modal.tsx        # Wallet connection modal

lib/
└── utils.ts                # Utility functions and helpers
```

### **Component Architecture**

- **Atomic Design**: Modular component system with clear hierarchy
- **State Management**: React hooks and context for global state
- **Contract Integration**: Viem-based Ethereum interactions
- **Real-time Updates**: WebSocket connections for live data

## 🛠️ Tech Stack

### **Core Framework**

- **Next.js 15.2.4**: React framework with App Router
- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5**: Static type checking

### **Styling & UI**

- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### **Development Tools**

- **ESLint**: Code quality and consistency
- **Turbopack**: Fast development bundler
- **PostCSS**: CSS processing pipeline

## 📦 Installation

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Git

### **1. Clone Repository**

```bash
git clone https://github.com/gitaalekhyapaul/techjam-fe.git
cd techjam-fe
```

### **2. Install Dependencies**

```bash
npm install
# or
yarn install
```

### **3. Environment Configuration**

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=http://localhost:8545
NEXT_PUBLIC_CONTRACT_ADDRESSES={"revenueController":"0x...","tkToken":"0x...","tkiToken":"0x..."}

# Feature Flags
NEXT_PUBLIC_ENABLE_TESTNET=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### **4. Start Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## 🔧 Development

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Development with specific features
npm run dev:debug    # Development with debug logging
npm run dev:analyze  # Development with bundle analysis
```

### **Project Structure**

```
├── app/                    # Next.js App Router pages
│   ├── creator/           # Creator dashboard routes
│   ├── subscription/      # Subscription management
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── creator.tsx        # Creator-specific components
│   └── tiktok-*.tsx      # Core interface components
├── lib/                   # Utility libraries
│   └── utils.ts           # Helper functions
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

### **Component Development**

```typescript
// Example component structure
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CreatorCardProps {
  creator: Creator;
  onClap: (amount: number) => void;
  onGift: (amount: number) => void;
}

export function CreatorCard({ creator, onClap, onGift }: CreatorCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Component logic here

  return <Card className="p-6">{/* Component JSX */}</Card>;
}
```

## 🔗 Backend Integration

### **API Endpoints**

The frontend integrates with the following backend endpoints:

#### **Authentication**

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - User profile

#### **Contract Interactions**

- `POST /api/contracts/clap` - Submit TKI clap intent
- `POST /api/contracts/gift` - Submit TK gift intent
- `POST /api/contracts/mint-tk` - Mint TK after payment
- `GET /api/contracts/balances` - Get user balances
- `GET /api/contracts/intents` - Get user intents

#### **System**

- `GET /health` - Health check endpoint

### **Smart Contract Integration**

```typescript
// Example contract interaction
import { createPublicClient, http, parseAbi } from "viem";
import { baseSepolia } from "viem/chains";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

export async function submitClap(
  creator: string,
  amount: bigint,
  delegation: string
) {
  // Contract interaction logic
}
```

## 🎨 UI/UX Design

### **Design Principles**

- **Creator-First**: Optimized for content creator workflows
- **Mobile-First**: Responsive design for all device sizes
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast loading and smooth interactions

### **Component Library**

- **Button**: Primary, secondary, and ghost variants
- **Card**: Content containers with consistent spacing
- **Input**: Form inputs with validation states
- **Avatar**: User profile images
- **Progress**: Loading and progress indicators
- **Badge**: Status and category indicators

### **Theme System**

```typescript
// Tailwind CSS configuration
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
        // Custom color palette
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
```

## 🧪 Testing

### **Testing Strategy**

- **Unit Tests**: Individual component testing with Jest
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Complete user workflow testing
- **Visual Regression**: UI consistency testing

### **Running Tests**

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### **Test Configuration**

```typescript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!**/*.d.ts",
  ],
};
```

## 🚀 Deployment

### **Build Process**

```bash
# Production build
npm run build

# Analyze bundle
npm run analyze

# Start production server
npm start
```

### **Environment Variables**

```bash
# Production environment
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.techjam.com
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

### **Deployment Platforms**

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment option
- **Docker**: Containerized deployment
- **Self-hosted**: Custom server deployment

### **Docker Deployment**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS builder
COPY . .
RUN npm run build

FROM base AS runner
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security

### **Frontend Security**

- **Input Validation**: Client-side validation for all user inputs
- **XSS Protection**: Sanitize all user-generated content
- **CSRF Protection**: Token-based request validation
- **Content Security Policy**: Restrict resource loading

### **Wallet Security**

- **Private Key Handling**: Never store private keys in frontend
- **Transaction Signing**: Secure wallet integration
- **Gas Estimation**: Prevent transaction failures
- **Error Handling**: Graceful failure handling

### **API Security**

- **Authentication**: JWT token management
- **Authorization**: Role-based access control
- **Rate Limiting**: Client-side request throttling
- **HTTPS Only**: Secure communication

## 📱 Mobile & Responsiveness

### **Responsive Breakpoints**

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### **Mobile Optimization**

- **Touch-Friendly**: Optimized touch targets (44px minimum)
- **Gesture Support**: Swipe and pinch gestures
- **Performance**: Optimized for mobile devices
- **Offline Support**: Service worker for offline functionality

## 🔍 Performance

### **Optimization Strategies**

- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Bundle Analysis**: Regular bundle size monitoring
- **Lazy Loading**: Component and route lazy loading

### **Performance Monitoring**

```typescript
// Performance monitoring setup
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🤝 Contributing

### **Development Workflow**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### **Code Standards**

- **TypeScript**: Strict mode enabled, proper type definitions
- **ESLint**: Consistent code style and best practices
- **Prettier**: Automated code formatting
- **Testing**: Minimum 80% test coverage for components

### **Commit Convention**

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

## 📚 Documentation

### **Component Documentation**

- **Props Interface**: Detailed prop type definitions
- **Usage Examples**: Code examples for common use cases
- **Storybook**: Interactive component documentation
- **API Reference**: Contract and API integration docs

### **User Documentation**

- **User Guides**: Step-by-step instructions for key features
- **FAQ**: Common questions and troubleshooting
- **Video Tutorials**: Screen recordings for complex workflows
- **Help System**: In-app help and support resources

## 🆘 Support

### **Getting Help**

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the detailed architecture docs
- **Security**: Report security issues privately

### **Community Resources**

- **Discord**: Join our developer community
- **Twitter**: Follow for updates and announcements
- **Blog**: Technical articles and tutorials
- **Workshops**: Regular development workshops

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TikTok TechJam 2025** for the innovative creator economy concept
- **Next.js Team** for the amazing React framework
- **Vercel** for the deployment platform
- **Open Source Community** for the incredible tools and libraries

## 🔮 Roadmap

### **Phase 1: Core Platform (Current)**

- ✅ Basic creator dashboard
- ✅ Wallet integration
- ✅ Intent submission
- ✅ Balance tracking

### **Phase 2: Enhanced Features**

- 🔄 Advanced analytics dashboard
- 🔄 Social features and creator discovery
- 🔄 Mobile app development
- 🔄 Multi-chain support

### **Phase 3: Advanced Features**

- 📋 Creator tokenization
- 📋 Advanced delegation systems
- 📋 Liquidity pools and DeFi integration
- 📋 AI-powered creator recommendations

---

**TikTok TechJam 2025 Frontend** represents the user-facing interface for a revolutionary creator economy platform, combining cutting-edge web technologies with blockchain innovation to create seamless experiences for creators and fans alike.

For backend integration details, see the [TikTok TechJam Backend Repository](https://github.com/gitaalekhyapaul/techjam-be).
