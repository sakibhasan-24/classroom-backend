import { relations } from "drizzle-orm";
import { integer, pgTable ,varchar,timestamp} from "drizzle-orm/pg-core";

const timestap={
    createdAt:timestamp("createdAt").defaultNow().notNull(),
    updatedAt:timestamp("updatedAt").$onUpdate(()=>new Date()).notNull()
}
export const departments=pgTable("departments",{
    id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    code:varchar("code",{length:50}).notNull().unique(),
    name:varchar("name",{length:250}).notNull(),
    desciption:varchar("description",{length:250}).notNull(),
    ...timestap


})


export const subjects=pgTable("subjects",{
    id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    departmentId:integer("departmentId").notNull().references(()=>departments.id,{
        onDelete:"restrict"
    }),
    code:varchar("code",{length:50}).notNull().unique(),
    name:varchar("name",{length:250}).notNull(),
    desciption:varchar("description",{length:250}).notNull(),
    ...timestap
})

export const departmentRelations = relations(departments, ({ many }) => ({
  subjects: many(subjects),
}));

export const subjectRelations = relations(subjects, ({ one,many }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id],
  }),
}));


export type Department=typeof departments.$inferSelect
export type newDepartMent=typeof departments.$inferInsert

export type Subject=typeof subjects.$inferSelect
export type newSubject=typeof subjects.$inferInsert