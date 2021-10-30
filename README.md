## echoLocation: app

A client-side application that manages lost/found items from users within campus.

### Installation

1. Clone the repository to local machine
   `git clone https://github.com/echo-location/app.git`
2. Install all of the packages listed in `package.json`:
   `npm i`
3. Run the application locally with CRA's development script:
   `npm start`

### Branch Guidelines

- For setting up branches for future development, consult the following syntax.
- **Syntax**

  - Branches should be written as `{FEATURE}-{firstName}{lastName}`
  - For example, a component for a report button would have a branch labelled `reportButton-johnDoe`

- `git checkout -b {branchName}` : Create a new branch.
- `git branch -a` : View all branches in local & origin repository
- `git checkout {branchName}` : Check out an exisitng branch.
