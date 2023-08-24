// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
// const questions = [

// ];

function createDoc({ projectName, desc, install, usage, contribution, license, test, questions, email, github}) {
return `
# ${projectName}

## Description
${desc}

## Table Of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Contact Me](#contact-me)

## Installation
${install}

## Usage
${usage}

## License
${license}

## Contributing
${contribution}

## Tests
${tests}

## Questions
${questions}

## Contact Me
[GitHub](https://github.com/${github})  
You can email me at @{email}  

`
}



inquirer
    .prompt([
        {
            type: 'input', 
            name: 'projectName',
            message: "What is the name of your project?"
        },
        {
            type: 'input' , 
            name: 'desc',
            message: "Write a description for your project"
        },
        {
            type: 'input', 
            name: 'install',
            message: "If your project has any instructions regarding installation, please provide them here:"
        },
        {
            type: 'input', 
            name: 'usage',
            message: "If your project has any usage information, please provide it here:"
        },
        {
            type: 'input', 
            name: 'contribution',
            message: "If your project has any contribution guidelines, please describe them here:"
        },
        {
            type: 'list', 
            name: 'license',
            message: "What License are you using?",
            choices: [
                'MIT',
                'Academic Free License v3.0',
                'Artistic License',
                'Creative Commons',
                'Apache License',
                'ISC'
            ]
        },
        {
            type: 'input', 
            name: 'tests',
            message: "Include any tests here:"
        },
        {
            type: 'input', 
            name: 'questions',
            message: "Include any questions here:"
        },
        {
            type:'input' , 
            name: 'github',
            message: "What is your GitHub username?"
        },
        {
            type: 'input', 
            name: 'email',
            message: "What is your email address?"
        },
    ])
    .then((answers) => {
        const mdContent = createDoc(answers);

        fs.writeFile('README.md', mdContent)
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });




// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
