# Employees administration

[Demo](https://employees-fe.herokuapp.com/) is hosted on Heroku.
Please use following credentials: 

| Credential | Value          |
|:-----------|:---------------:|
| Login      | test@test.test |
| Password   | test           |

## Description
This is a demo project for employees administration system.  

Project allows list employees in table, which supports **pagination**, **sorting**, **columns reordering**.
Profile page allows to observe employee data and edit it in popup form. 
Form has **fields validation** for strings, dates and has dropdown menus.

Application supports **notifications** for login and logout.
Project has full user flow: **log in**, **log out** and **password reset** through **email link**.

## Technologies
Project is written on `TypeScript` + `React`. `Material UI` v4 used for all UI components.

State management implemented with pure `React Context` and `useReducer` hooks.

State provider implemented with composition of contexts, see [context-compose.ts](src/context/context-compose.tsx).

Authorization data stored in cookies, which has expiration limit for 1 day.

All pages lazily loaded on separate chunks using `dynamic imports` and `React lazy imports`.

Pages preloaded using `prefetch` attribute for link tag, which is implemented with `webpack magic comments`.
