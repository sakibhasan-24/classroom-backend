import { ilike, or } from "drizzle-orm";
import exrpress from "express"
import { subjects } from "../db/schema";

const router =exrpress.Router( )


// get query


router.get("/",(req,res)=>{
    try {
        const {search,department,page=1,limit=10}=req.query;
        // pagination logic
        const currentPage=Math.max(1,+page)
        const limitPerPage=Math.max(1,+limit)
        const offSet=(currentPage-1)*limitPerPage
        // drizzle orm logic for filtering
        const filterResult=[]
        // if search exists
        if(search){
            filterResult.push(
                or(ilike(subjects.name,`%${search}%`),(
                    ilike(subjects.code,`%${search}%`)
                ))
            )
        }
    } catch (error) {
        console.log(`Subjects not found ${error}`)
        return res.json({
            message:"Subjects not found",
            success:false,
            error:error,

        })
    }
})