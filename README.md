# Eco Bliss Bath
Project n°10 of the OpenClassrooms software testing's diploma course

## Description
Eco Bliss Bath is a fictive start-up specialising in the sale of eco-responsible beauty products.\
As their QA engineer, I was in charge of executing the validation campaign on their online shop first version.\
My responsibilities were to automate functional and API tests using Cypress.\
Then I had to execute the automated tests and analyse the results.\
Eventually, I wrote the validation campaign report and presented it to an examiner.

## Project's installation
1. Download or clone the repository
2. From a terminal opened in the project folder, run the command : `sudo docker-compose up --build`
3. Open the site in your browser: http://localhost:8080 

## Launching Cypress tests
### Prerequisites
1. Install node.js :
- https://nodejs.org/
- To check that the installation has been successful, open your terminal and type
```bash
node -v
```
You should get the version of Node.js that has been installed

2. Install Cypress :
- Type the following code into the terminal
```bash
npm install cypress --save-dev 
```
> Wait a few seconds, or even a few minutes depending on your connection, for the packages to download.
 You should get a message like the following :
 ![Image](https://user.oc-static.com/upload/2023/10/19/16977305146287_image43.png)

### And there we go! 
- To open Cypress GUI, type in your terminal
```bash
npx cypress open
```
- To run all the tests and generate a report, type in your terminal
```bash
npx cypress run
```

## Content
1. Cypress file contaning all the automated tests
2. Validation campaign report

### Spoiler alert ⚠️
OpenClassrooms is a French MOOC (Massive Open Online Course). The projects produced as part of their trainings are destined to be evaluated by French examiners.\
For this reason, all the validation campaign report content is in French.\
I apologize in advance for any inconvenience.