# MyGPT: A ChatGPT Clone

MyGPT is an open-source clone of ChatGPT built using Next.js and Tailwind CSS. It provides a user-friendly interface for interacting with GPT-like language models. This project is not directly affiliated with OpenAI.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js >= 14
- An [OpenAI API Key](https://beta.openai.com/signup)

## Technologies Used

- [Next.js](https://nextjs.org/) - A React-based framework for building server-side rendered and statically exported web applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces
- [Axios](https://github.com/axios/axios) - A popular library for making HTTP requests in JavaScript
- [OpenAI GPT-like models](https://beta.openai.com/docs/models/overview) - Large language models developed by OpenAI

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/your-username/mygpt.git
   ```

2. Navigate to the project directory:

   ```
   cd mygpt
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the project root and add your OpenAI API Key as an environment variable called `OPENAI_API_KEY`:

   ```
   touch .env
   echo "OPENAI_API_KEY=_YOUR_API_KEY_" > .env
   ```

## Usage

- To run the development server:

  ```
  npm run dev
  ```

- To build the application for production:

  ```
  npm run build
  ```

- To start the production server:

  ```
  npm run start
  ```

## Contributing

We welcome contributions! To contribute, please follow these steps:

1. Fork this repository
2. Clone your fork to your local machine: `git clone https://github.com/your-username/chatGPT-UI-template.git`
3. Create your feature branch: `git checkout -b feature/my-new-feature` or `git checkout -b fix/my-new-fix`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature/my-new-feature`
6. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.