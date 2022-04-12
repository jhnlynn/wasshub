microservices for tickets sales, from one people to another.

Each customer has up to 15 mins to check out their ticket. During this time, if the other customers clicks the button "BUY", which ticket is being processed, it'll show "The ticket is being checking out by someone else, please come back later"

## services
1. auth: 
everything relates to user account ops

2. tickets:
tickets creation / editing. Aware of whether a ticket can be updated

3. orders:
order creation / edting

4. expiration:
watches for orders to be created, cancels after 15-mins no-ops.

5. payments:
handles credit card payments. Cancels orders if payments failed, completes if payments succeded.

To start your services locally:
run `skaffold dev`

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

## TROUBLESHOOTING:
1. This site can’t be reached
First, reinstall ingress-nginx from https://kubernetes.github.io/ingress-nginx/deploy/
Look at the 'quick start' part.
And then rerun `skaffold dev`

2. Upon getting 'Not Secure' in Chrome
Click on blank space, type 'thisisunsafe'.
