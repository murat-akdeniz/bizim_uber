const BaseDatabase=require('./base-database')
const Driver=require('../models/driver')

class DriverDatabase extends BaseDatabase{
/*     findByDriverName(name){
        return this.load().find(o => o.name ==name)
    }

    findByLocation(location){
        return this.load().find(o=> o.location == location)
    } */

    findByDriverName(name){
        return this.findBy('name',name)
    }

    findByLocation(location){
        return this.findBy('location',location)
    }
}

module.exports=new DriverDatabase(Driver)