# Run the project

 - To run the project, first a database is needed. One can use `docker-compose up` command to create a docker container with a MySQL database.
   Update the `config.js` file with proper configs. (have a look at `docker-compose.yml`, if db credentials or db name is needed)
 - If `/migration` folder is empty generate migrations. (See below for how to generate migrations)
 - Start the server via `npm start`. (The migrations are run automatically on startup, so, if everything is correct, db tables should be generated on the first run)

# API Endpoint for Factory and NFT Smart Contracts

The post endpoints generate encoded transaction data. This data should be put into
transaction params and the transaction should be sent from frontend. The `public/index.html`
file provides a simple frontend which may utilize this backend. 

The requests, for which authentication is necessary should have `auth-token` header with the request.

The endpoints are structures like this:
- `/api/wallet/`
  - POST `/api/wallet/` - Generates a wallet public/private keys, stores them in db, returns them.
  - GET `/api/wallet/` - Returns wallets of the user by the token provided.
- `/api/token/`
  - GET `/api/token/` - Generates and saves a new random token and returns it.
- `/api/nft/factory/`
  - POST `/api/nft/factory/` - Returns encoded data of `createContract` method of the deployed Factory contract. The request body looks like this 
    `{ name: "test", symbol: "symbol" }`.
  - GET `/api/nft/factory` - Returns the contracts deployed by user.
- `/api/nft/contract/`
  - POST `/api/nft/contract/mint` - Returns encoded data of mint method of the NFT contract. The request body looks like this: 
  ```
  {
    "tokenId": 1,
    "to": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304",
    "uri": "test.com",
    "nftAddress": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304",
    "data": "testData"
    }
  ```
  - POST `/api/nft/contract/transfer-from` - Returns encoded data of transferFrom method of the NFT contract. The request body looks like this: `{ "addressFrom": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304", "addressTo": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "tokenId": "0" }`.
  - GET `/api/nft/contract/:contractAddress/token/:tokenId` - Returns info about token with id `tokenId` on contract with address `contractAddress`.


# API Endpoint for ERC20Factory and ERC20Token Smart Contracts

The post endpoints generate encoded transaction data. This data should be put into
transaction params and the transaction should be sent from frontend. The `public/erc20.html`
file provides a simple frontend which may utilize this backend.

The requests, for which authentication is necessary should have `auth-token` header with the request.

The endpoints are structures like this:
- `/api/erc20/factory/`
    - POST `/api/nft/factory/` - Returns encoded data of `createContract` method of the deployed Factory contract. The request body looks like this
      `{ name: "test", symbol: "symbol", "decimals": 18, "max_supply": 100000000" }`.
    - GET `/api/nft/factory` - Returns the contracts deployed by user.
- `/api/erc20/contract/`
    - POST `/api/erc20/contract/mint` - Returns encoded data of mint method of the NFT contract. The request body looks like this:
  ```
  {
    "to": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304",
    "amount": 1000,
    "contract_address": "0x17e9584AD0e93e6ca7c109a6F84D914C85b92b3C"
  }
  ```
    - POST `/api/erc20/contract/transfer-from` - Returns encoded data of transferFrom method of the NFT contract. The request body looks like this (the sender should have sufficient allowance of addressFrom, even if the sender is the same as addressFrom, call approve for it):
    ```
    { 
      "addressFrom": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304", 
      "addressTo": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
      "amount": 10000,
      "contract_address": "0x17e9584AD0e93e6ca7c109a6F84D914C85b92b3C"
    }
    ``` 
    - POST `/api/erc20/contract/transfer` - Returns encoded data of transfer method of the NFT contract. The request body looks like this:
      ```
      { 
        "addressTo": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
        "amount": 10000,
        "contract_address": "0x17e9584AD0e93e6ca7c109a6F84D914C85b92b3C"
      }
      ```
    - POST `/api/erc20/contract/approve` - Returns encoded data of approve method of the NFT contract. The request body looks like this:
      ```
      {
      "amount": "0.1",
      "spender": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304",
      "contract_address": "0xC3b0A8BdaD927BeD3AC2ee6f40346dF11D85284b"
      }
      ``` 
    
      - GET `/api/erc20/:contractAddress` - Returns info about the smart contract.


## Migrations:
  There are 2 steps for migrations:
  - Generating migrations
    - To generate a migration run following command `npm run migrations:generate -- {name}`, where `{name}` is the migration name.
        This command will generate a migration file in /migration folder.

  - Running migrations
    - Migrations are run automatically on project startup, so nothing needs to be done here.

  
# The sample frontend to test backend

The tests are done on Goerli Testnet, you should have account with non-zero balance there.

To test this backend:
- Visit root page (for example `http://localhost:3000/`). 
- Connect metamask with button. (Metamask will ask to change network to Goerli Testnet)
- To deploy an NFT contract paste factory address, send a request to the corresponding endpoint (f.e. via Postman), paste the encoded string in input field and click deploy. Metamask will pop up and will ask you to confirm your transaction.
- To mint a token, send a request to the corresponding endpoint, paste encoded data, paste contract address. (You can use `Log contracts` button to see deployed contracts in console, or just call backend).
- To transfer a token, send a request to the corresponding endpoint, paste encoded data, paste contract address.