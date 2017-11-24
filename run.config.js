module.exports = {
    apps: [{
        name: "dev",
        script: "app",
        watch: true,
        env: {
            "NODE_ENV": "development",
        },
        env_production: {
            "NODE_ENV": "production"
        },
        ignore_watch: ['node_modules', 'views', 'static']
    },
        {
            name: "test",
            script: "app",
            env: {
                "NODE_ENV": "test",
            }
        },
        {
            name: "stage",
            script: "app",
            env: {
                "NODE_ENV": "stage",
            }
        },
        {
            name: "build",
            script: "app",
            env: {
                "NODE_ENV": "production",
            }
        }]
};
