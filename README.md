# Covid Contact Management App

This is a covid contact management app built with ReactJS, TypeScript, TailwindCSS, Redux, and React Router v6. It allows users to add, view, edit, and delete contacts. The app also features a dashboard with a responsive side navigation and a statistics page displaying data fetched from an API.

### API endpoints used

The https://disease.sh/ API provides COVID-19 data. The specific endpoints are:

https://disease.sh/v3/covid-19/all : Provides overall global COVID-19 data like total cases, deaths, recovered cases, active cases, etc.

https://disease.sh/v3/covid-19/countries : Provides country-wise COVID-19 data for all countries with their lat-long, flag image, population and other data. 

https://disease.sh/v3/covid-19/historical/all?lastdays=all : Provides the historical COVID-19 data from the beginning till now with current day data as well. 

In summary, these endpoints provide comprehensive COVID-19 data that you can use for analysis, visualizations, and dashboards. The data includes:


1. Total cases
2. New cases
3. Total deaths
4. New deaths
5. Recovered cases
6. Active cases
7. Critical cases
8. Tests, etc.


The data is updated daily so you get the latest COVID-19 numbers using this API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm: You need to have Node.js and npm installed on your machine to run this app. Node.js is a JavaScript runtime, and npm is a JavaScript package manager. You can download both of them [here](https://nodejs.org/).

### Installation

1. Clone the repository:

`git clone https://github.com/prince-chauhan/covid-contact-management.git`

2. Navigate to the project directory:

`cd contact-management-app`

3. Install the dependencies:

`npm install`

4. Start the development server:

`npm start`

The app should open in a new tab in your web browser. If it doesn't, you can manually navigate to http://localhost:3000.

### Usage

The app displays a list of contacts by default.
To add a new contact, click on the "Add Contact" button and fill out the form.
To edit a contact, click on the "Edit" button next to the contact, make your changes, and then click on the "Save" button.
To delete a contact, click on the "Delete" button next to the contact.

### Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

### License

This project is licensed under the MIT License - see the LICENSE.md file for details.
