# ChainLink powered: InsureShield

Welcome to a **Decentralized inflation-protected insurance platform.** This platform would use Truflation powered by chainlLink data to calculate inflation-adjusted insurance premiums, and Verse tokens to pay premiums and claims. This would allow users to purchase insurance without having to worry about their premiums being eroded by inflation.

## Features

- **Decentralized Insurance Platform:** The project aims to create a decentralized insurance platform that eliminates the need for intermediaries and provides a transparent and efficient insurance process.
- **Inflation-Protected Premiums:** The platform utilizes Truflation data to calculate inflation-adjusted insurance premiums, ensuring that users' premiums are protected against the erosive effects of inflation.
- **Verse Token Integration:** The project incorporates Verse tokens as the payment method for insurance premiums and claims, offering users a convenient and secure way to transact within the platform.
- **Smart Contract Automation:** ChainLink is utilized to automate smart contracts by regularly fetching and updating Truflation data. This ensures accurate and up-to-date inflation adjustments for premiums and claims
- **User-Friendly Experience:** The platform aims to provide a seamless and user-friendly experience, allowing users to easily purchase insurance, submit claims, and track their policies through an intuitive interface.
- **Transparent and Immutable:** By leveraging blockchain technology, the project ensures transparency and immutability of insurance records, enhancing trust and eliminating the possibility of fraud or tampering.
- **Future Scalability:** The project is designed with scalability in mind, allowing for future expansion and integration with additional insurance products and services.

## Installation

1. Clone the InsureShield repository: `git clone https://github.com/Dwaipayan25/InsurTruVerse.git`
2. To deploy contract: `cd smartContract`
3. Install the necessary dependencies: `npm install`
4. Set up your environment variables for [Private_key]
5. make sure your. account is connected to goerli testnet to deploy in Goerli as Verse Tokens are supported for Goerli Network
6. Get some verse tokens from https://goerli.etherscan.io/token/0x37D4203FaE62CCd7b1a78Ef58A5515021ED8FD84#writeContract into your metamask.
7. run `npx hardhat run scripts/deploy.js`.
`npx hardhat run scripts/TruflationDeploy.js`
7. to run the project Locally : Go into client: `cd client`
8. now add the address of NFT, MarketPlace and Truflation at corresponding places in App.js
9. Automate the `requestYoyInflation` function in Truflation.js using ChainLink. Example: https://automation.chain.link/goerli/85824714380130344892932313821863739689977789604226601839239682192663830603858
10. Install the necessary dependencies: `npm install`
11. Launch the InsureShield application: `npm start`

## Support

If you encounter any issues or have questions about `InsureShield`, please reach out to me at my twitter handle https://twitter.com/dwaipayan01.
