HeMa Video Presentation
==================
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/CYFTsz88vQc/0.jpg)](https://www.youtube.com/watch?v=CYFTsz88vQc)

HeMa Documentation
==================

Authors

Perju Mircea-Stefan & Hulubei Tudor

Bugs & Feedback

Issues and PRs welcome on our contact form or direct contact on our mail (herbalwebmanager@gmail.com)!

License

[CC-BY](http://creativecommons.org/licenses/by/4.0/)

Abstract
========

Herbal Web Manager (HeMa) is a web application that helps users manage their herbal collections. It offers support for managing collections of graphic representations of plants alongside their attributes. It can be associated with a social media platform, where users can express themselves. We feature a multi-criteria search, a leaderboard, and a statistics export system. A short video presenting the functionalities can be found [here.](https://www.youtube.com/watch?v=CYFTsz88vQc)

1\. Introduction
================

1.1 Purpose
-----------

The purpose of this document is to provide a detailed description of the Herbal Web Manager application. It is intended for users of the site and any developer that wants to know the product. The document should be read as it is.

1.2 Document Conventions
------------------------

The document is written in English and is divided in multiple sub-sections that explain the functionalities of the application.

1.3 Intended Audience and Reading Suggestions
---------------------------------------------

This document is intended for the users of the website, as well as for the teacher that will review the project and other developers that take interest in the website.

The document should be read as it is, being well-divided.

1.4 Product Scope
-----------------

Our goals is to unite the herbal community in a place that feels like home. The website is meant to be seen as a hobby for enthusiasts. The objective is to offer them a way to express their collections, as well as explore others as well as extend their botanical knowledge. The website also represented for us a way to learn the basics of web development and to implement them in a project that we are passionate about.

2\. Overall Description
=======================

2.1 Product Perspective
-----------------------

The website is a standalone application that is meant to be used by herbal enthusiasts. The application serves as a platform that has the goal to promote the sharing of knowledge and passion for plants. For us, the main benefit was exposing ourselves to the concepts of web development and to learn how to implement them without relying on frameworks. This project will stand as a stepping stone for us as programmers and as a way to learn how to work in a team. Even its flaws will be seen as a learning experience for us.

Our goals are to:

*   Offer users a simple to use and yet attractive interface that works well both on desktop and mobile.
*   Be fully functioning on modern Web browsers.
*   Be customizable for inclusion in arbitrary Web sites, while remaining easy to process and interoperable.
*   Fix errors and bugs promptly and keep collaborating as a team.
*   Long-term viability.
*   Offer an easy way of communication with the administrations.
*   Give users the opportunity to express themselves and explore the botanic world of knowledge.

2.2 Product Functions
---------------------

Users benefit of a multi-criteria search feature that allows them to explore the website more efficiently, filtering the plants. On the same page, the users can like to save their favorite plants and revisit them later. The statistics such as views and likes are tracked for each plants, and the user can see them. The user can also see the most liked plants in a leaderboard. The user can also export the statistics as CSV and PDF and JSON, and we also created a RSS feed for the website. The export system offers the possibility to choose between the top metric (either views or likes) and there being an extra option of exporting a PDF containing even more information aobut the plants, such as the percentage share of the species or which one of the plants has the most views and likes.

Users can contact us to express their opinions and feedback on the website and report bugs as well in a form that can be found on the contact page. We've implemented a mailing system that redirects the form inputs to our email. In case the form malfunctions you can contact us directly at herbalwebmanager@gmail.com. The website also has a help page that offers insight on how to use the website.

In order to gain access to all functionalities, users must use the sign up and login functions as logging in provides the users with the aforementioned features. The authentication is done via sessions and cookies. In case the user tries to access paths that don't exist, they will be redirected to a custom Not Found page in order to be informed about the error that occured. Most pages are protected against unauthorized access and the user will be redirected to the login page if they try to access them without being logged in. Even after logging in, the admin page is still protected and the user will be redirected to the home page if they try to access it. In case logged users try to access the signup/login pages again they will be redirected to the home page instead. The user can also log out in order to end the session.

### Structure

The website is built on HTML, CSS and Javascript. We've used NodeJS for the backend implementation and MongoDB for storing the necessary data, connecting the two with Mongoose. We have not used any frameworks in the implementation of the website, as we wanted to learn the basics of web development. The website is structured in a way that the user can easily navigate through the pages and access the functionalities. We have structured the files in a way that is easy to understand and navigate. The website is responsive and works well on all devices.

The file structure is separated on the backend and frontend. The backend consists of the server.js file that starts the server, and the rest are separated in different folders such as the database interraction with models, services and controllers. Besides the database connectivity the files are separated on folders based on routes, scripts, utilities. The frontend consists of the html and css files. We have also used AJAX.

When the user accesses the website, they are greeted by the home page. Until they log in they can access:

*   The home component
*   The signup component
*   The login component
*   The recovery components
*   The not found page in case of missed routings

After logging in the users gain a lot more options being able to navigate through the easy to follow interface in order to reach these features:

*   Home page
*   About page
*   Help page
*   Contact page
*   Multi-criteria Search
*   User Profile
*   Can upload plants and can see which plants they've uploaded
*   Liked Plants
*   Liked Plants
*   Top/leaderboards
*   Statistics
*   Access Unsplash API image search
*   Logout to end the session

Furthermore, if the user that logged in is an admin, they also gain access to the admin page, where they can add, edit and delete users and plant entries in case of inappropriate content or breaking the Terms of Service, as well as in the case that users are in need of help with such actions, such as requests of deletion or impossibility to gain access to their account.

2.3 User Classes and Characteristics
------------------------------------

The website is intended for herbal enthusiasts that want to share their passion with others, as it was mentioned before. The users can be divided in: hobbyists, professionals, students, teachers, biological researchers etc.

The characteristics of these user classes are the will to learn and share knowledge, the passion for plants and the desire to explore the botanical world as well as develop as better people overall, and even as programmers, being able to explore the website and see how it was built.

2.4 Operating Environment
-------------------------

For now the website runs locally, but maybe at some point we will consider hosting. The application runs on all modern web browsers and is platform independent. The website is responsive and works well on all devices.

2.5 Design and Implementation Constraints
-----------------------------------------

Due to the fact that the project expanded way quicker than we expected, the code became bloated at parts which made it harder to maitain. To combat this issue we took the approach of refactoring the code and structuring it as good as we can to differentiate the paths accordingly. While adding the backend we had to expand the already done frontend pages and add new ones which took time and effort and the at least the css code is not as clean as we'd wish it to be. Besides that, we are really happy with how our project turned out and there are very little things that we would change if we were to start over.

2.6 User Documentations
-----------------------

Users can navigate to help page to get relevant insight on how to use the application. If they feel like the information is insufficient they can always reach out to us through our contact form in order to find out the answers they need.

2.7 Assumptions and Dependencies
--------------------------------

We assume that the user has a basic understanding of how to use a website and that they have a modern web browser. The website is dependent on the user's device and internet connection. The website is also dependent on the user's input and the data they provide. The website is also dependent on the user's feedback and suggestions. The experience is dependent on the user's willingness to explore and learn. We also assume that we might have missed some bugs and that the user will report them to us. The dependencies are related to the device and browser the user has, as well as their internet connection.

3\. External Interface Requirements
===================================

3.1 User Interfaces
-------------------

The website shares the same header and footer on each page. The whole idea is to present a green enviroment in order to make the user feel like they are in a garden. For the header "logo" we used the font "The Bold Font". Every element is created with the idea to be easy to use and to be user-friendly, as well as pleasing the eye. The difference between the pages that share the same header is the presence of the redirect buttons that are only found on the main pages of the logged users, otherwise the page has a "Go back" button to redirect to the last visited page.

3.2 Hardware Interfaces
-----------------------

The application runs on various devices, such as desktops, laptops, tablets and mobile phones. The website is responsive.A internet connection is a requirement for the website to run.

3.3 Software Interface
----------------------

In order to run the application, the user needs a modern web browser. The website is platform independent. Even though the platform is independent the experience will be more smooth one some browsers than on others.

3.4 Communication Interface
---------------------------

Through the contact form the user can send an email to the admins of the website. The form is simple and easy to use and fill, as well as useful in terms of providing the administration the information needed to improve the QoL of the users. In order for us to communicate to our users we have implemented a mailing system that is used both for the contact form and for the password recovery system. The mailing system is used to send the user an email with a link to reset their password in case they forget it.

4\. System Features
===================

4.1 Account Management
----------------------

We have implemented a system that allows the user to sign up and log in. The user can also recover their password in case they forget it. The user can also log out in order to end the session. The authentication is done via sessions and cookies. The user can also see their profile and edit their password from that page. The user is redirected to the home page if they try to access the signup/login pages again when being logged in and they are redirected to the login page if they try to access pages that require authentication without being logged in. The admin page is also protected and the user is redirected to the home page if they try to access it. We use the bcrypt library in order to hash our users' passwords and make sure the website is as secure as possible. The accounts can be edited/deleted by the administration on the admin page in case the rules are broken.

4.2 Multi-Criteria Search System
--------------------------------

We have implemented a multi-search criteria system that lets users efficiently filter the plants they are looking for on different criteria such as name (the search will return any plants that contain the substring given in the search bar), species, family, color and location. The search system is easy to use and navigate. The user can also access the Unsplash API image search in order to find images for the plants they upload. The search system is also responsive and works well on all devices. The search system is also protected against unauthorized access and the user will be redirected to the login page if they try to access it without being logged in. In the search page the users may like the plants they find interesting and revisit them later.

4.3 Statistics Export System
----------------------------

We implemented a leaderboard page that shows the most liked plants. Through the top page the user can navigate to the statistics page where they can export the most liked or viewed plants as CSV, PDF and JSON and as well as RSS feed. The user can also export a PDF containing even more information about the plants, such as the percentage share of the species or which one of the plants has the most views and likes. The export system offers the possibility to choose between the top metric (either views or likes). The export system is easy to use and navigate. The export system is also responsive and works well on all devices. The prerequisite to access the statistics files are software application that allow opening and reading such formats.

4.4 Leaderboards
----------------

With our like system we have made a many-to-many table that stores the relationship between the users and the plants, and the most liked plants are shown at the top of the leaderboards. We decided not to limit the number of the plants shown here, but order them based on the criteria. The leaderboards are a good way to explore the most appreciated plants on our website and to see what is the best the community offered up until now.

4.5 Favorite plants
-------------------

The user can like the plants they find interesting and revisit them later. The user can also see the plants they liked in the liked plants page. The user can also unlike the plants they liked. The user can also see the number of likes a plant has. The user can also see the most liked plants in the leaderboards. The user can also see the most liked plants in the statistics page. The user can also export the most liked plants as CSV, PDF and JSON. The user can also export a PDF containing even more information about the plants, such as the percentage share of the species or which one of the plants has the most views and likes. The user can also choose between the top metric (either views or likes) in the export system. The user can also see the most liked plants in the leaderboards. The user can also see the most liked plants in the statistics page.

4.6 User-friendly interface
---------------------------

The website has a user-friendly interface that is easy to use and navigate. The user will have a pleasant experience while using the website. The website is also responsive and works well on all devices.

4.7 Administration page
-----------------------

We implemented a page for the admins to manage the data that does not comply with our vision and rules or in cases that the users need help with their accounts. The admin can add, edit and delete users and plant entries. The admin page is protected against unauthorized access and the user will be redirected to the home page if they try to access it without being logged in. The admin page is also responsive and works well on

4.8 Cloud NoSQL MongoDB Integration
-----------------------------------

Using Mongoose we have connected our NodeJS backend to a MongoDB database. The database is hosted on the cloud and can be accessed from anywhere. The database is secure and the user's data is protected. The database is also protected against unauthorized access. The database is also protected against common security threats such as SQL injection and the inputs are sanitized.

4.9 Mailing System
------------------

We've used nodemailer in order to connect with our mailing system. The mailing system is used to send the user an email with a link to reset their password in case they forget it. The mailing system is also used for the contact form. The mailing system is secure and the user's data is protected. The email service that we are using is gmail.

4.10 Public API connectivity
----------------------------

We have implemented a public API that allows the user to access the Unsplash API image search in order to find images for the plants they upload. The API is easy to use and navigate. The API is also responsive and works well on all devices. Upon clicking the images the user is redirected to the Unsplash website on the respective post.

4.11 AJAX
---------

We've used AJAX in order to make the website more responsive and to make the user experience better. We used it both to display the status of the operation on the forms such as "Sending..." changing into the result of the operation, as well as inserting elements into the DOM without refreshing the page. We also used it to make the search system more efficient and to make the website more interactive. Another prime example is the signup form where we constantly check if the password meets the criteria before letting the user submit the form.

4.12 Using libraries with open libraries
----------------------------------------

We made sure that the libraries we used in order to perform tasks are open source and free to use. We used the bcrypt library in order to hash our users' passwords and make sure the website is as secure as possible. We used the nodemailer library in order to connect with our mailing system. We used the mongoose library in order to connect our NodeJS backend to a MongoDB database. We used libraries to export the files in different formats such as CSV, PDF and JSON. We used the Unsplash API in order to access the image search. We used the RSS feed library in order to export the statistics as RSS feed.

4.13 REST API
-------------

We followed the REST API principles in order to make the website more efficient and to make the user experience better. We added endpoints for the user to access the functionalities of the website. We also added endpoints for the admin. The website treats GET, POST, PUT and DELETE requests. The separation between the models, controllers and services is done in order to make the code more readable and maintainable.

4.14 MVC
--------

Our application is structured in a way that follows the MVC pattern. The models are used to interact with the database, the controllers are used to handle the requests and the services are used to handle the business logic. The separation between the models, controllers and services is done in order to make the code more readable and maintainable.

4.15 HTML and CSS validation
----------------------------

We made sure that the HTML and CSS code is valid and that the website is accessible. We used the W3C validator in order to validate the HTML and CSS code. We also made sure that the website is responsive and works well on all devices. We also made sure that the website is secure and the user's data is protected.

4.16 OOP
--------

For our project we used the principles of Object Oriented Programming in order to make the code more readable and maintainable. We used classes and objects for the controllers and services in order to make the code more organized. We also used classes and objects for the models in order to interact with the database.

5\. Other Nonfunctional Requirements
====================================

5.1 Performance Requirements
----------------------------

There shouldn't be any performance issues with the website. The website should load fast and be responsive regardless of the device used.

5.2 Safety Requirements
-----------------------

The platform is safe to use and the user's data is protected. The website is secure and the user's data is not at risk. The user's data is stored securely and is not shared with third parties.

5.3 Security Requirements
-------------------------

The passwords are hashed and the website is protected against common security threats such as SQL injection and the inputs are sanitized. We would like to implement a CAPTCHA system in the future to protect the website against bots. Another safety measure we would like to implement is a two-factor authentication system and the HTTPS protocol. The website is also protected against unauthorized access. The passwords must meet the criteria of having the length of at least 8 characters, at least one lowercase letter, one uppercase letter, one digit and one special character in order to be accepted. We use regex in order to validate the input and if it is aligned with the requirements we hash it before entering the password in the database.

5.4 Software Quality Attributes
-------------------------------

The website offers a user-friendly interface that makes it easy to navigate and use. The website is responsive and works well on all devices. The website is also secure and the user's data is protected. The website is also protected against unauthorized access. The website is also protected against common security threats such as SQL injection and the inputs are sanitized. Another quality attribute is the community that can be formed through the interaction on the website. The cloud database is also a good attribute to have especially considering the website is not hosted yet and worked locally and had the option to be accessed from anywhere.

6\. Other mentions
==================

The website is a project that we are passionate about and we hope that it will be useful to the users. We are open to feedback and suggestions and we are looking forward to hearing from the users. We hope that the website will be a place where the users can share their passion for plants and learn from each other. It was a great learning experience from us and we are happy with how the project turned out. We hope that the users will enjoy using the website as much as we enjoyed building it.
