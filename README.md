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
- `/api/factory/`
  - POST `/api/factory/` - Returns encoded data of `createContract` method of the deployed Factory contract. The request body looks like this 
    `{ name: "test", symbol: "symbol", base_uri:"test.com" }`.
  - GET `/api/factory` - Returns the contracts deployed by user.
- `/api/contract/`
  - POST `/api/contract/mint` - Returns encoded data of mint method of the NFT contract. The request body looks like this: `{ to: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" }`
  - POST `/api/contract/transfer-from` - Returns encoded data of transferFrom method of the NFT contract. The request body looks like this: `{ "address_from": "0xc315240Ac71b351BB1f2E2E60017D3aC8F02D304", "address_to": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "token_id": "0" }`.
  - GET `/api/contract/:contractAddress/token/:tokenId` - Returns info about token with id `tokenId` on contract with address `contractAddress`.

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