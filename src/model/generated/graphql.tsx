import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Department = {
  __typename?: 'Department';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateDepartmentInput = {
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  createdEvents?: Maybe<Array<Event>>;
};

export type UserCredentials = {
  __typename?: 'UserCredentials';
  id: Scalars['String'];
  email: Scalars['String'];
};

export type AuthData = {
  __typename?: 'AuthData';
  userCredentials: UserCredentials;
  token: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Gender = {
  __typename?: 'Gender';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateGenderInput = {
  name: Scalars['String'];
};

export type Title = {
  __typename?: 'Title';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateTitleInput = {
  name: Scalars['String'];
};

export type Employment = {
  __typename?: 'Employment';
  _id: Scalars['ID'];
  employee: Employee;
  department: Department;
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type CreateEmploymentInput = {
  employee: Scalars['ID'];
  department: Scalars['ID'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['ID'];
  birth_date: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  hire_date: Scalars['String'];
  gender: Gender;
  department: Department;
  title: Title;
  paychecks: Array<Maybe<Paycheck>>;
  titles: Array<Maybe<EmployeeTitle>>;
  employments: Array<Maybe<Employment>>;
};

export type Employees = {
  __typename?: 'Employees';
  nodes: Array<Employee>;
  count: Scalars['Int'];
};

export type CreateEmployeeInput = {
  birth_date: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  hire_date: Scalars['String'];
  gender: Scalars['ID'];
  department: Scalars['ID'];
  title: Scalars['ID'];
};

export type GetEmployeeInput = {
  id: Scalars['ID'];
};

export type GetEmployeesInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type EmployeeTitle = {
  __typename?: 'EmployeeTitle';
  _id: Scalars['ID'];
  employee: Employee;
  title: Title;
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type CreateEmployeeTitleInput = {
  employee: Scalars['ID'];
  title: Scalars['ID'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type Paycheck = {
  __typename?: 'Paycheck';
  _id: Scalars['ID'];
  employee: Employee;
  salary: Scalars['Float'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type CreatePaycheckInput = {
  employee: Scalars['ID'];
  salary: Scalars['Float'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID'];
  event: Event;
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  date: Scalars['String'];
  creator: User;
};

export type EventInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  date: Scalars['String'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  departments: Array<Department>;
  login: AuthData;
  me: UserCredentials;
  genders: Array<Gender>;
  titles: Array<Title>;
  employments: Array<Employment>;
  employees: Employees;
  employee: Employee;
  employeesTitles: Array<EmployeeTitle>;
  paychecks: Array<Paycheck>;
  bookings: Array<Booking>;
  events: Array<Event>;
};


export type RootQueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RootQueryEmployeesArgs = {
  input?: Maybe<GetEmployeesInput>;
};


export type RootQueryEmployeeArgs = {
  input: GetEmployeeInput;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createDepartment: Department;
  createUser?: Maybe<User>;
  createGender: Gender;
  createTitle: Title;
  createEmployment: Employment;
  createEmployee: Employee;
  createEmployeeTitle: EmployeeTitle;
  createPaycheck: Paycheck;
  bookEvent: Booking;
  cancelBooking: Event;
  createEvent?: Maybe<Event>;
};


export type RootMutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type RootMutationCreateUserArgs = {
  userInput: UserInput;
};


export type RootMutationCreateGenderArgs = {
  input: CreateGenderInput;
};


export type RootMutationCreateTitleArgs = {
  input: CreateTitleInput;
};


export type RootMutationCreateEmploymentArgs = {
  input: CreateEmploymentInput;
};


export type RootMutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type RootMutationCreateEmployeeTitleArgs = {
  input: CreateEmployeeTitleInput;
};


export type RootMutationCreatePaycheckArgs = {
  input: CreatePaycheckInput;
};


export type RootMutationBookEventArgs = {
  eventId: Scalars['ID'];
};


export type RootMutationCancelBookingArgs = {
  bookingId: Scalars['ID'];
};


export type RootMutationCreateEventArgs = {
  eventInput: EventInput;
};
