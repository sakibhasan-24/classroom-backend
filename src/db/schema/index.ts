import { integer, pgTable ,varchar} from "drizzle-orm/pg-core";

export const department=pgTable("department",{
    id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    code:varchar("code",{length:50}).notNull().unique(),
    name:varchar("name",{length:250}).notNull(),
    desciption:varchar("description",{length:250}).notNull(),
    
})