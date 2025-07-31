require('dotenv').config({ path: './frontend/.env.local' });

const mongoose = require('mongoose');
const fs       = require('fs');
const csv      = require('csv-parser');
const Product  = require('./frontend/models/Product').default;

const MONGODB_URI = process.env.MONGODB_URI;

/** Helper to convert Google Drive links to direct image URLs */
function normalizeDriveUrl(url) {
  if (!url) return '/images/default.jpg';
  const m = url.match(/\/file\/d\/([^/]+)\//) || url.match(/[?&]id=([^&]+)/);
  if (m && m[1]) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  return url;
}

async function runImport() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000, bufferCommands: false });
    console.log('✅ Connected to MongoDB');

    const products = [];

    fs.createReadStream('testingDataorg.csv')
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim().toLowerCase(), 
        // now headers like " Name " → "name", "EcoScore" → "ecoscore", etc.
      }))
      .on('data', row => {
        // Debug: uncomment to inspect incoming rows once
        // console.log(Object.keys(row), row);

        try {
          products.push({
            name:        row['name']?.trim(),
            category:    row['category']?.trim(),
            ecoScore:    parseFloat(row['ecoscore']) || 0,
            price:       parseFloat(row['price'])    || 0,
            description: row['description']?.trim() || '',
            imageUrl:    normalizeDriveUrl(row['imageurl']),
          });
        } catch (err) {
          console.warn('⚠️ Skipping row:', err.message);
        }
      })
      .on('end', async () => {
        console.log(`📦 Inserting ${products.length} products…`);
        try {
          const inserted = await Product.insertMany(products);
          console.log(`🎉 Inserted ${inserted.length} products.`);
        } catch (err) {
          console.error('❌ Insertion error:', err);
        } finally {
          await mongoose.disconnect();
          console.log("✅ Script completed");
        }
      });
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
}

runImport();
