# Modern Hospital Management System

A full-stack web application for managing hospital operations, built with Next.js, Firebase, and Tailwind CSS.

## Features

### For Patients
- Book appointments with doctors
- View available doctors and their specialties
- Send feedback and inquiries through contact form
- Real-time doctor availability status

### For Administrators
- Secure admin login system
- Manage doctor availability
- View and track patient appointments
- Monitor patient feedback
- Add/remove doctors from the system

## Tech Stack

- **Frontend**: 
  - Next.js 13+ (App Router)
  - React
  - Tailwind CSS
  - Lucide React (Icons)

- **Backend**:
  - Firebase Authentication
  - Firebase Firestore
  - Web3Forms API (Email Notifications)

## Prerequisites

Before running this project, make sure you have:

1. Node.js (v14 or higher)
2. npm or yarn
3. A Firebase account
4. A Web3Forms account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Web3Forms Configuration
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hospital-management.git
cd hospital-management
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Create the following collections:
   - `appointments`
   - `doctors`
   - `feedback`
5. Set up security rules for your Firestore database

## Admin Access

Default admin credentials:
- Email: subhranilbar10@gmail.com
- Password: admin@9434

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin login page
│   ├── admin-panel/       # Admin dashboard
│   └── page.js            # Main page
├── components/            # React components
│   ├── AdminLogin.jsx     # Admin login component
│   ├── AdminPanel.jsx     # Admin dashboard component
│   ├── ContactSection.jsx # Contact form component
│   ├── Footer.jsx         # Footer component
│   ├── Header.jsx         # Header component
│   └── HospitalManagement.jsx # Main page component
└── conig/                 # Configuration files
    └── firebase.js        # Firebase configuration
```

## Features in Detail

### Appointment Booking
- Patients can book appointments by providing:
  - Name
  - Age
  - Disease
  - Phone Number
  - Preferred Date
- Real-time validation and confirmation

### Doctor Management
- Admin can:
  - Add new doctors
  - Update doctor availability
  - Remove doctors
  - View all doctors' status

### Feedback System
- Patients can send feedback through the contact form
- Feedback is stored in Firebase
- Admin can view all feedback messages
- Email notifications for new feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@hospitalcare.com or create an issue in the repository.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Web3Forms](https://web3forms.com/)
- [Lucide React](https://lucide.dev/)
