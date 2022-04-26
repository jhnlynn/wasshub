microservices for digital sales, from one student to another.

Each student has up to 15 mins to check out their stuff. During this time, if the other customers clicks the button "BUY", which stuff is being processed, it'll show "The stuff is being checking out by someone else, please come back later"

run in terminal in root directory: `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=YOUR_JWT`
To run in docker with k8s, run in root directory: `skaffold dev`

## keywords:
docker

authentication (admin users can generate free coupons, based on the JWT provided)

error-handling

mongoose + ts

modify the User model(schema) with interfaces to make it viable to work with ts and mongoose. And also change the keys (, to what we want) back from mongodb with customized 'toJSON'

SSR (server side rendering, for reason of SEO (search engine optimization)?)

response requests and handle errors with normalization: follow the same pattern: since different frameworks, languages can response with different patterns, when without constraints.



## services
1. auth: 
everything relates to user account ops

2. stuff:
stuff creation / editing. Aware of whether a stuff can be updated

3. orders:
order creation / edting

4. expiration:
watches for orders to be created, cancels after 15-mins no-ops.

5. payments:
handles credit card payments. Cancels orders if payments failed, completes if payments succeded.

To start your services locally:
run `skaffold dev`

To generate your image, run `docker build -t YOUR_DOCKER_NAME/YOUR_FILEFOLDER .`
To push your image to your hub, run `docker push YOUR_DOCKER_NAME/YOUR_FILEFOLDER`

## Handling Errors
Different microservices can have different error info. To make life easier, and to make identical to only parse one kind of response, make sure each service should obey the "message rules".

### Error Handling Middleware

#### 1. Both errors:
RequestValidationError: `reasons = [{msg: 'Bad Email', param: 'email'}]`

DatabaseConnectionError: `reason: 'Failed to connect to database'`

#### 2. Is this an instance of RequestValidationError?
If yes: 
    Great, take your 'reasons', send it to the user

If no: 
    Is this an instance of DatabaseConnectionError? 
        if yes:
            take 'reason', send to user
        if no:
            unknown error, send generic error msg

**managed to extract error handling methods from error-handling-middleware, to the specific error classes**

### Use Abstract Class To Handle Errors
each custom error handling class should extend the **Abstract Class**: CustomError, guaranteeing the format of errors back to the client.

## barrier when using TS with Mongoose
### Issue #1
Mongoose will not tell TS about the different properties that are trying to pass in, as TS required

### Issue #2
Mongoose might return some properties that does not match with that of model in TS.

## issues with authentication
#### choice #1: individual services rely on the auth service
pros: Change to auth state are immediately reflected
cons: Auth services go down ==> entire app is broken

#### choice #2: individual services know how to authenticate a user
pros: Auth service does not influence individual services
cons: some user got banned? Errr, I just gave them the keys to my service

###### resolution to choice #2
Only make that JWT viable for, let's say, 15 mins.
1. Give refreshed token when user is valid and user's token is expired;
2. Ask user themselves to refresh the token.

## Code sharing and Reuse Between services using NPM organization
1. npm organization
2. publishing NPM modules
3. Easy publish commands:
`npm version patch && npm run build && npm publish`

## **NATS Streaming Server**
NATS and NATS streaming Server are different 
### Architecture around NATS Streaming
| Service A -> node-nats-streaming | == Events ==> | NATS Streaming with channels, as well with express & axios | 
|NATS Streaming| ==> | node-nats-streaming -> Service B | 

### Strategy of Event Bus Stored Events in Memory
Critical!

## TROUBLESHOOTING:
1. This site can’t be reached
First, reinstall ingress-nginx from https://kubernetes.github.io/ingress-nginx/deploy/
Look at the 'quick start' part.
And then rerun `skaffold dev`

2. Upon getting 'Not Secure' in Chrome
Click on blank space, type 'thisisunsafe'.

3. Refer to mongoose v6, we no longer need to set `useNewUrlParser` and other configs when connecting to MongoDB, refer to: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
