const mongocollection = require('../mongoCollections');
const ObjectID= require("mongodb").ObjectID
const animals = mongocollection.animals;

async function create(name, animalType){
    if(name==undefined || animalType==undefined){
        throw new Error("Two parameters (name, animalType) is not entered");
    }
    if (typeof name !== "string"){
        throw new Error("Type of name parameter is not string");
    }
    if (typeof animalType !=="string"){
        throw new Error("Type of animalType  parameter is not string");
    }
    const animalcollection= await  animals();

    let newanimal ={
        name:name,
        animalType:animalType
    };
    const insertedanimal = await animalcollection.insertOne(newanimal);
    if(insertedanimal.insertedCount === 0) throw new Error ("the Animal could not be added");

    const newid= insertedanimal.insertedId;
    const animalinfo=await get(String(newid))
    return animalinfo
}

async function getAll(){
    const animalcollection= await animals();
    const allanimalinfo = await animalcollection.find({}).toArray()
    if(allanimalinfo.length==0) throw new Error("There are no records available")
    return allanimalinfo
}

async function get(id){
    if (!id) throw new Error("Id not available");

    if(typeof id !== "string") throw new Error("Id is not of type String")

    idnum=ObjectID(id)
    const animalcollection = await animals();
    const animal= await animalcollection.findOne({_id:idnum});
    if(animal === null) throw new Error (`No animal is  available with that id- ${id}`)
    return animal;
}
async function remove(id){
    if (!id) throw new Error("Id not available");
    if(typeof id !== "string") throw new Error("Id is not of type String")
    idnum=ObjectID(id)
    const  animalinfo=await get(String(idnum))
    const animalcollection = await animals();
    const animalremoved= animalcollection.removeOne({_id:idnum});
    if(animalremoved.deletedCount === 0) throw new Error("This Record could not be deleted")

    return animalinfo
}

async function rename(id, newName){
    if(!id){
        throw new Error("No Id is not defined");
    }
    if(newName===undefined){
        throw new Error("No Name is defined");
    }
    if(typeof id !=='string'){
        throw new Error("Id is not type string");
    }
    if(typeof newName !== 'string'){
        throw new Error("New Name is not of type string");
    }
    idnum=ObjectID.createFromHexString(id)
    const animalcollection = await animals();
    const updateanimal={
        name:newName
    }
    const animalupdated= await animalcollection.updateOne({_id:idnum},{$set:{name:newName}})
    if(animalupdated.modifiedCount === 0) throw new Error("Name of animal could not be renamed")
    const updateanimalinfo = await get(String(idnum))

    return updateanimalinfo
}


module.exports={
    create,
    getAll,
    get,
    remove,
    rename
}