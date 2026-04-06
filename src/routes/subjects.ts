import { and, eq, ilike, or, sql } from "drizzle-orm";
import exrpress from "express"
import { departments, subjects } from "../db/schema";
import {db} from "../db";
const router =exrpress.Router( )


// get query


router.get("/",async (req,res)=>{
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

        // if department exists
        if(department){
            filterResult.push(ilike(departments.name,`%${department}%`))
        }

    // combine all filters using AND if any exists
    const filter=filterResult.length>0?and(...filterResult):undefined
    const count=await db.select({count:sql<number>`count(*)`})
    .from(subjects).leftJoin(departments,eq(subjects.departmentId,departments.id))
    .where(filter);

    


    }
   catch (error) {
        console.log(`Subjects not found ${error}`)
        return res.json({
            message:"Subjects not found",
            success:false,
            error:error,

        })
    }
})