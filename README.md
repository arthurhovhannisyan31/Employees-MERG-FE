### Start with `yarn start:dev`

#### Organize imports using following order
1. deps
2. components
3. model
4. helpers

## Description
Project allows administrating employees data, like creating a profile and editing profile data.
Also, you can control profile related records like paychecks, titles, employments.
Project has full user flow: log in, log out, password reset.
Users dashboard allows downloading report based on selected filters.

## Technologies
Project is written on ts + react, state managements uses react reducer + react context.
Authorization data stored in cookies.
All pages loaded on separate chunks on request using react lazy loading.
