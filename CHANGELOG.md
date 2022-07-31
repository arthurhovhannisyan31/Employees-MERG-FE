# v0.1.4...
## Code refactor, unit tests
- Add checks before commit and push
- - Run linter, type-check and related tests on commit
- - Run linter, type-check and all tests on push
- Tests
- - Add jest configuration
- - Add unit tests for reducers and ui components

# v0.1.3 
## Code refactor, Authorization improvements
- Configs
- - Extract webpack and typescript configs to configs folder
- Linter 
- - Add Eslint groups, imports validation rules, 
- - Add import cycle dependencies checks
- DevExp
- - Add staged files linting on pre-commit
- - Add types generation
- Auth form
- - Add email reset link
- - Add change password route and form
- - Add password strength validation
- - Add 2'nd tab registration form

# v0.1.2
## Authorization improvements
- Add cookies authorization
- Add husky pre-commit check
- Add readme

# v0.1.1
## Data fetching proxy
- Add proxy for BE queries

# v0.1.0
## Init release
- Add pages Login, Main, Employees, Employee, About
- Add react based data management
- Add graphql schema import from BE
