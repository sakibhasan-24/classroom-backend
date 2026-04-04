import exrpress from "express"

const router =exrpress.Router( )


// get query


router.get("/",(req,res)=>{
    try {
        
    } catch (error) {
        console.log(`Subjects not found ${error}`)
    }
})