# GitHub Profile Analyzer

A comprehensive GitHub profile analysis tool that provides detailed insights into any GitHub user's activity, repositories, and coding statistics through an intuitive visual interface.

## 🎯 Features

### Profile Overview
- User profile information (avatar, name, username, bio)
- Account statistics (followers, following, total repos)
- Account age and join date
- Aggregate metrics (total stars and forks across all repositories)

### Visual Analytics
- **Language Distribution Chart**: Interactive doughnut chart showing programming language breakdown across all repositories
- **Top Repositories**: Showcases the 3 most starred projects with trophy rankings

### Repository Browser
- Paginated repository list (6 repos per page)
- Each repo displays:
  - Repository name and creation date
  - Primary programming language with GitHub color coding
  - Star and fork counts
  - Direct links to GitHub repository pages

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Visualization**: Chart.js
- **API**: GitHub REST API v3
- **Styling**: Custom CSS with dark theme
- **Language Colors**: GitHub's official language color scheme

## 📸 Screenshots

### Profile Overview & Language Distribution
![Profile Overview]


<img width="1821" height="893" alt="2025-11-02_17-12" src="https://github.com/user-attachments/assets/eca5d9fe-75c5-4194-a3b9-231b3f36b5c7" />
*Comprehensive user profile with bio, stats, and language breakdown chart*

### Recently Active Repositories
![Recent Activity]
<img width="1498" height="474" alt="2025-11-02_17-13" src="https://github.com/user-attachments/assets/5187c660-7561-4b02-a1bb-2a2e4c095454" />
*Track the most recently updated projects*

### Full Repository List
![Repository Browser]
<img width="1769" height="691" alt="2025-11-02_17-13_1" src="https://github.com/user-attachments/assets/9b5ff8e1-1ae0-4637-be79-888eb50de71d" />
*Browse all repositories with pagination*

## 🚀 Live Demo

[View Live Demo](#) *(Add your GitHub Pages URL here)*

## 💻 Installation & Usage

### Option 1: Use Online
Simply visit the [live demo](#) and enter any GitHub username.

### Option 2: Run Locally

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/github-profile-analyzer.git
cd github-profile-analyzer
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

3. Enter a GitHub username and click "Analyze"

### No Build Process Required
This is a pure vanilla JavaScript application - no npm install, no bundlers, no compilation needed.

## 🔍 How It Works

1. **User Search**: Enter any valid GitHub username
2. **Data Fetching**: Makes requests to GitHub's public API endpoints:
   - `/users/{username}` - User profile data
   - `/users/{username}/repos` - Repository information
3. **Data Processing**: Analyzes repository languages, activity, and statistics
4. **Visualization**: Renders interactive charts and organized data displays
5. **Navigation**: Click any repository or profile element to view on GitHub

## 📊 API Information

- Uses GitHub REST API v3
- No authentication required for public profiles
- Rate limit: 60 requests/hour for unauthenticated requests
- Language color data sourced from GitHub's official color scheme

## 🎨 Features Breakdown

### Language Analysis
- Counts repositories by primary language
- Generates percentage breakdown
- Color-coded using GitHub's official language colors
- Interactive doughnut chart with hover tooltips

### Repository Insights
- Top 3 most starred projects (gold, silver, bronze trophies)
- Recent activity tracking (last 5 updated repos)
- Health status indicators (active/maintained/archived)
- Comprehensive pagination for all repositories

### User Statistics
- Total repository count
- Aggregate star count across all repos
- Aggregate fork count
- Follower and following counts
- Account age calculation

## 🔮 Future Enhancements

- Contribution graph visualization
- Commit frequency analysis
- Collaboration network mapping
- Export data as JSON/CSV
- Compare multiple GitHub profiles
- Dark/light theme toggle
- Responsive mobile optimization

## 📝 Project Structure
```
github-profile-analyzer/
├── index.html          # Main HTML file
├── style.css           # Styling and layout
├── app.js              # Core application logic
├── README.md           # Project documentation
└── screenshots/        # Application screenshots
    ├── profile-overview.png
    ├── recent-activity.png
    └── repo-list.png
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- GitHub REST API for providing public data access
- Chart.js for the visualization library
- GitHub's official language colors repository

## 👨‍💻 Author

**[Your Name]** - [GitHub](https://github.com/SigmundTao)

---

Built with ☕ and JavaScript
