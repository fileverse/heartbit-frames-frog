# HeartBit Frames

## Introduction
This document provides a minimal example for integrating frames using the [HeartBitSDK](https://github.com/fileverse/HeartBitSDK).

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js

### Installation
Follow these steps to set up the environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/fileverse/heartbit-frames.git
2. Navigate into the project directory:
   ```bash
   cd heartbit-frames
3. Install the necessary dependencies:
   ```bash
   pnpm install
   
### Running the Application
The application utilizes [Frog](http://frog.fm/) for building farcaster frames. To start the development server, execute the following command:
```bash
pnpm run dev
```
Access the application at http://localhost:5173/dev.


### Deploying to Heroku
To deploy the application on Heroku, the `start` script in your `package.json` file will be utilized. After you push your application code to Heroku, Heroku automatically executes this script to start your application. It is crucial to ensure that your Heroku environment is properly configured to handle the build and run process. This includes adding the nodejs buildpack.






