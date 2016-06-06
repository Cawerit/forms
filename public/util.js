import riot from 'riot';

export {getCurrentRoute};


function getCurrentRoute(){
    var route;
    riot.route((collection, id, action) => {
        route = { collection, id, action };
    });
    
    console.log('aaa', riot.route.exec());
    return route;
}