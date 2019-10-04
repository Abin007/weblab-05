const animals= require("./data/animals.js")
const connection = require("./mongoConnection")

async function  main() {
    try{
        let sasha = await animals.create("Sasha","Dog");
        console.log(sasha)
        let lucy =await animals.create("Lucy","Dog");
        const allanimals = await animals.getAll();
        console.log(allanimals)
        const Duke =await animals.create("Duke","Walrus");
        console.log(Duke)
        const updateanimal = await animals.rename(String(sasha._id),"Sashsitha")
        console.log(updateanimal)
        const remanimal= await animals.remove(String(lucy._id))
        const allanimals1 = await animals.getAll()
        console.log(allanimals1)
    }
    catch(e){
        console.log(e)
    }
    const db = await connection();
    await db.serverConfig.close();
    
}
main()
