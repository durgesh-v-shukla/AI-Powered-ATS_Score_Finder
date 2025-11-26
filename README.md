# 🎯 ATS Score Finder

> **AI-Powered Resume Analysis Tool** - Get your ATS compatibility score and optimize your resume for job applications

A modern, full-stack web application that analyzes resumes against job descriptions using artificial intelligence to provide ATS (Applicant Tracking System) compatibility scores. Upload your resume, paste a job description, and get instant AI-powered feedback with actionable improvements.

![GitHub release (latest by date)](https://img.shields.io/github/v/release/durgesh-v-shukla/AI-Powered-ATS_Score_Finder?label=Latest%20Release)
![GitHub issues](https://img.shields.io/github/issues/durgesh-v-shukla/AI-Powered-ATS_Score_Finder?label=Issues)
![GitHub stars](https://img.shields.io/github/stars/durgesh-v-shukla/AI-Powered-ATS_Score_Finder?style=social)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-18%2B-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple?logo=openai)

---

## ✨ What is ATS Score Finder?

**ATS Score Finder** is an intelligent resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Many companies use ATS software to automatically screen resumes before they reach human recruiters. This tool analyzes your resume and provides:

- **📊 ATS Compatibility Score** (0-100): How likely your resume is to pass ATS screening
- **🎯 Skills Analysis**: Identifies key skills and strengths in your resume
- **🔍 Keyword Recommendations**: Important terms you should consider adding
- **📄 Formatting Issues**: Problems that might prevent ATS from reading your resume correctly
- **💡 AI-Powered Suggestions**: Specific recommendations to improve your resume
- **📑 PDF Export**: Download a comprehensive analysis report

**Two Analysis Modes:**
- **Targeted Analysis**: Upload resume + job description for job-specific feedback
- **General Analysis**: Upload resume only for general ATS compatibility assessment

---

## 🚀 Key Features

### 📤 File Upload
- Support for **PDF** and **DOCX** resume formats
- Drag & drop interface with file validation
- Maximum file size: **10MB**
- Secure file processing (files are never stored)

### 🤖 AI-Powered Analysis
- Uses **Deepseek AI** through OpenRouter for intelligent analysis
- Contextual skill matching with specific examples
- Industry-aware keyword recommendations
- Formatting optimization suggestions

### 📊 Interactive Results Dashboard
- Visual ATS score with color-coded rating
- **Click-to-copy** missing keywords for easy resume editing
- Categorized improvement suggestions
- Real-time analysis feedback

### 📑 Export Functionality
- **One-click PDF export** of complete analysis report
- Professional formatting with pagination
- Includes all analysis results and recommendations
- Date-stamped reports for tracking improvements

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework with modern hooks |
| **TypeScript** | 5.6.3 | Type safety and better development experience |
| **Vite** | 5.4.20 | Ultra-fast build tool and dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Radix UI** | Latest | Accessible, unstyled UI primitives |
| **shadcn/ui** | Latest | Beautiful, customizable components |
| **TanStack Query** | 5.60.5 | Powerful data fetching and state management |
| **React Hook Form** | 7.55.0 | Performant forms with easy validation |
| **Zod** | 3.24.2 | TypeScript-first schema validation |
| **Lucide React** | 0.453.0 | Beautiful icons library |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 4.21.2 | Web application framework |
| **TypeScript** | 5.6.3 | Type safety for backend code |
| **tsx** | 4.20.5 | TypeScript execution engine |
| **Multer** | 2.0.2 | File upload handling middleware |
| **pdf-parse** | 1.1.1 | PDF text extraction |
| **mammoth** | 1.11.0 | DOCX file processing |
| **dotenv** | 17.2.2 | Environment variable management |

### **AI Integration**
| Service | Model | Purpose |
|---------|-------|---------|
| **OpenRouter** | deepseek/deepseek-chat | AI-powered resume analysis |
| **Deepseek AI** | Latest | Cost-effective, high-quality analysis |

### **PDF Generation**
| Technology | Version | Purpose |
|------------|---------|---------|
| **jsPDF** | 3.0.3 | Client-side PDF generation |

### **Development Tools**
| Tool | Version | Purpose |
|------|---------|---------|
| **ESBuild** | 0.25.0 | Fast JavaScript bundler |
| **PostCSS** | 8.4.47 | CSS processing |
| **Autoprefixer** | 10.4.20 | CSS vendor prefixing |

---

## 📋 Prerequisites

Before running this project locally, ensure you have:

- **Node.js** version 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **OpenRouter API Key** ([Get one here](https://openrouter.ai/))
- A modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 Local Development Setup

### 1. **Clone the Repository**
```bash
git clone https://github.com/durgesh-v-shukla/AI-Powered-ATS_Score_Finder.git
cd AI-Powered-ATS_Score_Finder
```

### 2. **Install Dependencies**
```bash
npm install
```
This will install all required packages including:
- React and TypeScript dependencies
- Express.js server dependencies
- AI integration libraries
- UI components and styling tools

### 3. **Environment Configuration**

Create a `.env` file in the root directory:

```env
# 🤖 AI Service Configuration (REQUIRED)
OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here

# 🌐 Server Configuration
PORT=5001
NODE_ENV=development
APP_URL=http://localhost:5001
```

### 4. **Get Your OpenRouter API Key**

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
4. Navigate to "API Keys" in your dashboard
5. Create a new API key
6. Copy the key and replace `sk-or-v1-your-actual-api-key-here` in your `.env` file
7. **Important**: Add credits to your OpenRouter account for API usage

### 5. **Start the Development Server**

```bash
npm run dev
```

The application will start at **http://localhost:5001**

You should see output similar to:
```
[dotenv@17.2.2] injecting env (4) from .env
11:52:18 PM [express] serving on port 5001
```

### 6. **Verify Installation**

Open your browser and navigate to `http://localhost:5001`. You should see the ATS Score Finder interface.

---

## 📝 How to Use

### 1. **Upload Your Resume**
- Click the upload area or drag & drop your resume file
- Supported formats: PDF, DOCX (max 10MB)

### 2. **Add Job Description (Optional)**
- **For targeted analysis**: Paste the specific job description you're applying for
- **For general analysis**: Leave blank to get general ATS compatibility feedback
- Use the "Paste from clipboard" button for convenience

### 3. **Analyze**
- Click "Analyze Resume" button
- Wait for AI analysis (typically 5-15 seconds)

### 4. **Review Results**
- View your ATS compatibility score
- Check identified skills and keyword recommendations
- Read personalized improvement suggestions

### 5. **Export Report**
- Click "Export Report" to download a PDF
- Use the report to track improvements over time

---

## 🏗️ Project Structure

```
ATSScoreFinder/
├── 📁 client/                    # Frontend React application
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI components
│   │   │   ├── 📁 ui/           # shadcn/ui base components
│   │   │   ├── 📄 file-upload.tsx           # Resume upload component
│   │   │   ├── 📄 job-description-input.tsx # Job description input
│   │   │   └── 📄 results-dashboard.tsx     # Analysis results display
│   │   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📁 lib/              # Utility functions & API client
│   │   ├── 📁 pages/            # Page components
│   │   ├── 📄 App.tsx           # Main application component
│   │   ├── 📄 main.tsx          # Application entry point
│   │   └── 📄 index.css         # Global styles
│   └── 📄 index.html            # HTML template
├── 📁 server/                    # Backend Express application
│   ├── 📄 index.ts              # Server entry point with middleware
│   ├── 📄 routes.ts             # API routes & AI integration
│   ├── 📄 storage.ts            # Database models (future use)
│   └── 📄 vite.ts               # Vite dev server integration
├── 📁 shared/                    # Shared TypeScript schemas
│   └── 📄 schema.ts             # Zod validation schemas
├── 📁 test/                      # Test files and sample data
├── 📄 package.json              # Dependencies and scripts
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tailwind.config.ts        # Tailwind CSS setup
├── 📄 vite.config.ts            # Vite build configuration
├── 📄 .env                      # Environment variables (create this)
└── 📄 README.md                 # This file
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run db:push` | Push database schema (future feature) |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serve the main application |
| `POST` | `/api/analyze-resume` | Upload resume and get AI analysis |

### Example API Usage

```bash
# Analyze resume with job description (multipart/form-data)
curl -X POST http://localhost:5001/api/analyze-resume \
  -F "resume=@path/to/your/resume.pdf" \
  -F "jobDescription=Your job description text here"

# Analyze resume without job description (general analysis)
curl -X POST http://localhost:5001/api/analyze-resume \
  -F "resume=@path/to/your/resume.pdf"
```

---



## 🔒 Security & Privacy

- **No Data Storage**: Resume files are processed in memory and never saved
- **Secure Processing**: Files are validated and sanitized
- **API Key Protection**: Environment variables keep keys secure
- **Input Validation**: All inputs validated with Zod schemas
- **File Size Limits**: 10MB maximum to prevent abuse

---

## 🐛 Troubleshooting

### **Common Issues**

**❌ "OpenRouter API key not configured"**
```bash
Solution: Check your .env file has OPENROUTER_API_KEY set correctly
```

**❌ Server won't start on port 5001**
```bash
Solution: Change PORT in .env file or kill existing process
```

**❌ File upload fails**
```bash
Solution: Ensure file is PDF or DOCX and under 10MB
```

**❌ Analysis takes too long**
```bash
Solution: Check your OpenRouter account has sufficient credits
```

### **Development Issues**

**TypeScript errors:**
```bash
npm run check  # Check for type errors
```

**Build issues:**
```bash
rm -rf node_modules
npm install    # Reinstall dependencies
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

If you encounter issues:

1. **Check this README** for common solutions
2. **Search existing issues** in the repository
3. **Create a new issue** with:
   - Your operating system
   - Node.js version (`node --version`)
   - Error logs
   - Steps to reproduce

---

## 🔮 Future Enhancements

- [ ] **Multiple Resume Formats**: Support for more file types
- [ ] **Resume Builder**: Built-in resume creation tool
- [ ] **Job Application Tracking**: Track applications and outcomes  
- [ ] **Advanced Analytics**: Historical analysis and trends
- [ ] **Team Features**: Share and collaborate on resumes
- [ ] **Mobile App**: Native mobile applications
- [ ] **Browser Extension**: Analyze jobs while browsing

---

## 🙏 Acknowledgments

**Special thanks to:**

- **Vishwakarma Institute of Technology, Pune** - My college that provided the foundation for this project
- **My Professor** - For guidance and support throughout the development process
- **Siddhant Gade** - My friend who provided valuable feedback and testing
- **Rushi Solankar** - For collaborative discussions and code reviews
- **Rohit Shitole** - For continuous encouragement and project insights

This project represents our collective learning journey in full-stack development and AI integration.

---

## 📊 Project Stats

- **Languages**: TypeScript (90%), CSS (10%)
- **Bundle Size**: ~2MB (optimized)
- **Performance**: 95+ Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliant

---

**🎯 Built with ❤️ by Durgesh Shukla to help job seekers land their dream jobs**

*Star ⭐ this repository if you find it helpful!*