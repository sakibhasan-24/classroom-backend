import { relations } from "drizzle-orm";
import { integer, pgTable ,varchar,timestamp} from "drizzle-orm/pg-core";

const timestap={
    createdAt:timestamp("createdAt").defaultNow().notNull(),
    updatedAt:timestamp("updatedAt").$onUpdate(()=>new Date()).notNull()
}
export const department=pgTable("department",{
    id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    code:varchar("code",{length:50}).notNull().unique(),
    name:varchar("name",{length:250}).notNull(),
    desciption:varchar("description",{length:250}).notNull(),
    ...timestap


})


export const subjects=pgTable("subjects",{
    id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    departmentId:integer("departmentId").notNull().references(()=>department.id,{
        onDelete:"restrict"
    }),
    code:varchar("code",{length:50}).notNull().unique(),
    name:varchar("name",{length:250}).notNull(),
    desciption:varchar("description",{length:250}).notNull(),
    ...timestap
})

export const departmentRelations = relations(department, ({ many }) => ({
  subjects: many(subjects),
}));

export const subjectRelations = relations(subjects, ({ one,many }) => ({
  department: one(department, {
    fields: [subjects.departmentId],
    references: [department.id],
  }),
}));


export type Department=typeof department.$inferSelect
export type newDepartMent=typeof department.$inferInsert

export type Subject=typeof subjects.$inferSelect
export type newSubject=typeof subjects.$inferInsert