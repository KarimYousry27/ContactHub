# 📇 ContactHub

ContactHub is a responsive contact management application built with **HTML, CSS, Bootstrap, and vanilla JavaScript**. It lets you keep contact details in one place, find people quickly, and organize important contacts without needing an account or a backend.

I built this project to practice CRUD operations, DOM manipulation, form validation, and working with the browser's Local Storage API.

## ✨ Features

- **Manage contacts:** Add, view, edit, and delete contacts, with confirmation before deletion.
- **Contact details:** Save a name, phone number, and optional information such as email, address, notes, and group.
- **Search:** Filter contacts by name, phone number, or email.
- **Favorites and emergency contacts:** Mark important people and view them in dedicated sidebar sections.
- **Dashboard:** See contact, favorite, and emergency counts.
- **Form feedback:** Validate inputs and show alerts for important actions.
- **Local storage:** Keep saved contacts in the same browser after refreshing the page.
- **Responsive interface:** Use the dashboard on different screen sizes.

## 🛠️ Technologies Used

- **HTML5** — Page structure
- **CSS3** — Custom styling
- **Bootstrap 5** — Layout and interface components
- **JavaScript (ES6)** — Contact management, search, and DOM updates
- **Local Storage API** — Browser-side data persistence
- **SweetAlert2** — Confirmation dialogs and alerts
- **Font Awesome** — Icons

## 📁 Project Structure

```text
ContactHub/
├── index.html
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── bootstrap.bundle.min.js
│   └── main.js
├── images/
│   └── ...
└── readme.md
```

## ▶️ Getting Started

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser, or run it with the **Live Server** extension.
4. Add your first contact and explore the dashboard.

No installation or build step is required.

## 💡 What I Practiced

- Creating, reading, updating, and deleting data with JavaScript
- Working with objects and arrays
- Handling form inputs and validating user data
- Updating the DOM based on application state
- Filtering contacts with a search field
- Saving and loading data with `localStorage`
- Building a responsive interface with Bootstrap and CSS

## ℹ️ Notes

ContactHub is a **front-end learning project**. Contact information is stored locally in your browser, not in an online database. Clearing browser storage can remove saved contacts, and contacts do not automatically sync between devices.
