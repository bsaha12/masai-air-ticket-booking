# This is the Ticket booking system here We can book all our flights
## A Robust Backend System containing necessary API Endpoints for Frontend
##### Note: All routes with sample dataset is present in following routes.
## Routes
###  POST      /api/register
#### Body : 
{
  "name" : "Peter Parker" ,
  "email" : "peter@gmail.com" ,
  "password" : "peterabc"
}
#### Response :
code :- 201
{
  "msg": "New User is successfully registered"
}

code :- 400
{
  "msg": "User ALready Exists , Please Login!!"
}

code :- 500
{
  "Error": Error
}
###  POST      /api/login
#### Body : 
{
  "email" : "peter" ,
  "password" : "peter@gmail.com"
}
#### Response :
code :- 201
{
  "msg": "Login Successfull",
  "token": String
}

code :- 400
{
  "msg": "Register First"
}

code :- 400
{
  "msg": "Invalid Password"
}

code :- 500
{
  "Error": Error
}
###  GET      /api/flights
#### Response :
code :- 200
{
  "flights": [
    {
      "_id": "65eee150cb4d6cdb33e01a72",
      "airline": "Emirates",
      "flightNo": "123",
      "departure": "Kolkata",
      "arrival": "Mumbai",
      "departureTime": "2024-01-01T18:30:00.000Z",
      "arrivalTime": "2024-01-01T18:30:00.000Z",
      "seats": 34,
      "price": 6789
    }
    
  ]
}

code :- 500
{
  "Error": Error
}
###  GET      /api/flights/:id
#### Response :
code :- 200
{
  "flight": {
    "_id": "65eee150cb4d6cdb33e01a72",
    "airline": "Emirates",
    "flightNo": "123",
    "departure": "Kolkata",
    "arrival": "Mumbai",
    "departureTime": "2024-01-01T18:30:00.000Z",
    "arrivalTime": "2024-01-01T18:30:00.000Z",
    "seats": 34,
    "price": 6789
  }
}

code :- 500
{
  "Error": Error
}

## Following are the protected routes. Users first need to be authorized to access  these routes. First Login.

###  POST /api/flights
## body :
{
  "airline": "American Emirates",
  "flightNo": 123,
  "departure": "Kolkata",
  "arrival": "Mumbai",
  "departureTime": "01/02/2024",
  "arrivalTime": "01/02/2024",
  "seats": 34,
  "price": 6789
}

## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 201
{
  "msg": "New Flight is Saved"
}

code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}

###  PATCH /api/flights/:id
## body :
{
  "airline": "New American Emirates",
  "flightNo": 123,
  "departure": "Kolkata"
}

## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 204
{
  "msg": "Flight Details Updated"
}

code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}


###  DELETE /api/flights/:id

## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 202
{
  "msg": "Flight Details Deleted",
  "flight": {
    "_id": "65eee150cb4d6cdb33e01a72",
    "airline": "Ameraican Emirates",
    "flightNo": "123",
    "departure": "Kolkata",
    "arrival": "Mumbai",
    "departureTime": "2024-01-01T18:30:00.000Z",
    "arrivalTime": "2024-01-01T18:30:00.000Z",
    "seats": 34,
    "price": 6789
  }
}

code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}


###  POST /api/booking
## body :
{
  "flightID" : "65eee150cb4d6*********0" 
}
## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 201
{
  "msg": "Booking Completed"
}

code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}


###  GET /api/dashboard
## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 200
{
  "user": {
    "_id": "65eed389bbb9678145e73a81",
    "name": "peter",
    "email": "peter@gmail.com"
  },
  
  "flights": [
    {
      "_id": "65eefc31c420eb278e529ce3",
      "user": "65eed389bbb9678145e73a81",
      "flight": "65eee150cb4d6cdb33e01a1234560000000000000"
    }
  ]
}

code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}

###  PATCH /api/dashboard/:id
## body :
{
  "flightID" : "6***********************123" 
}

## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 204
{
 "msg": "Booking Details Updated" 
}

code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}


###  DELETE /api/dashboard/:id
## headers:
{
"Authorization" : Bearer eyJhbGciO************************CF2TM
}
#### Response :
code :- 202
{
  "msg": "Booking Details Deleted"
}
code :- 400
{
  "msg": "You are not authorized"
}

code :- 500
{
  "Error": Error
}



