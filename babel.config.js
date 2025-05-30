module.exports = function (api) {
    api.cache(true);
    return{
        presets: ['babel-preset-expo'],
        plugins: [
            ['module:react-native-dotenv',{
                modulName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                safe: false,
                allowUndefined: true,
            }]
        ],
    };    
        
    };
