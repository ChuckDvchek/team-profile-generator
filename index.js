const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHtml = require('./util/generateHtml');
const inquirer = require('inquirer');
const fs = require('fs');

const employees = [];

const start = () => {
    inquirer.prompt([
        {
            type:'input',
            message:"Please enter your team manager's name.",
            name:'name'
        },
        {
            type:'input',
            message:"Please enter your team manager's employee ID.",
            name:'id'
        },
        {
            type:'input',
            message:"Please enter your team manager's email address.",
            name:'email'
        },
        {
            type:'input',
            message:"Please enter your team manager's office number.",
            name:'officeNumber'
        }
    ]).then( ans => {
        const myManager = new Manager (ans.name,ans.id,ans.email,ans.officeNumber);
        employees.push(myManager);
        continueBuilding();
    });
}

const continueBuilding = () => {
    inquirer.prompt(
        {
            type:'list',
            message:'What would you like to do?',
            name:'choice',
            choices:['Add an engineer','Add an intern','Finish building team']
        }
    ).then( ans => {
        switch(ans.choice){
            case 'Add an engineer':
                inquirer.prompt([
                    {
                        type:'input',
                        message:"Please enter your engineer's name.",
                        name:'name'
                    },
                    {
                        type:'input',
                        message:"Please enter your engineer's employee ID.",
                        name:'id'
                    },
                    {
                        type:'input',
                        message:"Please enter your engineer's email address.",
                        name:'email'
                    },
                    {
                        type:'input',
                        message:"Please enter your engineer's GitHub username.",
                        name:'github'
                    }
                ]).then( ans => {
                    const myEngineer = new Engineer(ans.name,ans.id,ans.email,ans.github);
                    employees.push(myEngineer);
                    continueBuilding();
                });
            break;
            case 'Add an intern':
                inquirer.prompt([
                    {
                        type:'input',
                        message:"Please enter your intern's name.",
                        name:'name'
                    },
                    {
                        type:'input',
                        message:"Please enter your intern's employee ID.",
                        name:'id'
                    },
                    {
                        type:'input',
                        message:"Please enter your intern's email address.",
                        name:'email'
                    },
                    {
                        type:'input',
                        message:"Please enter your intern's School.",
                        name:'github'
                    }
                ]).then( ans => {
                    const myIntern = new Intern(ans.name,ans.id,ans.email,ans.github);
                    employees.push(myIntern);
                    continueBuilding();
                });
            break;
            case 'Finish building team':
                //break out of the loop and generate html file
                fs.writeFile('employees.html',generateHtml(employees),(err) => {
                    if (err){
                        console.log(err);
                    } else {
                        console.log('Great Success!')
                    }
                });
            break;
        }
    });
}
start();