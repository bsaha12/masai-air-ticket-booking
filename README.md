# This is the Ticket booking system here We can book all our flights
## A Robust Backend System containing necessary API Endpoints for Frontend
## Routes
###  POST      /api/register
#### Body : 
{
  "name" : String ,
  "email" : String ,
  "password" : String
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
  "email" : String ,
  "password" : String
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
