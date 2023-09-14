# Server Side Roadmap.

    Package.json. --> Modification.

        <pre>
            "script": {
                "start": "nodemon server/server.js",
                "server": "node server/server.js",
                "client" "npm start --prefix client",
                "dev": "concurrently \"npm run server\"npm run client \"\""
            }
        </pre>
    Server/server.js