# simny.dev

My personal website/portfolio/blog. Built with dynamic content management through Contentful headless CMS to add projects and blog posts. Using Firebase to enable engagement on published content, such as views and likes.<br>

## Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **CMS:** Contentful
- **Database:** Firebase
- **Deployment:** Vercel

## Running Locally

1. Install dependencies with `npm install`
2. Create a `.env.local` file similar to `.env.example`
3. Start project with `npm run dev`

### Getting API Keys

<details>
<summary>Contentful</summary>
<br>
1. Setup a Contentful account. <br>
2. Create content models. <br>

> This repository uses the following content models:
>
> 1. blog
> 2. featuredProject
> 3. project
> 4. galleryDestinations (for photography)

3. Copy your Space ID and Content Delivery API access token <br>
4. Save your API keys to your `.env.local` <br>
</details>

<details>
<summary>Firebase</summary>
  <br>
1. Setup a new Firebase project <br>
2. Copy the API keys. <br>
3. Go to Build and create a Firestore Database <br>
4. Add a collection named <code>articles</code> <br>
5. Save your API keys to your <code>.env.local</code><br>
</details>
 
## Sitemap Overview
`pages/index.js` : Homepage <br>
`pages/about.js` : About page <br>
`pages/gallery.js` : Photography Gallery page <br>
`pages/projects.js` : All projects <br>
`pages/blog.js` : All blog posts <br>
`pages/blog/[slug].js` : Individual blog post <br>
`pages/api/views` : API to fetch blog post interactions from Firebase <br>
`pages/api/likes` : API to write blog post likes to Firebase <br>
