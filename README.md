# Ubi Feedback

This is an assignment project subject to the requirement given by Ubisoft as specified in this doc[link].

## 1.Requirement Analysis:
The requirement delineates to create a backend micro-service in submitting and querying player's feedback with two major API :
1. for user to post a new feedback for a session.
2. for system admin to get the last 15 feedbacks left by players and allow filtering by rating.

## 2.Tech Stack Selection and Rationale:
I have selected Ruby on Rails as a quick prototyping backend framework and sqlite3 to be the database, for future improvement, I will specify in later chapter.
The reason for choosing Rails is to harvest its advantages of **fast development** and **good readability** for small projects, however Rails do exhibit every harsh shortcomings when the project magnitude is considerable. As for the case of micro service, it would be a good option as both characteristics of fast prototyping and maintainability would be guaranteed. SQLite3 is for its simplicity in integration into Rails and its similarity to mainstream databases, in here basically I choose it because of simplicity in dockerisation, however it would be simple to change it to postgres/mysql by adding a server endpoint to the database and using docker-compose or swarm to dockerize them.

## 3.Micro Service Design:
The first step of micro service architecture is by defining the function or business domain of the service, otherwise it would be very likely to be another monolithic service if developers keep dumping unrelated code to it. According to the requirement, I would prefer to define it as a pure feedback service where only the ratings and comments will reside here, the linkage between this service and the other service will be maintained through foreign data wrapper in database level. Therefore the feedback database would have schema like:

| Field        | Type           | Constraint  |
| ------------- |:-------------:| -----:|
| id     | long | pk,unique,auto_increment |
| user_id     | long | fk |
| session_id      | long      |   unique, scope [:user_id] |
| rating | int[range(1..5)]      |   index |
| comment | varchar(5..500)      |   nullable |
#### Things to note here:
1. In order to make the foreign key work, I have to create another table to hold user information, where normally user information should persist in another microservice. I have tabulated the schema for user:
| Field        | Type           | Constraint  |
| ------------- |:-------------:| -----:|
| id     | long | pk,unique,auto_increment |
| name     | varchar | fk |
| age      | int[range(1..150)]  |  .|
2. Session ID is normally generated with authentication service which is another micro service, it would contain some information about user login information or a hashed content linked to those info, however, since it would require another micro service, for this demo, I would assume it is a long type with 8 digits, which resembles to a 16 HEX hashed key.
3. User ID in here is long and auto increment for simplicity, in real life, ID would be better to be of type UUID or hashed value, because hackers can guess from ID value of type long.
4. Session ID is unique scoped to User ID due to the requirement that for a single user can only submit one comment per session.
5. Comment is assumed to be constrained to nullable because players can be too lasy to type in words thus it allows them only rank them without typing too much.
6. There is a one-to-many association between user and feedback which means there is a dependent destroy of feedback, in another word, once a user is deleted, all the feedback given by him/her will be destroyed as well.
7. 

## 4.API Design:
According to the requirement, two fundemental APIs are as follows:
1. For player to post a new feedback for a session:
POST /session/`{session_id: long}`/feedbacks 
header:`{"Ubi-UserId":long,}`
body: ```
{
	"rating":int,
	"comment":text
}
```
2. For system admin to get the last 15 feedbacks left by players and allow filtering by rating
GET /feedbacks?limit={:limit}&&rankings[]={:rankings}

#### Things to note here:
1. The access control of certain API to certain user group aka role segregation is handled by auth process which is done by interaction between auth server and resource server, feedback service is considered itself a resource server therefore every call to it will be firstly redirected to the auth server for authentication and authorization, once verified, the token will be passed to the client and with this token, the resource service, feedback service in here, could proceed with returning the result. In this demo, I would assume every call to the corresponding endpoint is automatically authenticated and authorized, but in real life, we have to make the link or cookie containing the token to proceed.
2. Session ID and User ID are normally hashed in certain way before it is passed to the server, however in here as required, I just put it as is in the path and header.




