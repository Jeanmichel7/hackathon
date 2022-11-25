# Faithful Review System
## How to setup your project
- Clone the git repository
- Launch live-server (npm install live-server or vscode extension)
- Smart contract is auto imported and deployed from bytecode in the frontend (time reason)
- Using the Jean Michel Starton API Key on his public Github 😉
- Enjoy clicking on the button to interact with the BNB Testnet SmartContract
## Problem
Faithful solve the fake review and review bombing problem.
## Solution
This issue was resolved by setting the review on a decentralized network, only editable by code.
A user who want to review a product must have a password to prove he bought it.
We choose the BNB Chain because the network fee is lower than Ethereum and we publish the review file on the IPFS network so anyone can view it an check his integrity, with the CID stored on the blockchain.
Our biggest technical challenge was to setup a unique review proof.
## Team and comments
**Team name : Gjr**
We learn some things like :
- More blockchain concepts
- Solidity language
- Front End language
- Team workflow
## Project submission
# What is Faithful
Fathful is a blockchain powered review system.
Faithful use is own token, the FFUL.
FFUL is used to reward the reviewer and is needed by anyone who want to publish a new product.
## How it works
**WARNING Value mentionned here can change !**
- Company who want to add a product need to have **1,000,000 FFUL**, the Token is added to the product pool on the blockchain. 
- The blockchain product contain a CID on ipfs who contains some hashs of prepared passwords.
- The user buy the product, a password is generated and added to the password list and sended buy the company to the buyer.
- The user post the review with the password (Password is hashed and checked from the IPFS Hash file and, if the password hash match one of the list hashes, it removes it from the IPFS Hash file, then the CID on the blockchain is updated).
- The review is added to the IPFS review file, and the CID is changed on the blockchain too.
- The user get rewarded of **0.01% from the FFUL token product pool**.
- The more earlier you review a product the more you get rewarded, it is an incentive to give your opinion.
- The user can sell his token to a company, on a dex like Pancakeswap.
![FFUL Token Flow Diagram](https://zupimages.net/up/22/47/e1pf.png)
## Business model
### FFUL token repartition
- 1 Billion total supply
- 100 Million token for the team
- 300 Million for give to the ground breaking company (equal to 300 products)
- 600 Million to airdrop to the first users
## Actual problem
- Need a wallet connect button to buy and add a new product on the smart contract and some other utility fonctions on the frontend.
- If a user send a review, the file on IPFS is changed. If a second user send a new review quickly (assuming the first transaction not yet validate), he got the old CID from the blockchain and send the transaction which flush the previous review.
## Starton can upgrade
- An API call to unpin a file by the CID or get the ID with the CID.
- We think there is a bug is in the API. API return 0 when you want to make a function who return a Struct (It works on Remix, maybe with Ethers.js) but the API works if we use the automatic read function when public state is set.
- A function to withdraw token (BNB, ETH etc) to another wallet on the website.
- A function to erase all pinned IPFS files in the website.
