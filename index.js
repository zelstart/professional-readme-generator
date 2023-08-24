// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');


function createDoc({ projectName, desc, install, usage, contribution, license, tests, questions, email, github}) {
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

// TODO: Create a function to initialize app
function init() {
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
        writeToFile('README.md', mdContent);
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });
}

function writeToFile(fileName, data) {
fs.writeFile(fileName, data, (err) => {
    if (err) {
        console.error('Error writing README:', err);
    } else {
        console.log('README created successfully.');
    }
});
}

init();
