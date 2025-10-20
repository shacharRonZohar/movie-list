import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','passwordHash','displayName','createdAt']);

export const ContentScalarFieldEnumSchema = z.enum(['id','title','status','createdAt','createdById','requestedById','order']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const StatusSchema = z.enum(['WANT_TO_WATCH','WATCHING','WATCHED','ON_HOLD','DROPPED']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CONTENT SCHEMA
/////////////////////////////////////////

export const ContentSchema = z.object({
  status: StatusSchema,
  id: z.uuid(),
  title: z.string(),
  createdAt: z.coerce.date(),
  createdById: z.string(),
  requestedById: z.string(),
  order: z.number().int(),
})

export type Content = z.infer<typeof ContentSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  createdContent: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  requestedContent: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  createdContent: z.boolean().optional(),
  requestedContent: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  displayName: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  createdContent: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  requestedContent: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTENT
//------------------------------------------------------

export const ContentIncludeSchema: z.ZodType<Prisma.ContentInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  requestedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ContentArgsSchema: z.ZodType<Prisma.ContentDefaultArgs> = z.object({
  select: z.lazy(() => ContentSelectSchema).optional(),
  include: z.lazy(() => ContentIncludeSchema).optional(),
}).strict();

export const ContentSelectSchema: z.ZodType<Prisma.ContentSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  createdById: z.boolean().optional(),
  requestedById: z.boolean().optional(),
  order: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  requestedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdContent: z.lazy(() => ContentListRelationFilterSchema).optional(),
  requestedContent: z.lazy(() => ContentListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdContent: z.lazy(() => ContentOrderByRelationAggregateInputSchema).optional(),
  requestedContent: z.lazy(() => ContentOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    username: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdContent: z.lazy(() => ContentListRelationFilterSchema).optional(),
  requestedContent: z.lazy(() => ContentListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const ContentWhereInputSchema: z.ZodType<Prisma.ContentWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ContentWhereInputSchema), z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentWhereInputSchema), z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  requestedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const ContentOrderByWithRelationInputSchema: z.ZodType<Prisma.ContentOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  requestedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const ContentWhereUniqueInputSchema: z.ZodType<Prisma.ContentWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => ContentWhereInputSchema), z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentWhereInputSchema), z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  requestedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const ContentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContentOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ContentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ContentSumOrderByAggregateInputSchema).optional(),
});

export const ContentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContentScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ContentScalarWhereWithAggregatesInputSchema), z.lazy(() => ContentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentScalarWhereWithAggregatesInputSchema), z.lazy(() => ContentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  createdContent: z.lazy(() => ContentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  requestedContent: z.lazy(() => ContentCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  createdContent: z.lazy(() => ContentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  requestedContent: z.lazy(() => ContentUncheckedCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdContent: z.lazy(() => ContentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  requestedContent: z.lazy(() => ContentUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdContent: z.lazy(() => ContentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  requestedContent: z.lazy(() => ContentUncheckedUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentCreateInputSchema: z.ZodType<Prisma.ContentCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  order: z.number().int(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedContentInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestedContentInputSchema),
});

export const ContentUncheckedCreateInputSchema: z.ZodType<Prisma.ContentUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  createdById: z.string(),
  requestedById: z.string(),
  order: z.number().int(),
});

export const ContentUpdateInputSchema: z.ZodType<Prisma.ContentUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedContentNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestedContentNestedInputSchema).optional(),
});

export const ContentUncheckedUpdateInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentCreateManyInputSchema: z.ZodType<Prisma.ContentCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  createdById: z.string(),
  requestedById: z.string(),
  order: z.number().int(),
});

export const ContentUpdateManyMutationInputSchema: z.ZodType<Prisma.ContentUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const ContentListRelationFilterSchema: z.ZodType<Prisma.ContentListRelationFilter> = z.strictObject({
  every: z.lazy(() => ContentWhereInputSchema).optional(),
  some: z.lazy(() => ContentWhereInputSchema).optional(),
  none: z.lazy(() => ContentWhereInputSchema).optional(),
});

export const ContentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContentOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const ContentCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContentCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContentAvgOrderByAggregateInput> = z.strictObject({
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContentMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContentMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContentSumOrderByAggregateInput> = z.strictObject({
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const ContentCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentCreateNestedManyWithoutCreatedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutCreatedByInputSchema), z.lazy(() => ContentCreateWithoutCreatedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
});

export const ContentCreateNestedManyWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentCreateNestedManyWithoutRequestedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutRequestedByInputSchema), z.lazy(() => ContentCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyRequestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
});

export const ContentUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUncheckedCreateNestedManyWithoutCreatedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutCreatedByInputSchema), z.lazy(() => ContentCreateWithoutCreatedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
});

export const ContentUncheckedCreateNestedManyWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUncheckedCreateNestedManyWithoutRequestedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutRequestedByInputSchema), z.lazy(() => ContentCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyRequestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const ContentUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.ContentUpdateManyWithoutCreatedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutCreatedByInputSchema), z.lazy(() => ContentCreateWithoutCreatedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutCreatedByInputSchema), z.lazy(() => ContentUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutCreatedByInputSchema), z.lazy(() => ContentUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutCreatedByInputSchema), z.lazy(() => ContentUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema), z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
});

export const ContentUpdateManyWithoutRequestedByNestedInputSchema: z.ZodType<Prisma.ContentUpdateManyWithoutRequestedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutRequestedByInputSchema), z.lazy(() => ContentCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ContentUpsertWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyRequestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ContentUpdateWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutRequestedByInputSchema), z.lazy(() => ContentUpdateManyWithWhereWithoutRequestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema), z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
});

export const ContentUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutCreatedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutCreatedByInputSchema), z.lazy(() => ContentCreateWithoutCreatedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutCreatedByInputSchema), z.lazy(() => ContentUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutCreatedByInputSchema), z.lazy(() => ContentUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutCreatedByInputSchema), z.lazy(() => ContentUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema), z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
});

export const ContentUncheckedUpdateManyWithoutRequestedByNestedInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutRequestedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutRequestedByInputSchema), z.lazy(() => ContentCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ContentCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ContentUpsertWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyRequestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema), z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ContentUpdateWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutRequestedByInputSchema), z.lazy(() => ContentUpdateManyWithWhereWithoutRequestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema), z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedContentInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedContentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRequestedContentInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestedContentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => StatusSchema).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const UserUpdateOneRequiredWithoutCreatedContentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedContentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedContentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedContentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedContentInputSchema), z.lazy(() => UserUpdateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCreatedContentInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutRequestedContentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRequestedContentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestedContentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRequestedContentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRequestedContentInputSchema), z.lazy(() => UserUpdateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRequestedContentInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
});

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const ContentCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentCreateWithoutCreatedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  order: z.number().int(),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestedContentInputSchema),
});

export const ContentUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutCreatedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  requestedById: z.string(),
  order: z.number().int(),
});

export const ContentCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutCreatedByInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema) ]),
});

export const ContentCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.ContentCreateManyCreatedByInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ContentCreateManyCreatedByInputSchema), z.lazy(() => ContentCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ContentCreateWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentCreateWithoutRequestedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  order: z.number().int(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedContentInputSchema),
});

export const ContentUncheckedCreateWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutRequestedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  createdById: z.string(),
  order: z.number().int(),
});

export const ContentCreateOrConnectWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema) ]),
});

export const ContentCreateManyRequestedByInputEnvelopeSchema: z.ZodType<Prisma.ContentCreateManyRequestedByInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ContentCreateManyRequestedByInputSchema), z.lazy(() => ContentCreateManyRequestedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ContentUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUpsertWithWhereUniqueWithoutCreatedByInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContentUpdateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutCreatedByInputSchema) ]),
});

export const ContentUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUpdateWithWhereUniqueWithoutCreatedByInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateWithoutCreatedByInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutCreatedByInputSchema) ]),
});

export const ContentUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUpdateManyWithWhereWithoutCreatedByInput> = z.strictObject({
  where: z.lazy(() => ContentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateManyMutationInputSchema), z.lazy(() => ContentUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
});

export const ContentScalarWhereInputSchema: z.ZodType<Prisma.ContentScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ContentScalarWhereInputSchema), z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentScalarWhereInputSchema), z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
});

export const ContentUpsertWithWhereUniqueWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUpsertWithWhereUniqueWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContentUpdateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutRequestedByInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedCreateWithoutRequestedByInputSchema) ]),
});

export const ContentUpdateWithWhereUniqueWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUpdateWithWhereUniqueWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateWithoutRequestedByInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutRequestedByInputSchema) ]),
});

export const ContentUpdateManyWithWhereWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUpdateManyWithWhereWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ContentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateManyMutationInputSchema), z.lazy(() => ContentUncheckedUpdateManyWithoutRequestedByInputSchema) ]),
});

export const UserCreateWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedContentInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  requestedContent: z.lazy(() => ContentCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserUncheckedCreateWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedContentInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  requestedContent: z.lazy(() => ContentUncheckedCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserCreateOrConnectWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedContentInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedContentInputSchema) ]),
});

export const UserCreateWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserCreateWithoutRequestedContentInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  createdContent: z.lazy(() => ContentCreateNestedManyWithoutCreatedByInputSchema).optional(),
});

