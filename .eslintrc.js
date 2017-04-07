module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "plugins": ['vue'],
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ]
    }
};