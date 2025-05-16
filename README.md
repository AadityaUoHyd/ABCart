# ABCart
ABCart is a modern e-commerce platform built with Next.js, designed to deliver a delightful shopping experience for Indian snacks and treats. Featuring a clean white-pink theme, ABCart offers a curated selection of products, customer reviews, and seamless contact functionality. The project leverages Sanity for content management, Clerk for authentication, and Web3Forms for contact form submissions. How it looks like:

![](https://github.com/AadityaUoHyd/ABCart/blob/main/abcart1.png)

![](https://github.com/AadityaUoHyd/ABCart/blob/main/abcart2.png)


## Features

- Product Pages: Browse detailed product listings with images, prices, discounts, and stock status.
- Customer Reviews: View static reviews for products at /products/[slug]/reviews.
- Contact Form: Submit inquiries via a Web3Forms-integrated form at /contact.
- Privacy Policy & About Pages: Learn about ABCart’s policies and mission at /privacy-policy and /about.
- Responsive Design: Tailwind CSS with a white-pink theme (bg-pink-50, text-pink-600).
- Authentication: Clerk integration for user sign-in (used for future dynamic features).
- Social Sharing: Share product pages with the ShareButton component.
- Animations: Smooth transitions using Framer Motion.

## Tech Stack

- Frontend: Next.js 15.3.2, React 19.0.0-rc, Tailwind CSS
- CMS: Sanity 3.88.3 for product data
- Authentication: Clerk 6.3.0
- Form Submissions: Web3Forms
- Icons: Lucide React, React Icons
- Animations: Framer Motion
- State Management: Zustand
- Styling: Tailwind CSS, Styled Components
- Payments: Stripe (for future checkout)
- Deployment: Vercel

## Prerequisites

- Node.js: Version 18.x or 20.x (recommended: 20.x for Vercel compatibility)
- NPM: Version 7+ (bundled with Node.js)
- Git: For version control
- Accounts: Sanity for CMS, Clerk for authentication, Web3Forms for contact form, Vercel for deployment, GitHub for repository hosting

## Getting Started
1. Clone the Repository
   ```
   git clone https://github.com/your-username/abcart.git
   cd abcart
   ```
2. Install Dependencies
   ```
   npm install
   ```

- Note: If peer dependency errors occur due to React 19.0.0-rc or Sanity packages, use:
```
npm install --legacy-peer-deps
```

3. Set Up Environment Variables
   Create a .env.local file in the project root and add the following:
   - NEXT_PUBLIC_BASE_URL=http://localhost:3000
   - SANITY_API_READ_TOKEN=your-sanity-read-token
   - NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   - NEXT_PUBLIC_SANITY_DATASET=production
   - CLERK_SECRET_KEY=your-clerk-secret
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   - NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key


- Sanity: Get SANITY_API_READ_TOKEN and PROJECT_ID from Sanity Manage.
- Clerk: Get CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY from Clerk Dashboard.
- Web3Forms: Get NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY from Web3Forms Dashboard.

4. Run Locally
   Start the development server:
   ```
   npm run dev
   ```
Visit http://localhost:3000 to view the app. The --turbopack flag enables Next.js Turbopack for faster development.
5. Build and Test Production
```
   npm run build
   npm run start
```
Visit http://localhost:3000 to test the production build. If build fails due to peer dependencies, try:
```
npm install --legacy-peer-deps
npm run build
```
6. Generate Sanity Types (Optional)
   If you modify the Sanity schema, generate TypeScript types:
   ```
   npm run typegen
   ```
## Project Structure
```
ABCart/
├── app/(client)/
│   ├── products/[slug]/page.tsx        # Product detail page
│   ├── products/[slug]/reviews/page.tsx # Static reviews page
│   ├── contact/page.tsx               # Contact form with Web3Forms
│   ├── privacy-policy/page.tsx        # Privacy policy page
│   ├── about/page.tsx                 # About page
├── components/                        # Reusable components (e.g., Container, ShareButton)
├── sanity/                            # Sanity schema and helpers
├── public/                            # Static assets
├── styles/                            # Tailwind CSS and global styles
├── package.json                       # Dependencies and scripts
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS configuration
```

## Deployment to Vercel
1. Push to GitHub
   Initialize Git and push to a GitHub repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/abcart.git
   git push -u origin main
   ```

- Ensure .gitignore includes:
```
node_modules/
.env.local
.env
.next/
out/
```

2. Create Vercel Project

Sign in to Vercel.
Click “New Project” > “Import Git Repository.”
Select your abcart repository and click “Import.”

3. Configure Vercel
```
Framework Preset: Next.js
Root Directory: ./
Build Settings:
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

- Environment Variables:NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
- SANITY_API_READ_TOKEN=your-sanity-read-token
- NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
- NEXT_PUBLIC_SANITY_DATASET=production
- CLERK_SECRET_KEY=your-clerk-secret
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
- NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key


- If peer dependency errors occur, set Install Command to:npm install --legacy-peer-deps



4. Deploy
   Click “Deploy.” Vercel will build and deploy the app. Access it at the provided URL (e.g., https://abcart-123.vercel.app).
5. Post-Deployment

- Update NEXT_PUBLIC_BASE_URL: Set to the Vercel domain in Vercel Environment Variables and redeploy.
- Sanity CORS: Add Vercel domain to Sanity Manage > Project > API > CORS Origins with “Allow Credentials.”
- Test Features:
Product pages, reviews, contact form (check Web3Forms dashboard).
Privacy and About pages.
Clerk authentication (if enabled).



## Troubleshooting

- Peer Dependency Errors:
Run npm install --legacy-peer-deps locally or set in Vercel Install Command.
Check npm ls react react-dom for version conflicts.


- Build Fails:
View Vercel logs: vercel logs your-vercel-domain.vercel.app -f.
Replicate locally: npm run build.


- Sanity Errors:
Verify SANITY_API_READ_TOKEN and PROJECT_ID.
Test queries: console.log(await backendClient.fetch('*[_type == "product"][0]')).


- Contact Form Issues:
Check Web3Forms dashboard for submissions.
Verify NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.



## Contributing

- Fork the repository.
- Create a branch: git checkout -b feature/your-feature.
- Commit changes: git commit -m "Add your feature".
- Push: git push origin feature/your-feature.
- Open a Pull Request.

## License
This project is licensed under the MIT License.
Contact
For questions, reach out at abcart@yopmail.com or visit /contact.

Built with ❤️ by the ABCart team.