export const UserUncheckedCreateWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRequestedContentInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  createdContent: z.lazy(() => ContentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
});

export const UserCreateOrConnectWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRequestedContentInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedContentInputSchema) ]),
});

export const UserUpsertWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedContentInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCreatedContentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedContentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedContentInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedContentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCreatedContentInputSchema) ]),
});

export const UserUpdateWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedContent: z.lazy(() => ContentUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutCreatedContentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedContent: z.lazy(() => ContentUncheckedUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserUpsertWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserUpsertWithoutRequestedContentInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRequestedContentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedContentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRequestedContentInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRequestedContentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRequestedContentInputSchema) ]),
});

export const UserUpdateWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserUpdateWithoutRequestedContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdContent: z.lazy(() => ContentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutRequestedContentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRequestedContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdContent: z.lazy(() => ContentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
});

export const ContentCreateManyCreatedByInputSchema: z.ZodType<Prisma.ContentCreateManyCreatedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  requestedById: z.string(),
  order: z.number().int(),
});

export const ContentCreateManyRequestedByInputSchema: z.ZodType<Prisma.ContentCreateManyRequestedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  createdById: z.string(),
  order: z.number().int(),
});

export const ContentUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUpdateWithoutCreatedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestedContentNestedInputSchema).optional(),
});

export const ContentUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateWithoutCreatedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutCreatedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentUpdateWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUpdateWithoutRequestedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedContentNestedInputSchema).optional(),
});

export const ContentUncheckedUpdateWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateWithoutRequestedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentUncheckedUpdateManyWithoutRequestedByInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutRequestedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const ContentFindFirstArgsSchema: z.ZodType<Prisma.ContentFindFirstArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereInputSchema.optional(), 
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(), ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContentScalarFieldEnumSchema, ContentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ContentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContentFindFirstOrThrowArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereInputSchema.optional(), 
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(), ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContentScalarFieldEnumSchema, ContentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ContentFindManyArgsSchema: z.ZodType<Prisma.ContentFindManyArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereInputSchema.optional(), 
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(), ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContentScalarFieldEnumSchema, ContentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ContentAggregateArgsSchema: z.ZodType<Prisma.ContentAggregateArgs> = z.object({
  where: ContentWhereInputSchema.optional(), 
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(), ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ContentGroupByArgsSchema: z.ZodType<Prisma.ContentGroupByArgs> = z.object({
  where: ContentWhereInputSchema.optional(), 
  orderBy: z.union([ ContentOrderByWithAggregationInputSchema.array(), ContentOrderByWithAggregationInputSchema ]).optional(),
  by: ContentScalarFieldEnumSchema.array(), 
  having: ContentScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ContentFindUniqueArgsSchema: z.ZodType<Prisma.ContentFindUniqueArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema, 
}).strict();

export const ContentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContentFindUniqueOrThrowArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ContentCreateArgsSchema: z.ZodType<Prisma.ContentCreateArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  data: z.union([ ContentCreateInputSchema, ContentUncheckedCreateInputSchema ]),
}).strict();

export const ContentUpsertArgsSchema: z.ZodType<Prisma.ContentUpsertArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema, 
  create: z.union([ ContentCreateInputSchema, ContentUncheckedCreateInputSchema ]),
  update: z.union([ ContentUpdateInputSchema, ContentUncheckedUpdateInputSchema ]),
}).strict();

export const ContentCreateManyArgsSchema: z.ZodType<Prisma.ContentCreateManyArgs> = z.object({
  data: z.union([ ContentCreateManyInputSchema, ContentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ContentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ContentCreateManyAndReturnArgs> = z.object({
  data: z.union([ ContentCreateManyInputSchema, ContentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ContentDeleteArgsSchema: z.ZodType<Prisma.ContentDeleteArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema, 
}).strict();

export const ContentUpdateArgsSchema: z.ZodType<Prisma.ContentUpdateArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  data: z.union([ ContentUpdateInputSchema, ContentUncheckedUpdateInputSchema ]),
  where: ContentWhereUniqueInputSchema, 
}).strict();

export const ContentUpdateManyArgsSchema: z.ZodType<Prisma.ContentUpdateManyArgs> = z.object({
  data: z.union([ ContentUpdateManyMutationInputSchema, ContentUncheckedUpdateManyInputSchema ]),
  where: ContentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ContentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ContentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ContentUpdateManyMutationInputSchema, ContentUncheckedUpdateManyInputSchema ]),
  where: ContentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ContentDeleteManyArgsSchema: z.ZodType<Prisma.ContentDeleteManyArgs> = z.object({
  where: ContentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();