'use_strict';

module.exports = {
    endpoints : {
        root : {
          directory : 'controllers',
          route : '/'
        },
        api : {
            v1 : {
                directory : ['api', 'v1'],
                route : '/api/v1'    
            }
        }
    }
};