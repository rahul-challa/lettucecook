# LettuceCook 🥗

A modern, dark-mode-only cookbook and recipe website built with React, TypeScript, and styled-components. LettuceCook features a bold, dramatic design with a warm amber accent, beautiful hero section, tag-based filtering, responsive recipe grid, and a detailed recipe view with export-to-DOCX functionality.

---

## ✨ Features
- **Modern, bold dark UI** with warm accent and dramatic hero section
- **Responsive 3-column recipe grid** (desktop) with smooth hover effects
- **Tag filtering** with glowing, round image buttons (Vegan, Vegetarian, Gluten-Free, Halal, Dairy-Free)
- **Powerful search bar** (filters by name, description, or tags)
- **Recipe detail page** with ingredients, instructions, notes, and meta info
- **Download recipe as DOCX** (works on GitHub Pages/static hosting)
- **All assets are local** (no external image dependencies)
- **Beautiful, contrasting footer** with social icons
- **MIT Licensed**

---

## 🛠️ Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [react-router-dom](https://reactrouter.com/)
- [docx](https://www.npmjs.com/package/docx) & [file-saver](https://www.npmjs.com/package/file-saver) (for DOCX export)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```
Visit [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```

---

## 🌐 Deployment
LettuceCook is fully static and works great on [GitHub Pages](https://pages.github.com/):
- Build with `npm run build` and deploy the `build/` folder.
- All DOCX export features work client-side (no backend required).

---

## 📁 Project Structure
```
src/
  assets/         # Local images for tags, hero, and placeholders
  components/     # React components (RecipeCard, RecipeDetail, etc.)
  data/           # Recipe and tag data (edit here to add recipes)
  types/          # TypeScript interfaces
  App.tsx         # Main app logic and routing
  index.tsx       # Entry point
public/           # Static files (manifest, icons, favicon)
```

---

## 🥑 Customization
- **Add recipes:** Edit `src/data/recipes.ts` and follow the `Recipe` interface.
- **Add tags:** Edit `src/data/recipes.ts` and add to the `tags` array (with a local image in `src/assets`).
- **Change accent color:** Edit your theme in `App.tsx` or your styled-components theme provider.

---

## 📝 License
MIT License. See [LICENSE](./LICENSE).

---

## 🙏 Credits & Notes
- All images are local and can be replaced in `src/assets/`.
- Social icons are SVG and styled for visual balance.
- Inspired by modern recipe and food blog design trends.
- Accessibility and keyboard navigation are considered throughout.

---

Happy cooking! 🍋
