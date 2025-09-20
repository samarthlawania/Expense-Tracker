# Smart Expense Tracker with AI Insights

A full-stack expense tracking application with AI-powered categorization and insights.

## Features

- **User Authentication**: JWT-based signup/login
- **Expense Management**: Add, list, filter expenses by category/date
- **AI Integration**: OpenAI-powered expense categorization and insights
- **File Upload**: CSV/PDF parsing with AI categorization
- **Budget Management**: Set monthly budgets with email alerts
- **Export**: Excel/CSV export functionality
- **Responsive UI**: Modern React frontend with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT Authentication
- OpenAI API Integration
- Nodemailer for email alerts
- Multer for file uploads

### Frontend
- React + TypeScript
- Tailwind CSS + Radix UI
- React Router
- React Query

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- OpenAI API Key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
# Database Configuration
DB_NAME=expense_tracker
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_HOST=localhost

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

5. Create PostgreSQL database:
```sql
CREATE DATABASE expense_tracker;
```

6. Run migrations (optional - Sequelize will auto-sync):
```bash
npm run migrate
```

7. Seed database with sample data:
```bash
npm run seed
```

8. Start development server:
```bash
npm run dev
```

Backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on http://localhost:8080

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Expenses
- `GET /api/expenses` - List expenses (with filters)
- `POST /api/expenses` - Create expense
- `POST /api/expenses/upload` - Upload CSV/PDF file
- `GET /api/expenses/export` - Export expenses

### Budget
- `GET /api/budget` - Get budget
- `POST /api/budget` - Set budget

### Insights & Alerts
- `GET /api/insights` - Get AI insights
- `GET /api/alerts` - Get budget alerts

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `created_at` (DateTime)

### Expenses Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `date` (Date)
- `description` (Text)
- `amount` (Decimal)
- `category` (String)
- `is_recurring` (Boolean)
- `type` (Enum: 'expense', 'income')
- `created_at` (DateTime)

### Budgets Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `month` (Integer)
- `year` (Integer)
- `amount` (Decimal)
- `created_at` (DateTime)

## Usage

1. **Sign Up**: Create a new account
2. **Login**: Access your dashboard
3. **Add Expenses**: Manually add transactions or upload files
4. **Set Budget**: Configure monthly spending limits
5. **View Insights**: Get AI-powered spending analysis
6. **Export Data**: Download your expenses in Excel/CSV format

## Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License