
# 🛒 GreenCart – Eco-Friendly Online Grocery Store

**GreenCart** is a full-stack eco-conscious e-commerce platform designed for daily essentials, inspired by Walmart. It helps users shop smarter and live greener by recommending products with better Eco Scores.

[🌐 View on GitHub »](https://github.com/sakshi052/GreenCart-WalmartSparkathon2025.git)

---

## 🌿 Features

- 🧭 **Walmart-style Navigation**  
  - Departments dropdown with 26 categories  
  - Search bar with live results  
  - Delivery mode selector (`Pickup` or `Delivery`)

- 🛍️ **Product Catalog**  
  - 1600+ products loaded from CSV  
  - EcoScore, price, and description displayed  
  - Product detail page with eco-alternatives

- 🛒 **Smart Cart System**  
  - Quantity controls (`➕`, `➖`)  
  - Auto-remove on quantity = 0  
  - Total price and Eco Score display  
  - Promo code rewards for switching to greener alternatives

- 🤖 **AI Eco Assistant (GPT-powered)**  
  - On-cart chatbot that explains:
    - Product’s carbon footprint  
    - Disposal methods  
    - Environmental benefits

- 📈 **Admin Panel**  
  - CSV upload and manual product entry  
  - MongoDB integration

- 🌍 **Green Recommendations**  
  - Alternative suggestions based on better Eco Score  
  - Recommendations shown on product, cart, and homepage

---

## 📸 Screenshots

### 🛍️ Product Page with Eco Alternatives
Eco-friendly suggestions appear when a product with lower Eco Score is viewed.

![Product Page Screenshot](https://res.cloudinary.com/dqb4rgzpq/image/upload/v1752186796/Screenshot_2025-07-11_040147_x15g5a.png)

---

### 🤖 Cart Page with GPT-Powered AI Assistant
Shows eco insights like carbon footprint, plus points, and disposal tips for each cart item.

![AI Chatbot Screenshot](https://res.cloudinary.com/dqb4rgzpq/image/upload/v1752186793/Screenshot_2025-07-11_040221_tc12dl.png)

---

## 🧑‍💻 Tech Stack

| Frontend | Backend | Database | AI |
|---------|---------|----------|----|
| Next.js + Tailwind CSS | Node.js + Express | MongoDB (Atlas) | OpenAI GPT |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sakshi052/GreenCart-WalmartSparkathon2025.git
cd GreenCart-WalmartSparkathon2025
```

### 2. Setup Environment Variables

Create `.env.local` in the `frontend/` and `backend/` folders.

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_OPENAI_API_KEY=your-gpt-api-key
```

**Backend (`backend/.env`)**
```env
MONGODB_URI=your-mongodb-uri
OPENAI_API_KEY=your-openai-api-key
```

### 3. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 4. Run the App

```bash
# Start backend
npm run dev

# In another terminal
cd ../frontend
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 AI Assistant (Eco Insights)

**API Endpoint:**

```bash
POST /api/eco-insights
```

**Request:**
```json
{
  "productName": "Dove Beauty Bar",
  "ecoScore": "85"
}
```

**Response includes:**
- 🌱 Carbon Footprint
- ✅ Environmental Benefits
- ♻️ Disposal Tips

---

## 🛠️ Deployment

- **Frontend:** [Vercel](https://vercel.com)


Make sure:
- Vercel’s root directory is set to `/frontend`
- `.env` and `.env.local` are configured

---

## 📦 Data

- Products imported from CSV (`/data/products.csv`)
- Fields used:  
  `name`, `category`, `ecoScore`, `price`, `description`, `imageUrl`

- Collections:  
  `products`, `cart`, `orders`, `users`

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Open a PR on GitHub

---

## 📧 Contact

Made with 💚 by [Sakshi](https://github.com/sakshi052)

Have feedback or ideas? Reach out via GitHub Issues or Discussions!

---

## ⭐️ Star this repo if you found it helpful!
