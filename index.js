const fs = require('fs');
const inquirer = require('inquirer');

// creates the structure for the document, and plugs in data gathered from user input to fill it in.
function createDoc({ projectName, desc, install, usage, contribution, license, badge, tests, questions, email, github }) {
    return `
# ${projectName}
${badge}

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

## Test Instructions
${tests}

## Questions/FAQ
${questions}

## Contact Me
[GitHub](https://github.com/${github})  
You can email me at ${email}  

`
}

// object for license badges 
let licenseBadges = [
    {
        license: "Apache 2.0",
        badge: "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    {
        license: "Boost Software License 1.0",
        badge: "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    },
    {
        license: "Creative Commons (CC0)",
        badge: "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)",
    },
    {
        license: "ISC",
        badge: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
    },
    {
        license: "MIT",
        badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    },
]


// question prompts for user, using inquirer package
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'projectName',
                message: "What is the name of your project?"
            },
            {
                type: 'input',
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
                    'Apache 2.0',
                    'Boost Software License 1.0',
                    'Creative Commons (CC0)',
                    'ISC',
                    'MIT'
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
                type: 'input',
                name: 'github',
                message: "What is your GitHub username?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is your email address?"
            },
        ])
        // take user's answers and populate the readme template with them.
        .then((answers) => {
            const selectedLicense = answers.license;
            const selectedBadge = licenseBadges.find(item => item.license === selectedLicense).badge; // compare license answer with our license storage to grab img for badge
            const mdContent = createDoc({ ...answers, badge: selectedBadge }); 
            writeToFile('generatedREADME.md', mdContent);
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

// the function to actually write the file, and confirm in the terminal that a file was created
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
