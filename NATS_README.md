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

##### Set Manual Ack Mode
To avoid lost of event that should have been stored to DB. 
Now, NATS Streaming will wait for the event. If not get acknowledgement, it'll take the event and send it to some other member of that queue group. 

### Dig Deeper to NATS Streaming Server: 
#### Client Health Checks
**On Losing Some message for some period of time, but then come back**
**Clients:** Both members of the same queue group. After restarting one of the listeners, we have temperarily 3 running subscriptions. 
But for a brief period of time, NATS streaming server is just going to assume that maybe there is some momentary interrupt in connection or communication with that client.
 However, after waiting for the certain amount of time, it still does not see the client come back, so the subscription will eventually be removed from this list.

 **How to stop this unexpected scene?**
Method 1: We can implement tighter HAPI checks.
But even then we still have to wait for 10 seconds or so for.

Method 2 (more reasonable): Graceful Client Shutdown
`process.on('SIGINT', () => stan.close())`,

`process.on('SIGTERM', () => stan.close())`

So these are watching for interrupt signals or terminate signals, these are signals that are sent to this process.
