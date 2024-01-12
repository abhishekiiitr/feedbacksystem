# feedbacksystem

# Customer Feedback Platform

## Description

This project aims to create a customer feedback platform where users can log in using Google OAuth and provide feedback on various aspects of a product. The feedback will be categorized into Product Features, Product Pricing, and Product Usability. The integration of Frill.co will be utilized to collect and manage feedback data. This assignment evaluates the skills of integrating third-party services, implementing OAuth authentication, and building a microservices architecture.

## Backend Microservice (Node.js)

*User Authentication:*
- Enable users to log in using Google OAuth.

*Feedback Submission:*
- Allow users to submit feedback, including a rating and comments, in specified categories (Product Features, Product Pricing, Product Usability).

*Data Retrieval:*
- Create endpoints to retrieve aggregated feedback data for each category.

*Integration with Frill.co:*
- Integrate Frill.co to store and manage feedback data.
- Ensure that feedback submitted through the platform is reflected on Frill.co.

## Frontend (React)

*Google OAuth Integration:*
- Implement a user interface for users to log in using their Google accounts.

*Feedback Form:*
- Create a form for users to submit feedback, with options to select the category (Product Features, Product Pricing, Product Usability) and provide comments.

*Display Feedback:*
- Show aggregated feedback for each category in a visually appealing and user-friendly manner.

## Integration with Frill.co

Integrate Frill.co into the backend to store and retrieve feedback data. Ensure effective communication between the frontend, backend, and Frill.co.


## to run the frontend 
 - cd frontend
 - cd User
 - npm install
 - npm start

## to run the backend
 - cd backend
 - npm install
 - node app.js
