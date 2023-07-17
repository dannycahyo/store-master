# StoreMaster - Ecommerce Dashboard

StoreMaster is an ecommerce dashboard. It provides an intuitive and user-friendly interface for managing products and viewing shopping carts. The application incorporates various features to facilitate efficient product management and cart analysis.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [API Integration](#api-integration)
- [Technologies Used](#technologies-used)
- [Improvement Opportunities](#improvement-opportunities)

## Features

- **Product Management**: Admin can view a table listing all available products. Moreover, they can also search specific product by product name and filter based on brand, category, and price range.
- **Auto-Saved Filters and Search**: The applied filters and search queries are automatically saved, allowing admin to resume from where they left off. If the admin accidentally refresh the page or navigate away, they can easily return to the previous state.
- **Product Chart**: Admin can visualize the number of items per product using a chart.
- **Cart Management**: Admin can view a table listing all available carts and their details.
- **Cart Details**: Admin can view the detailed information of a selected cart on a separate card detail page.
- **Pagination**: Pagination is implemented in the products and carts tables for efficient navigation.

## Demo

A live demo of the StoreMaster application is available at:

- Application: [https://storemaster.vercel.app/](https://storemaster.vercel.app/)
- Storybook: [https://storemaster-story.vercel.app/](https://storemaster-story.vercel.app/)

## Installation

Before starting, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/dannycahyo/store-master.git
```

2. Navigate to the project directory:

```bash
cd store-master
```

3. Install the dependencies:

```bash
npm install
```

## Usage

Here are some command to run, build, and serve the next.js project:

```bash
# run development server
npm run dev

# build project
npm run build

# run output project
npm run start
```

Here are some command to run, build, and serve the storybook project:

Note\* please run the development server of the next js as well to get the API data.

```bash
# run storybook
npm run storybook

# build storybook
npm run build-storybook

```

## Testing

The application includes a comprehensive interaction and integration test suite to ensure its functionality and stability. To run the tests, use the following command:

Note\* please run the storybook server too.

```bash
# run test
npm run test-storybook

# add --coverage flag to generate coverage report
npm run test-storybook -- --coverage
```

This command launches the test runner and executes all the tests in the project.

## Project Architecture

The project architecture is designed with a layered structure that emphasizes separation of concerns, maintainability, and scalability. It consists of the following key components and their relationships:

![Project Architecture](https://res.cloudinary.com/du5jbmwz5/image/upload/v1689539758/Screenshot_2023-07-17_at_03.35.43_ft2flf.png)

### Routes

The [Routes](https://github.com/dannycahyo/store-master/tree/main/src/pages) layer is responsible for handling URL routing and mapping them to the appropriate screens. It parses query parameters and route parameters, forwarding them as props to the screens. This enables dynamic routing & content rendering based on the URL.

### Screens

The [Screens](https://github.com/dannycahyo/store-master/tree/main/src/carts/screens) layer comprises React components that provide the user interface for individual pages or screens. These components, also known as dummy components, do not handle their own state management or data fetching. Instead, they orchestrate various smart components (Widgets) to create a cohesive and interactive user experience.

### Widgets

The [Widgets](https://github.com/dannycahyo/store-master/tree/main/src/carts/widgets) layer consists of smart components that enhance interactivity and functionality in the user interface. These components have their own state and combine business logic from the [Services](https://github.com/dannycahyo/store-master/blob/main/src/carts/services.ts) layer with UI elements from the [Components](https://github.com/dannycahyo/store-master/tree/main/src/carts/components) layer. They drive the interactive features of the application and facilitate data fetching and manipulation.

### Components

The [Components](https://github.com/dannycahyo/store-master/tree/main/src/carts/components) layer encompasses dummy components focused on providing the user interface for the widgets. These components rely on data received through props from the widgets and do not manage their own state.

### Services

The [Services](https://github.com/dannycahyo/store-master/blob/main/src/carts/services.ts) layer plays a central role in integrating with external APIs. It provides a cohesive interface for fetching data from various endpoints and handling data mutations. In this project, services are implemented as custom hooks that utilize the query hook from the `@tanstack/react-query` library for data fetching. By centralizing the integration in the Services layer, other parts of the application can easily consume fetched data and handle necessary mutations without being concerned about specific API endpoints or implementation details.

### Fetcher

The [Fetcher](https://github.com/dannycahyo/store-master/blob/main/src/carts/fetcher.ts) layer contains utility functions for making API requests. Its sole responsibility is handling network requests. The fetcher functions can be utilized by the Services layer to retrieve data from external APIs.

### Models

The [Models](https://github.com/dannycahyo/store-master/blob/main/src/carts/model.ts) layer defines the structure and shape of the data used within the application. It focuses on establishing clear and consistent data models for entities such as CartDetail, Products or other relevant data structures.

---

This layered architecture promotes separation of concerns, enhances maintainability, and facilitates scalability. Each layer has a well-defined responsibility and can be developed and maintained independently, resulting in a more modular and flexible codebase.

## Folder Structure

The project follows a modular folder structure that promotes scalability and maintainability. Here's an overview of the main directories and their purposes:

```
├── public/                 # Public assets
├── src/                    # Source code
│   ├── carts/              # Cart-related domain
│   ├──────── components/       # Shared components
│   ├──────── screens/          # Screens
│   ├──────── widget/           # Smart components
│   ├── constants/          # Constants or anything for staticData
│   ├── hooks/              # Custom hooks
│   ├── mock/               # API mocking & handler
│   ├── pages/              # Application pages
│   ├── styles/             # Global styles and theme
│   ├── products/           # Product-related domain
│   ├──────── components/       # Shared components
│   ├──────── screens/          # Screens
│   ├──────── widget/           # Smart components
│   ├── ukits/              # Shared components
│   └── utils/              # Utility functions
├── .eslintrc.json          # ESLint configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## API Integration

The application integrates with the [DummyJSON](https://dummyjson.com/) API to retrieve products and cart data. The relevant API endpoints are used to fetch the required data. Moreover, because of the limitation of the dummyjson services for getting products by brand and applying price range, this project extends the API by making brand new API endpoints. Take a look into the api folder [[api]](https://github.com/dannycahyo/store-master/tree/main/src/pages/api/products).

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Chakra UI**: Component library for building accessible and responsive UI
- **TypeScript**: Typed superset of JavaScript
- **Tanstack React Query**: Data fetching and caching library
- **Chart.js**: JavaScript charting library for data visualization
- **MSW**: Mock service worker for API mocking
- **Storybook**: UI component explorer for documenting, building, and testing UI components in isolation.

## Improvement Opportunities

- **Web Accessibility**: The application could be improved by following the Web Content Accessibility Guidelines (WCAG). This could be implemented by handling and recognizing accessibility features such as color contrast, keyboard navigation, focus management, and screen reader support.
- **Performance Optimization**: Further performance improvements could be achieved by implementing code splitting, and web performance metrics like First Contentful Paint, Largest Contentful Paint, Total Blocking Time, and Speed Index could be improved.
- **Internalization**: The application could be improved by adding internationalization support. This involves providing translations for UI text and formatting dates, numbers, and currencies based on the user's locale.
- **Dark Mode**: Consider adding a dark mode to your application. This can make it more comfortable to use in low-light conditions and provide an alternative look and feel for users who prefer it.
- **Error Boundary**: The application is already stateful, which covers three main states (loading, success, error), and it would be better if the application could be improved by adding an error boundary to catch unexpected errors.
- **Not Found Page**: The application could be improved by adding a custom 404 page.
