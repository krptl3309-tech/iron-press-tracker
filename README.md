# 🧺 IstriKhata - Laundry & Iron Press Expense Tracker

A modern, responsive, mobile-first web dashboard to manage and track clothes given for iron/press & washing, record manual payments (Cash & UPI), manage customizable rate cards, and share hisaab directly on WhatsApp!

---

## ✨ Features

- **📊 Balance & Expense Overview**: Real-time calculation of Total Bill, Amount Paid, Pending Due (with alert box), and Active Clothes in Laundry.
- **📱 Mobile-First UI**: 2x2 compact metric cards, responsive touch cards for batches & payments, touch stepper controls (`-` and `+`), and a sticky bottom navigation bar.
- **🧺 Customizable Rate Card**:
  - Default: Normal Clothes (₹7), Saree (₹50).
  - Customizable Kurti Ironing (₹15), Washing (₹25), Wash + Iron (₹35).
  - Ability to add ANY custom garment & service with custom pricing.
- **💳 100% Manual Payment Entry**:
  - Record payments in Cash or UPI (Google Pay, PhonePe, Paytm, etc.).
  - Date & Time tracking.
  - Fully editable payment ledger (edit or delete anytime).
- **💬 Direct WhatsApp Hisaab Integration**:
  - Pre-configured with **Laundry Khodiyar** (`+91 9725843574`).
  - 1-click "WhatsApp Hisaab Bhejo" button that opens WhatsApp with pre-formatted message.
- **💾 Local Persistence**: All data is automatically saved to browser's `localStorage`.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack
- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
