# DAO Explorer

This is a project to demonstrate the following fullstack skills.

<details>
    <summary>## Displayed Skills</summary>
    
    Frontend
    - NextJS
    - React
    - TailwindCSS
    - Data Viz

    Backend
    - Django
    - Prisma (ORM)

    Database
    - PostgreSQL

    CI/CD
    - Deployment
    - Dockerization

    Data Analytics
    - Understanding of Blockchain Data
    - Understanding of Decentralised Autonomous Organisations and the ecosystem
</details>

Definition of Done:
- Frontend Deployed showing data queried from the database.
    - Data Viz shows DAOs from the Optimism Blockchain in a Graph View
        - can be filtered with asset under management
        - relationship shows from where the DAOs are deployed (Factory of which DAO service)
- Backend queries the right data from the database

<details>
    <summary>## Step 1</summary>
    1. Find the factory address of a DAO service provider
        Search on the website, github or deploy a DAO and check etherscan for internal txs.
        [Aragon](https://github.com/aragon/osx/blob/82f16c3ebb662cee9ac420d32d493e36bb352f45/packages/contracts/Releases.md?plain=1#L5)

        For example:
            DAO Factory: [0xf96e6FD76BD0A15580604e1Ea5818D448b1041C0](https://etherscan.io/address/0xf96e6FD76BD0A15580604e1Ea5818D448b1041C0)
            Click on one DAO deployment, method: "Create Dao":
            Example: [0xa5949f582fbc3a914f9fb4e62698523725febe054c6d8eb45e90dbb4b17cb448](https://etherscan.io/tx/0xa5949f582fbc3a914f9fb4e62698523725febe054c6d8eb45e90dbb4b17cb448)
            -> two internal txs
            1) Multisig Factory instantiating a multisig deployed via Proxy-1967
            2) DAO Factory instantiating a governor contract deployed via Proxy-1967
            



</details>

Data displayed will be a snapshot of a certain block.
Later stage: decentralise data indexing with the graph and always show up to date data

