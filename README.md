# JSONPlaceholder API Testing

A comprehensive API testing suite for the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) mock API built with Playwright and Node.js.

## Overview

This project contains automated tests for validating JSONPlaceholder API endpoints using Playwright's API testing capabilities. The test suite includes both positive and negative test cases to ensure robust API validation.

## Test Cases
All the test cases will be found [here](https://docs.google.com/spreadsheets/d/17JUxNnvZZ2fSpNgbvof_bB3WKD-w8OGUJQ8jpf9ju3Q/edit?usp=sharing)

## Features

- **Positive Tests**: Validate successful API responses and correct data retrieval
- **Negative Tests**: Verify error handling and edge cases
- **Parallel Execution**: Tests run in parallel for faster feedback
- **HTML Reporting**: Detailed HTML reports for test results

## Tech Stack

- **Playwright**: `@playwright/test` (v1.57.0) - Test automation framework
- **Node.js**: JavaScript runtime

## Project Structure

```
├── tests/
│   ├── Positive_Tests.spec.js   # Success case tests
│   └── Negative_Tests.spec.js   # Error handling tests
├── playwright.config.js          # Playwright configuration
├── package.json                  # Dependencies
└── playwright-report/            # Test reports
```

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/Positive_Tests.spec.js
```

## Test Categories

**Positive Tests (TC_POS_XXX)**
- Retrieve all posts
- Get single post by ID
- Retrieve post comments
- Query by parameters
- Retrieve users
- Create/Update/Delete posts

**Negative Tests (TC_NEG_XXX)**
- Invalid endpoints (404)
- Invalid post IDs
- Invalid comment queries
- Invalid user queries
- Error handling validation

## Configuration

Base URL: `https://jsonplaceholder.typicode.com`


## Report
Report will be generated after running the test. You will find the report in **playwright-report** folder.

<img width="1920" height="2817" alt="screencapture-127-0-0-1-5500-playwright-report-index-html-2025-12-20-21_52_34" src="https://github.com/user-attachments/assets/45883c23-df7b-4029-b3de-b9cc322dfcfe" />

