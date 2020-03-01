### Ubi Feedback

This is an assignment project subject to the requirement given by Ubisoft as specified in this doc[link].

## 1.Requirement Analysis:
The requirement delineates to create a backend micro-service in submitting and querying player's feedback with two major API :
1. for user to post a new feedback for a session.
2. for system admin to get the last 15 feedbacks left by players and allow filtering by rating.

## 2.Tech Stack Selection and Rationale:
I have selected Ruby on Rails as a quick prototyping backend framework and sqlite3 to be the database, for future improvement, I will specify in later chapter.
The reason for choosing Rails is to harvest its advantages of** fast development **and **good readability** for small projects, however Rails do exhibit every harsh shortcomings when the project magnitude is considerable. As for the case of micro service, it would be a good option as both characteristics of fast prototyping and maintainability would be guaranteed. SQLite3 is for its simplicity in integration into Rails and its similarity to mainstream databases, in here basically I choose it because of simplicity in dockerisation, however it would be simple to change it to postgres/mysql by adding a server endpoint to the database and using docker-compose or swarm to dockerize them.

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
2. 



