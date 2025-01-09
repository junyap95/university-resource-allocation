![Deploy Status](https://github.com/junyap95/university-resource-allocation/actions/workflows/deployment.yml/badge.svg)
![Unit Tests](https://github.com/junyap95/university-resource-allocation/actions/workflows/unit-tests.yml/badge.svg)
![UI Tests](https://github.com/junyap95/university-resource-allocation/actions/workflows/playwright.yml/badge.svg)

# BOOKBBK University Space Allocation System

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Project Overview

BOOKBBK is a web application designed to facilitate the allocation of university spaces for various events and activities. It allows users to book venues for events, view available venues, and manage their bookings. The system also includes features for re-scheduling bookings and managing resource allocation for university staff.

## Client User Interface

### Make A Booking

A client can create a booking request specifying their requirements, such as capacity, date, and time. Once the request form is submitted, it will be validated and then recorded in the database. A client ID will be generated for new clients upon successful booking submission.

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/home-screen-booking-submission.png?updatedAt=1736432242530" width="800"/>

### Check Booking Status

Clients can check their booking status using their email address and client ID obtained upon a successful booking submission. They can view all their reservations, and choose to accept the assigned bookings if they are satisfied with it.

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/check-bookings-cards.png?updatedAt=1736432242283" width="800"/>

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/individual-bookings-cal.png?updatedAt=1736432238098" width="800"/>

### Reschedule Bookings

Clients can submit an inquiry to re-schedule the failed bookings using an interactive calendar. They can only place the bookings that on time slots that are not occupied by all other already allocated events.

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/re-schedule-main.png?updatedAt=1736432244940" width="600"/>

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/re-schedule-drag.png?updatedAt=1736432238164" width="600"/>

## Resource Manager/Admin User Interface

### Viewing and Allocating Bookings

A resource manager has the authority to run an automated allocation process using various algorithms. After the automated allocation is complete, they can review the results and select the best allocation based on their judgment.

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/allocation-result-random.png?updatedAt=1736432246505" width="600"/>

### Viewing Allocated Bookings

A resource manager can view allocated requests displayed as calendar events for each hall.

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/hall-calendar-view.png?updatedAt=1736432232712" width="600"/>

## System Architecture

BOOKBBK is a web-based application designed to enable booking and management of lecture halls. Different online server providers such as Netlify, Render and AWS EC2 are used in this project to host the application.

<img src="https://ik.imagekit.io/jbyap95/MSc%20Project%20Report%20Draft/Image/updated-system-arch.png?updatedAt=1736432240878" width="600"/>

## Conclusion

To see more details about the project, such as the algorithms used and how they were implemented, please read the [Project Report](./Main_Thesis_File.pdf).
