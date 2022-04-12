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

## React App to Handle Errors
Different microservices can have different error info. To make life easier, and to make identical to only parse one kind of response, make sure each service should obey the "message rules".

## TROUBLESHOOTING:
1. This site can’t be reached
First, reinstall ingress-nginx from https://kubernetes.github.io/ingress-nginx/deploy/
Look at the 'quick start' part.
And then rerun `skaffold dev`

2. Upon getting 'Not Secure' in Chrome
Click on blank space, type 'thisisunsafe'.
