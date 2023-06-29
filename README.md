# Stealth Chat Web App

🔒 This is a stealth chat web application built using Next.js, Tailwind CSS, and Firebase. It allows users to engage in anonymous group chatting in real-time. The application has a responsive design to provide an optimal experience across different devices.

## Features

```
🌐 Real-time Group Chatting: Users can join anonymous chat rooms and participate in group conversations in real-time.
➕ Create Room: Users have the option to create a new chat room with a unique identifier.
🚪 Join Room: Users can enter a chat room by providing the unique room identifier.
```

## Technologies Used

```
🔧 Next.js: A React framework for building server-side rendered and statically generated applications.
🎨 Tailwind CSS: A utility-first CSS framework for creating responsive and customizable user interfaces.
🔥 Firebase: A real-time database and backend platform for building web and mobile applications.
```

## Getting Started

To run this web application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Pr454th/Stealth-Chat.git`
2. Install dependencies: `npm install`
3. Configure Firebase: Set up a Firebase project and obtain the necessary configuration details (API keys, project ID, etc.).
4. Create a `.env` file in the root directory and add the Firebase configuration variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

5. Start the development server: `npm run dev`
6. Open your browser and navigate to `http://localhost:3000`

## Folder Structure

```
📁 public/             # Static files
  📄 favicon.ico       # Favicon image
📁 src/                # Source code
  📁 components/       # React components
  📁 app/              # Next.js pages
  📁 config/           # Firebase configuration
📄 .env                # Environment variables
📄 README.md           # Project documentation
📄 next.config.js      # Next.js configuration
📄 package.json        # Project dependencies
📄 tailwind.config.js  # Tailwind CSS configuration
```

## Deployment

This application is deployed on [Vercel](https://vercel.com). You can access the deployed version at [https://stealth-chat.vercel.app/](https://stealth-chat.vercel.app/).

## Contributing

Contributions to the Stealth Chat Web App are welcome! If you find any issues or have suggestions for improvement, please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
