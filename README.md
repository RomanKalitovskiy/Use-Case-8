## React Form Validation Project

This project, built with Create React App (CRA), showcases a simple form with validation. The form contains four input components: `first_name`, `last_name`, `email`, and `message`. 

- The `first_name` and `last_name` fields validate for the presence of information.
- The `email` field checks for the correctness of the email format.
- The `message` field ensures a minimum length of 10 characters. 

Upon submitting the form with all fields validated, the application saves the data to the Redux store. Users receive an alert confirming the successful submission, and the entered data is simultaneously printed to the browser console.

### Running the App Locally

To run the app locally:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Execute `npm start` to start the development server. The app should open in your default browser.