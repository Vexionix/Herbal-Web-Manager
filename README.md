HeMa Documentation
==================

Authors

Perju Mircea-Stefan & Hulubei Tudor

Bugs & Feedback

[Issues and PRs welcome!](contact.html)

License

[CC-BY](http://creativecommons.org/licenses/by/4.0/)

Abstract
========

Herbal Web Manager (HeMa) is a web application that helps users manage their herbal collections. It offers support for managing collections of graphic representations of plants alongside their attributes. For more informations navigate to [about](about.html).

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

Our goals is to unite the herbal community in a place that feels like home. The website is meant to be seen as a hobby for enthusiasts. The objective is to offer them a way to express their collections, as well as explore others as well as extend their botanical knowledge.

2\. Overall Description
=======================

2.1 Product Perspective
-----------------------

The website is still in a very incipient state, but our view about it is that it will be place where herbal enthusiasts can come to and share their passion about plants. The variety and collections will unite users and will separate our application from the rest.

Our goals are to:

*   Offer users a simple to use and yet attractive interface that works well both on desktop and mobile.
*   Be fully funcitioning on modern Web browsers.
*   Be customizable for inclusion in arbitrary Web sites, while remaining easy to process and interoperable.
*   Fix errors and bugs promptly and keep collaborating as a team.
*   Long-term viability.

2.2 Product Functions
---------------------

Users benefit of a multi-criteria search feature that allows them to explore the website more efficiently.

There will also be a leaderboard displaying the most collected plants.

There will be an option for users to export data as CSV and PDF.

Users can contact us to express their opinions and feedback on the website and report bugs as well in a form that can be found on the [contact](contact.html) page.

In order to gain access to all functionalities, users must use the sign up and login functions as logging in provides the users with the aforementioned features.

### Structure

The website is built (for now) only on HTML and CSS. We are still in talks about deciding what we will use forward in order to fulfill our goals. We might use JavaScript for the front-end and Python/PHP (we are not sure about this yet) for the back-end.

The application consists of:

*   Home Component
*   About Component
*   Help Component
*   Contact Component
*   Sign up Component
*   Login Component

2.3 User Classes and Characteristics
------------------------------------

The website is intended for herbal enthusiasts that want to share their passion with others, as it was mentioned before. The users can be divided in: hobbyists, professionals, students, teachers, biological researchers etc.

2.4 Operating Environment
-------------------------

For now the website runs locally, but maybe at some point we will consider hosting. The application runs on various browsers and devices.

2.5 Design and Implementation Constraints
-----------------------------------------

Due to the fact that we are still learning the concepts of web development, we struggled to implement some features that we wanted properly, and as such we had to make some compromises. We tried to cover responsiveness as much as possible as well. Due to timing constraints, there are some features that we can't implement, such as restructuring the html and css files in order to follow BEM methodology. We also couldn't tackle the use of SCSS. We are aware of an issue with the [Home](index.html) page not properly adjusting to the screen size and are still actively working on a fix (will update in case there was one done), but the rest of the pages are responsive on all devices. Only problems that can appear are on really low width resolutions (below 200px), but realistically no device uses that, the lowest we could find was the Fold phone at ~200px.

2.6 User Documentations
-----------------------

Users can navigate to [Help](help.html) page to get relevant insight on how to use the application.

2.7 Assumptions and Dependencies
--------------------------------

We assume that even though the site is structured this way now, with the implementation of the future functionalities, the structure is going to change, design included. We plan to add user-related features, such as tracking as who you are logged in as, and what you have done on the site, but that's for the future.

3\. External Interface Requirements
===================================

3.1 User Interfaces
-------------------

The website shares the same header and footer on each page. The whole idea is to present a green enviroment in order to make the user feel like they are in a garden. For the header "logo" we used the font "The Bold Font". Every element is created with the idea to be easy to use and to be user-friendly, as well as pleasing the eye.

3.2 Hardware Interfaces
-----------------------

The application runs on various devices, such as desktops, laptops, tablets and mobile phones.

3.3 Software Interface
----------------------

In order to run the application, the user needs a modern web browser. The website is platform independent.

3.4 Communication Interface
---------------------------

Through the contact form the user can send an email to the admins of the website. The form is simple and easy to use and fill, as well as useful in terms of providing the administration the information needed to improve the QoL of the users.

4\. System Features
===================

4.1 Account Management
----------------------

We will implement an account management system and the user will be treated differently whether they are logged in or not. The user will have the ability to sign up and login, as well as to sign out.

4.2 Multi-Criteria Search System
--------------------------------

There will be a multi-criteria search system that will allow the user to search for plants based on multiple criteria. The user will be able to search for different type of plants such as medicinal ones, mountain flowers etc. The search system will generate, recommend and share thematic albums that contain the plants.

4.3 Statistics Export System
----------------------------

We will make it so certain statistics can be exported as CSV and PDF. The user will be able to export the statistics of the plants in their collection.

4.4 Leaderboards
----------------

The most collected plants will be displayed in a leaderboard.

4.5 Favorite plants
-------------------

There will be a system that will allow the user to have and revisit favorite plants.

4.6 User-friendly interface
---------------------------

The website has a user-friendly interface that is easy to use and navigate. The user will have a pleasant experience while using the website. The website is also responsive and works well on all devices.

5\. Other Nonfunctional Requirements
====================================

5.1 Performance Requirements
----------------------------

There shouldn't be any performance issues with the website. The website should load fast and be responsive regardless of the device used.

5.2 Safety Requirements
-----------------------

The platform is safe to use and the user's data is protected. The website is secure and the user's data is not at risk. The user's data is stored securely and is not shared with third parties. The website is also GDPR compliant.

5.3 Security Requirements
-------------------------

The website will be secure and the user's data is protected. The website will use HTTPS to encrypt the data sent between the user's device and the server. The website will also be protected against common security threats such as SQL injection and cross-site scripting. This are our plans, we'll see how much we can implement regarding security.

5.4 Software Quality Attributes
-------------------------------

The website will be easy to use and navigate. The website will be responsive and work well on all devices. The website will also be fast and load quickly. The website will also be secure and the user's data will be protected. Another quality is the efficiency the user will be granted via the multi-criteria search system.

6\. Other mentions
==================

As previously stated multiple times in this document, the website is not yet finished and a lot of features are still in development. We are still learning and we are trying to implement as many features as possible. We are also open to feedback and suggestions, so if you have any, please let us know.
