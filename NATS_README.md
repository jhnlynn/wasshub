## **NATS Streaming Server**
NATS and NATS streaming Server are different 
### Architecture around NATS Streaming
| Service A -> node-nats-streaming | == Events ==> | NATS Streaming with channels, as well with express & axios | 
|NATS Streaming| ==> | node-nats-streaming -> Service B | 

### Strategy of Event Bus Stored Events in Memory
Critical!
Store emitted events in memory.So we could handle temporary downtime of any given service if some service went offline.

For some a very brief period of time, it could then come back online and ask for a list of all the different events that had ever been emitted.

So this idea of storing memory or simply storing events somehow was really critical for handling outages or handling any new service we pulled up as well.

### Get Back to NATS Streaming
By default, we can also customize NATS Streaming to store the events inside of flat files stored on a hard drive or even inside of a database like MySQL or Postgres.

### Set Manual Ack Mode
To avoid lost of event that should have been stored to DB. 
Now, NATS Streaming will wait for the event. If not get acknowledgement, it'll take the event and send it to some other member of that queue group. 
