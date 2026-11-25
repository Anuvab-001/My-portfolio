# Anuvab — Developer Portfolio

Personal portfolio website for **Anuvab**, Computer Science and Engineering (CSE) student at Daffodil International University (DIU) and aspiring Cloud Engineer.

## Folder Structure

- `index.html` — Entry HTML, SEO metadata, and Google Fonts (`Plus Jakarta Sans`, `DM Sans`, `JetBrains Mono`)
- `src/App.tsx` — Root layout assembling all portfolio sections
- `src/index.css` — Tailwind CSS v4 configuration and typography theme tokens
- `src/data/portfolio.ts` — Centralized personal details, skills, featured projects, cloud journey, and contact links
- `src/assets/images/` — Local image assets (including the default profile placeholder)
- `src/components/` — Modular UI sections (`Navbar`, `HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ProjectInspectorModal`, `CloudJourneySection`, `ContactSection`, `Footer`, `TechBackdrop`)
- `src/utils/` — Algorithm simulations (`campusGraph.ts`, `studentRecords.ts`), validation helpers (`profileImage.ts`), and unit tests (`*.test.ts`)

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.
4. Run unit tests:
   ```bash
   npx --yes tsx --test src/utils/*.test.ts
   ```

## Updating Your Profile Picture

Only you can change the portrait image by updating the repository files:

1. Copy your photo into `src/assets/images/` (for example, `src/assets/images/anuvab-profile.jpg`).
2. Open `src/data/portfolio.ts` and update the import on line 1:
   ```ts
   import defaultProfilePlaceholder from '../assets/images/anuvab-profile.jpg';
   ```
3. Rebuild and push your changes to GitHub.

## Updating Personal Info, Links & Repositories

Edit `src/data/portfolio.ts` to replace:
- `PORTFOLIO_PROFILE.contact.email` (your email address)
- `PORTFOLIO_PROFILE.contact.linkedinUrl` & `linkedinLabel` (your LinkedIn profile URL)
- `FEATURED_PROJECTS[0].githubUrl` and `FEATURED_PROJECTS[1].githubUrl` (your actual C project repository URLs)

## Publishing on GitHub Pages

`vite.config.ts` is configured with `base: './'` so static builds work cleanly on GitHub Pages subpaths.

1. Push this repository to GitHub (`https://github.com/anuvab-001/<your-repo>`).
2. Run a production build locally to generate `dist/`:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` directory using GitHub Actions (`actions/deploy-pages`) or a `gh-pages` branch, and enable **Pages** in your GitHub repository **Settings → Pages**.
