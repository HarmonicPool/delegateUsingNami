## Contents
- [NextJs](#NextJs)

\
## NextJs


open your ```next.config.js```

ad add the following

```js
module.exports = {

    /*... your next.js config ...*/

    // allows *.wasm files
    webpack: (config) => {
        const experiments = config.experiments || {};
        config.experiments = {
        ...experiments,
        syncWebAssembly: true,
        };
        return config
    },
};
```