# React_Project_1.

    This is the Full-Stack MERN project empowered with so many libraries.

## Working Flow Of Server.
    <pre>
        --> server.js --> routes --> index --> routesRelated --> controller --> Services --> models.
    </pre>
    
        
        1. server.js config of server
        2. routes _>    Instance called route of express.Routes();
                        and also having array of all the routes.
                        and on that array we apply forEach function to get access of 
                        the routes from different files.

                        routeIndex = [
                            {path, function}
                        ]

                        route.use() // mounting over each array using forEach.

                        routeIndex[0].function == having request like get aur post.

        3.



