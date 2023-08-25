# API Documentation

This documentation provides details about the routes and endpoints exposed by the code.

## Table of Contents

- [Booking Routes](#booking-routes)
  - [Create a Booking](#create-a-booking)

---

## Booking Routes

### Create a Booking

**Endpoint:** `POST /bookings`

Creates a new booking.

**Request Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "userId": "string",
  "flightId": "string",
  "seatNumber": "string"
}
```

**Response:**

```json
{
  "bookingId": "string",
  "userId": "string",
  "flightId": "string",
  "seatNumber": "string",
  "createdAt": "string (ISO8601 format)"
}
```

---

Please note that this documentation assumes the use of a RESTful API convention.
The routes and endpoints are based on the provided code snippet.
Make sure to replace placeholders like `:userId` and `:flightId` with actual values when making requests.
Additionally, ensure that you have implemented the required controller functions and middlewares as indicated in the code.
