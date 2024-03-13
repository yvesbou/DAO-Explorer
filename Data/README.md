# Data queried in step 1

Next task
[ ] decide which table as basis

In a first step I only do a snapshot, not a timeseries yet.

for the first iteration I want the following properties of DAOs
## dao fundamentals
- Name ✅
- DAO address ✅
- chain (implicit, column just needs to be added) ✅
- DAO Hub name that deployed it (implicit, column just needs to be added) ✅
- DAO Hub (factory) address that deployed it ✅
- tx_hash of deployment ✅
- time of deployment ✅
- date latest status (implicit, column just needs to be added)
## governance
- number of proposals query
- number of votes query
- number of unique voters query
- array of all voter addresses query
## finance
- Treasury TVL query (current) ✅
## setup
- label governor contract (moloch v1, moloch v2, compound alpha, compound bravo, open zeppelin) (implicit, column just needs to be added)
- type of token gate (whitelist, ERC20, ERC721, ERC1155?) query
- plugins

future ideas of properties
- distribution of tokens (label which is the majority), own token vs native vs stable coins
- dead / alive