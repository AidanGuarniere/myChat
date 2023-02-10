# ChatGPT UI Template

This is a basic Next.js template for a ChatGPT powered UI using Next.js and Tailwind.

## Prerequisites

- Node.js >= 14
- An [OpenAI API Key](https://beta.openai.com/signup)

## Technologies Used

- [Next.js](https://nextjs.org/) - A React-based framework for building server-side rendered and statically exported web applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces
- [Axios](https://github.com/axios/axios) - A popular library for making HTTP requests in JavaScript
- [OpenAI text-davinci-003](https://beta.openai.com/docs/models/gpt-3) - A state-of-the-art language model developed by OpenAI.

## Installation

1. Clone this repository:
   git clone https://github.com/AidanGuarniere/chatgpt-ui-template.git

2. Install the dependencies:
   cd chatgpt-ui-template
   npm install

3. Add your OpenAI API Key as an environment variable called `OPENAI_API_KEY`:
   i.e:
   touch .env
   OPENAI_API_KEY=_YOUR_API_KEY_

## Usage

To run the development server:
npm run dev

To build the application for production:
npm run build

To start the production server:
npm run start

## Contributing

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/my-new-feature or fix/my-new-fix`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
