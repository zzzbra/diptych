# Diptych

## What is Diptych?

An online educational platform where teachers can create courses, and students can learn at their own pace.

## Problem Statement

The conventional MOOC format and Spaced Repetition Software (SRS) based study tools complement each other in a way that suggests a deeper integration of the two systems could create a more complete educational experience than is commonly found with either alone. This project seeks to synthesize both into a single tool that addresses their respective drawbacks with the others' features.

## Tech Stack

1. postgresql
2. express
3. knex
4. create-react-app + craco
5. tailwindcss
6. TypeScript

## Installation

```bash
cd server
npm i
```

```bash
cd client
yarn
```

## Server

```bash
cd server
brew services start postgresql # Assumes MacOS
npm run db:rebuild # Run migrations and seed
npm run dev
```

Server is hosted on port 5000.

## Client

```bash
cd client
npm i
npm run start
```

CRA should open a new tab in your browser of choice. Client is hosted on port 3000.
