# TestCreator
## Requirements
Requirements for a web application:
- The user is authorized in the system using a token / cookie, receives a list of tests.
- Can select a test by pressing "Start" and take a short description of the test.
- Select the checkbox "I agree to start", click "Proceed".
- Gets a screen with the first question and answer options, chooses one of them - can move on to the next question.
- Gets a screen with the results of the test and the button "Back" => which redirects to the list of tests.
- It should be different tests for different users
## Technology stack:
  - ASP.NET Core + Entity Framework Core
  - MSSQL
  - React.js
## Database schema
Here is a simple schema for a database
<p align="center">
  <img src="https://user-images.githubusercontent.com/71438910/175767996-98ddaa2b-b496-41dd-8814-58869504c104.png" />
</p>
