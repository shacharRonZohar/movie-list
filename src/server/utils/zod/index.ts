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

export const ContentScalarFieldEnumSchema = z.enum(['id','externalId','externalSource','title','originalTitle','type','overview','tagline','genres','originalLanguage','releaseDate','year','runtime','posterPath','backdropPath','imdbId','createdAt','updatedAt']);

export const SeriesDetailsScalarFieldEnumSchema = z.enum(['id','contentId','seasonCount','episodeCount','status','lastAirDate']);

export const ListItemScalarFieldEnumSchema = z.enum(['id','contentId','addedById','requestedById','status','position','rating','addedAt']);

export const StatusHistoryScalarFieldEnumSchema = z.enum(['id','listItemId','fromStatus','toStatus','changedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const StatusSchema = z.enum(['WANT_TO_WATCH','WATCHING','WATCHED','ON_HOLD','DROPPED']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export const ContentTypeSchema = z.enum(['MOVIE','SERIES']);

export type ContentTypeType = `${z.infer<typeof ContentTypeSchema>}`

export const ExternalSourceSchema = z.enum(['TMDB']);

export type ExternalSourceType = `${z.infer<typeof ExternalSourceSchema>}`

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
  externalSource: ExternalSourceSchema,
  type: ContentTypeSchema,
  id: z.uuid(),
  externalId: z.string(),
  title: z.string(),
  originalTitle: z.string().nullable(),
  overview: z.string().nullable(),
  tagline: z.string().nullable(),
  genres: z.string().array(),
  originalLanguage: z.string().nullable(),
  releaseDate: z.string().nullable(),
  year: z.number().int(),
  runtime: z.number().int().nullable(),
  posterPath: z.string().nullable(),
  backdropPath: z.string().nullable(),
  imdbId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Content = z.infer<typeof ContentSchema>

/////////////////////////////////////////
// SERIES DETAILS SCHEMA
/////////////////////////////////////////

export const SeriesDetailsSchema = z.object({
  id: z.uuid(),
  contentId: z.string(),
  seasonCount: z.number().int().nullable(),
  episodeCount: z.number().int().nullable(),
  status: z.string().nullable(),
  lastAirDate: z.coerce.date().nullable(),
})

export type SeriesDetails = z.infer<typeof SeriesDetailsSchema>

/////////////////////////////////////////
// LIST ITEM SCHEMA
/////////////////////////////////////////

export const ListItemSchema = z.object({
  status: StatusSchema,
  id: z.uuid(),
  contentId: z.string(),
  addedById: z.string(),
  requestedById: z.string(),
  position: z.number(),
  rating: z.number().nullable(),
  addedAt: z.coerce.date(),
})

export type ListItem = z.infer<typeof ListItemSchema>

/////////////////////////////////////////
// STATUS HISTORY SCHEMA
/////////////////////////////////////////

export const StatusHistorySchema = z.object({
  fromStatus: StatusSchema.nullable(),
  toStatus: StatusSchema,
  id: z.uuid(),
  listItemId: z.string(),
  changedAt: z.coerce.date(),
})

export type StatusHistory = z.infer<typeof StatusHistorySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  addedListItems: z.union([z.boolean(),z.lazy(() => ListItemFindManyArgsSchema)]).optional(),
  requestedListItems: z.union([z.boolean(),z.lazy(() => ListItemFindManyArgsSchema)]).optional(),
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
  addedListItems: z.boolean().optional(),
  requestedListItems: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  displayName: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  addedListItems: z.union([z.boolean(),z.lazy(() => ListItemFindManyArgsSchema)]).optional(),
  requestedListItems: z.union([z.boolean(),z.lazy(() => ListItemFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTENT
//------------------------------------------------------

export const ContentIncludeSchema: z.ZodType<Prisma.ContentInclude> = z.object({
  seriesDetails: z.union([z.boolean(),z.lazy(() => SeriesDetailsArgsSchema)]).optional(),
  listItems: z.union([z.boolean(),z.lazy(() => ListItemArgsSchema)]).optional(),
}).strict();

export const ContentArgsSchema: z.ZodType<Prisma.ContentDefaultArgs> = z.object({
  select: z.lazy(() => ContentSelectSchema).optional(),
  include: z.lazy(() => ContentIncludeSchema).optional(),
}).strict();

export const ContentSelectSchema: z.ZodType<Prisma.ContentSelect> = z.object({
  id: z.boolean().optional(),
  externalId: z.boolean().optional(),
  externalSource: z.boolean().optional(),
  title: z.boolean().optional(),
  originalTitle: z.boolean().optional(),
  type: z.boolean().optional(),
  overview: z.boolean().optional(),
  tagline: z.boolean().optional(),
  genres: z.boolean().optional(),
  originalLanguage: z.boolean().optional(),
  releaseDate: z.boolean().optional(),
  year: z.boolean().optional(),
  runtime: z.boolean().optional(),
  posterPath: z.boolean().optional(),
  backdropPath: z.boolean().optional(),
  imdbId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  seriesDetails: z.union([z.boolean(),z.lazy(() => SeriesDetailsArgsSchema)]).optional(),
  listItems: z.union([z.boolean(),z.lazy(() => ListItemArgsSchema)]).optional(),
}).strict()

// SERIES DETAILS
//------------------------------------------------------

export const SeriesDetailsIncludeSchema: z.ZodType<Prisma.SeriesDetailsInclude> = z.object({
  content: z.union([z.boolean(),z.lazy(() => ContentArgsSchema)]).optional(),
}).strict();

export const SeriesDetailsArgsSchema: z.ZodType<Prisma.SeriesDetailsDefaultArgs> = z.object({
  select: z.lazy(() => SeriesDetailsSelectSchema).optional(),
  include: z.lazy(() => SeriesDetailsIncludeSchema).optional(),
}).strict();

export const SeriesDetailsSelectSchema: z.ZodType<Prisma.SeriesDetailsSelect> = z.object({
  id: z.boolean().optional(),
  contentId: z.boolean().optional(),
  seasonCount: z.boolean().optional(),
  episodeCount: z.boolean().optional(),
  status: z.boolean().optional(),
  lastAirDate: z.boolean().optional(),
  content: z.union([z.boolean(),z.lazy(() => ContentArgsSchema)]).optional(),
}).strict()

// LIST ITEM
//------------------------------------------------------

export const ListItemIncludeSchema: z.ZodType<Prisma.ListItemInclude> = z.object({
  content: z.union([z.boolean(),z.lazy(() => ContentArgsSchema)]).optional(),
  addedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  requestedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  statusHistory: z.union([z.boolean(),z.lazy(() => StatusHistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ListItemCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ListItemArgsSchema: z.ZodType<Prisma.ListItemDefaultArgs> = z.object({
  select: z.lazy(() => ListItemSelectSchema).optional(),
  include: z.lazy(() => ListItemIncludeSchema).optional(),
}).strict();

export const ListItemCountOutputTypeArgsSchema: z.ZodType<Prisma.ListItemCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ListItemCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ListItemCountOutputTypeSelectSchema: z.ZodType<Prisma.ListItemCountOutputTypeSelect> = z.object({
  statusHistory: z.boolean().optional(),
}).strict();

export const ListItemSelectSchema: z.ZodType<Prisma.ListItemSelect> = z.object({
  id: z.boolean().optional(),
  contentId: z.boolean().optional(),
  addedById: z.boolean().optional(),
  requestedById: z.boolean().optional(),
  status: z.boolean().optional(),
  position: z.boolean().optional(),
  rating: z.boolean().optional(),
  addedAt: z.boolean().optional(),
  content: z.union([z.boolean(),z.lazy(() => ContentArgsSchema)]).optional(),
  addedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  requestedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  statusHistory: z.union([z.boolean(),z.lazy(() => StatusHistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ListItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STATUS HISTORY
//------------------------------------------------------

export const StatusHistoryIncludeSchema: z.ZodType<Prisma.StatusHistoryInclude> = z.object({
  listItem: z.union([z.boolean(),z.lazy(() => ListItemArgsSchema)]).optional(),
}).strict();

export const StatusHistoryArgsSchema: z.ZodType<Prisma.StatusHistoryDefaultArgs> = z.object({
  select: z.lazy(() => StatusHistorySelectSchema).optional(),
  include: z.lazy(() => StatusHistoryIncludeSchema).optional(),
}).strict();

export const StatusHistorySelectSchema: z.ZodType<Prisma.StatusHistorySelect> = z.object({
  id: z.boolean().optional(),
  listItemId: z.boolean().optional(),
  fromStatus: z.boolean().optional(),
  toStatus: z.boolean().optional(),
  changedAt: z.boolean().optional(),
  listItem: z.union([z.boolean(),z.lazy(() => ListItemArgsSchema)]).optional(),
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
  addedListItems: z.lazy(() => ListItemListRelationFilterSchema).optional(),
  requestedListItems: z.lazy(() => ListItemListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  addedListItems: z.lazy(() => ListItemOrderByRelationAggregateInputSchema).optional(),
  requestedListItems: z.lazy(() => ListItemOrderByRelationAggregateInputSchema).optional(),
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
  addedListItems: z.lazy(() => ListItemListRelationFilterSchema).optional(),
  requestedListItems: z.lazy(() => ListItemListRelationFilterSchema).optional(),
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
  externalId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  externalSource: z.union([ z.lazy(() => EnumExternalSourceFilterSchema), z.lazy(() => ExternalSourceSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  originalTitle: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumContentTypeFilterSchema), z.lazy(() => ContentTypeSchema) ]).optional(),
  overview: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tagline: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  genres: z.lazy(() => StringNullableListFilterSchema).optional(),
  originalLanguage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  runtime: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  posterPath: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  backdropPath: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  imdbId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  seriesDetails: z.union([ z.lazy(() => SeriesDetailsNullableScalarRelationFilterSchema), z.lazy(() => SeriesDetailsWhereInputSchema) ]).optional().nullable(),
  listItems: z.union([ z.lazy(() => ListItemNullableScalarRelationFilterSchema), z.lazy(() => ListItemWhereInputSchema) ]).optional().nullable(),
});

export const ContentOrderByWithRelationInputSchema: z.ZodType<Prisma.ContentOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  externalSource: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  originalTitle: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  overview: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tagline: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  genres: z.lazy(() => SortOrderSchema).optional(),
  originalLanguage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  releaseDate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  posterPath: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  backdropPath: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  imdbId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  seriesDetails: z.lazy(() => SeriesDetailsOrderByWithRelationInputSchema).optional(),
  listItems: z.lazy(() => ListItemOrderByWithRelationInputSchema).optional(),
});

export const ContentWhereUniqueInputSchema: z.ZodType<Prisma.ContentWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    externalSource_externalId: z.lazy(() => ContentExternalSourceExternalIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    externalSource_externalId: z.lazy(() => ContentExternalSourceExternalIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  externalSource_externalId: z.lazy(() => ContentExternalSourceExternalIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ContentWhereInputSchema), z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentWhereInputSchema), z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  externalId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  externalSource: z.union([ z.lazy(() => EnumExternalSourceFilterSchema), z.lazy(() => ExternalSourceSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  originalTitle: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumContentTypeFilterSchema), z.lazy(() => ContentTypeSchema) ]).optional(),
  overview: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tagline: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  genres: z.lazy(() => StringNullableListFilterSchema).optional(),
  originalLanguage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  runtime: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  posterPath: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  backdropPath: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  imdbId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  seriesDetails: z.union([ z.lazy(() => SeriesDetailsNullableScalarRelationFilterSchema), z.lazy(() => SeriesDetailsWhereInputSchema) ]).optional().nullable(),
  listItems: z.union([ z.lazy(() => ListItemNullableScalarRelationFilterSchema), z.lazy(() => ListItemWhereInputSchema) ]).optional().nullable(),
}));

export const ContentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContentOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  externalSource: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  originalTitle: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  overview: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tagline: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  genres: z.lazy(() => SortOrderSchema).optional(),
  originalLanguage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  releaseDate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  posterPath: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  backdropPath: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  imdbId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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
  externalId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  externalSource: z.union([ z.lazy(() => EnumExternalSourceWithAggregatesFilterSchema), z.lazy(() => ExternalSourceSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  originalTitle: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumContentTypeWithAggregatesFilterSchema), z.lazy(() => ContentTypeSchema) ]).optional(),
  overview: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  tagline: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  genres: z.lazy(() => StringNullableListFilterSchema).optional(),
  originalLanguage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  runtime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  posterPath: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  backdropPath: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  imdbId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const SeriesDetailsWhereInputSchema: z.ZodType<Prisma.SeriesDetailsWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SeriesDetailsWhereInputSchema), z.lazy(() => SeriesDetailsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeriesDetailsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeriesDetailsWhereInputSchema), z.lazy(() => SeriesDetailsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  contentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  seasonCount: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  episodeCount: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lastAirDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  content: z.union([ z.lazy(() => ContentScalarRelationFilterSchema), z.lazy(() => ContentWhereInputSchema) ]).optional(),
});

export const SeriesDetailsOrderByWithRelationInputSchema: z.ZodType<Prisma.SeriesDetailsOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  seasonCount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  episodeCount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastAirDate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.lazy(() => ContentOrderByWithRelationInputSchema).optional(),
});

export const SeriesDetailsWhereUniqueInputSchema: z.ZodType<Prisma.SeriesDetailsWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    contentId: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    contentId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string().optional(),
  AND: z.union([ z.lazy(() => SeriesDetailsWhereInputSchema), z.lazy(() => SeriesDetailsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeriesDetailsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeriesDetailsWhereInputSchema), z.lazy(() => SeriesDetailsWhereInputSchema).array() ]).optional(),
  seasonCount: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  episodeCount: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lastAirDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  content: z.union([ z.lazy(() => ContentScalarRelationFilterSchema), z.lazy(() => ContentWhereInputSchema) ]).optional(),
}));

export const SeriesDetailsOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeriesDetailsOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  seasonCount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  episodeCount: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastAirDate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SeriesDetailsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SeriesDetailsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeriesDetailsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeriesDetailsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SeriesDetailsSumOrderByAggregateInputSchema).optional(),
});

export const SeriesDetailsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeriesDetailsScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SeriesDetailsScalarWhereWithAggregatesInputSchema), z.lazy(() => SeriesDetailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeriesDetailsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeriesDetailsScalarWhereWithAggregatesInputSchema), z.lazy(() => SeriesDetailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  contentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  seasonCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  episodeCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  lastAirDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const ListItemWhereInputSchema: z.ZodType<Prisma.ListItemWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ListItemWhereInputSchema), z.lazy(() => ListItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ListItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ListItemWhereInputSchema), z.lazy(() => ListItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  contentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  addedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  position: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  addedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  content: z.union([ z.lazy(() => ContentScalarRelationFilterSchema), z.lazy(() => ContentWhereInputSchema) ]).optional(),
  addedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  requestedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  statusHistory: z.lazy(() => StatusHistoryListRelationFilterSchema).optional(),
});

export const ListItemOrderByWithRelationInputSchema: z.ZodType<Prisma.ListItemOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  addedById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => ContentOrderByWithRelationInputSchema).optional(),
  addedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  requestedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  statusHistory: z.lazy(() => StatusHistoryOrderByRelationAggregateInputSchema).optional(),
});

export const ListItemWhereUniqueInputSchema: z.ZodType<Prisma.ListItemWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    contentId: z.string(),
    position: z.number(),
  }),
  z.object({
    id: z.uuid(),
    contentId: z.string(),
  }),
  z.object({
    id: z.uuid(),
    position: z.number(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    contentId: z.string(),
    position: z.number(),
  }),
  z.object({
    contentId: z.string(),
  }),
  z.object({
    position: z.number(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string().optional(),
  position: z.number().optional(),
  AND: z.union([ z.lazy(() => ListItemWhereInputSchema), z.lazy(() => ListItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ListItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ListItemWhereInputSchema), z.lazy(() => ListItemWhereInputSchema).array() ]).optional(),
  addedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  addedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  content: z.union([ z.lazy(() => ContentScalarRelationFilterSchema), z.lazy(() => ContentWhereInputSchema) ]).optional(),
  addedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  requestedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  statusHistory: z.lazy(() => StatusHistoryListRelationFilterSchema).optional(),
}));

export const ListItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.ListItemOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  addedById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ListItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ListItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ListItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ListItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ListItemSumOrderByAggregateInputSchema).optional(),
});

export const ListItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ListItemScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ListItemScalarWhereWithAggregatesInputSchema), z.lazy(() => ListItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ListItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ListItemScalarWhereWithAggregatesInputSchema), z.lazy(() => ListItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  contentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  addedById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  position: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  addedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const StatusHistoryWhereInputSchema: z.ZodType<Prisma.StatusHistoryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StatusHistoryWhereInputSchema), z.lazy(() => StatusHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusHistoryWhereInputSchema), z.lazy(() => StatusHistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  listItemId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  fromStatus: z.union([ z.lazy(() => EnumStatusNullableFilterSchema), z.lazy(() => StatusSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  listItem: z.union([ z.lazy(() => ListItemScalarRelationFilterSchema), z.lazy(() => ListItemWhereInputSchema) ]).optional(),
});

export const StatusHistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.StatusHistoryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  listItemId: z.lazy(() => SortOrderSchema).optional(),
  fromStatus: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  toStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
  listItem: z.lazy(() => ListItemOrderByWithRelationInputSchema).optional(),
});

export const StatusHistoryWhereUniqueInputSchema: z.ZodType<Prisma.StatusHistoryWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => StatusHistoryWhereInputSchema), z.lazy(() => StatusHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusHistoryWhereInputSchema), z.lazy(() => StatusHistoryWhereInputSchema).array() ]).optional(),
  listItemId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  fromStatus: z.union([ z.lazy(() => EnumStatusNullableFilterSchema), z.lazy(() => StatusSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  listItem: z.union([ z.lazy(() => ListItemScalarRelationFilterSchema), z.lazy(() => ListItemWhereInputSchema) ]).optional(),
}));

export const StatusHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.StatusHistoryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  listItemId: z.lazy(() => SortOrderSchema).optional(),
  fromStatus: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  toStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StatusHistoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StatusHistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StatusHistoryMinOrderByAggregateInputSchema).optional(),
});

export const StatusHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StatusHistoryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StatusHistoryScalarWhereWithAggregatesInputSchema), z.lazy(() => StatusHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusHistoryScalarWhereWithAggregatesInputSchema), z.lazy(() => StatusHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  listItemId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  fromStatus: z.union([ z.lazy(() => EnumStatusNullableWithAggregatesFilterSchema), z.lazy(() => StatusSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  addedListItems: z.lazy(() => ListItemCreateNestedManyWithoutAddedByInputSchema).optional(),
  requestedListItems: z.lazy(() => ListItemCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  addedListItems: z.lazy(() => ListItemUncheckedCreateNestedManyWithoutAddedByInputSchema).optional(),
  requestedListItems: z.lazy(() => ListItemUncheckedCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addedListItems: z.lazy(() => ListItemUpdateManyWithoutAddedByNestedInputSchema).optional(),
  requestedListItems: z.lazy(() => ListItemUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addedListItems: z.lazy(() => ListItemUncheckedUpdateManyWithoutAddedByNestedInputSchema).optional(),
  requestedListItems: z.lazy(() => ListItemUncheckedUpdateManyWithoutRequestedByNestedInputSchema).optional(),
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
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  seriesDetails: z.lazy(() => SeriesDetailsCreateNestedOneWithoutContentInputSchema).optional(),
  listItems: z.lazy(() => ListItemCreateNestedOneWithoutContentInputSchema).optional(),
});

export const ContentUncheckedCreateInputSchema: z.ZodType<Prisma.ContentUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  seriesDetails: z.lazy(() => SeriesDetailsUncheckedCreateNestedOneWithoutContentInputSchema).optional(),
  listItems: z.lazy(() => ListItemUncheckedCreateNestedOneWithoutContentInputSchema).optional(),
});

export const ContentUpdateInputSchema: z.ZodType<Prisma.ContentUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  seriesDetails: z.lazy(() => SeriesDetailsUpdateOneWithoutContentNestedInputSchema).optional(),
  listItems: z.lazy(() => ListItemUpdateOneWithoutContentNestedInputSchema).optional(),
});

export const ContentUncheckedUpdateInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  seriesDetails: z.lazy(() => SeriesDetailsUncheckedUpdateOneWithoutContentNestedInputSchema).optional(),
  listItems: z.lazy(() => ListItemUncheckedUpdateOneWithoutContentNestedInputSchema).optional(),
});

export const ContentCreateManyInputSchema: z.ZodType<Prisma.ContentCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ContentUpdateManyMutationInputSchema: z.ZodType<Prisma.ContentUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ContentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SeriesDetailsCreateInputSchema: z.ZodType<Prisma.SeriesDetailsCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  seasonCount: z.number().int().optional().nullable(),
  episodeCount: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  lastAirDate: z.coerce.date().optional().nullable(),
  content: z.lazy(() => ContentCreateNestedOneWithoutSeriesDetailsInputSchema),
});

export const SeriesDetailsUncheckedCreateInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  seasonCount: z.number().int().optional().nullable(),
  episodeCount: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  lastAirDate: z.coerce.date().optional().nullable(),
});

export const SeriesDetailsUpdateInputSchema: z.ZodType<Prisma.SeriesDetailsUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seasonCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  episodeCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastAirDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.lazy(() => ContentUpdateOneRequiredWithoutSeriesDetailsNestedInputSchema).optional(),
});

export const SeriesDetailsUncheckedUpdateInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seasonCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  episodeCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastAirDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SeriesDetailsCreateManyInputSchema: z.ZodType<Prisma.SeriesDetailsCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  seasonCount: z.number().int().optional().nullable(),
  episodeCount: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  lastAirDate: z.coerce.date().optional().nullable(),
});

export const SeriesDetailsUpdateManyMutationInputSchema: z.ZodType<Prisma.SeriesDetailsUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seasonCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  episodeCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastAirDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SeriesDetailsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seasonCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  episodeCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastAirDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ListItemCreateInputSchema: z.ZodType<Prisma.ListItemCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  content: z.lazy(() => ContentCreateNestedOneWithoutListItemsInputSchema),
  addedBy: z.lazy(() => UserCreateNestedOneWithoutAddedListItemsInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestedListItemsInputSchema),
  statusHistory: z.lazy(() => StatusHistoryCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemUncheckedCreateInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  addedById: z.string(),
  requestedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemUpdateInputSchema: z.ZodType<Prisma.ListItemUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.lazy(() => ContentUpdateOneRequiredWithoutListItemsNestedInputSchema).optional(),
  addedBy: z.lazy(() => UserUpdateOneRequiredWithoutAddedListItemsNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestedListItemsNestedInputSchema).optional(),
  statusHistory: z.lazy(() => StatusHistoryUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemCreateManyInputSchema: z.ZodType<Prisma.ListItemCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  addedById: z.string(),
  requestedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
});

export const ListItemUpdateManyMutationInputSchema: z.ZodType<Prisma.ListItemUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ListItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StatusHistoryCreateInputSchema: z.ZodType<Prisma.StatusHistoryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  fromStatus: z.lazy(() => StatusSchema).optional().nullable(),
  toStatus: z.lazy(() => StatusSchema),
  changedAt: z.coerce.date().optional(),
  listItem: z.lazy(() => ListItemCreateNestedOneWithoutStatusHistoryInputSchema),
});

export const StatusHistoryUncheckedCreateInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  listItemId: z.string(),
  fromStatus: z.lazy(() => StatusSchema).optional().nullable(),
  toStatus: z.lazy(() => StatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const StatusHistoryUpdateInputSchema: z.ZodType<Prisma.StatusHistoryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  listItem: z.lazy(() => ListItemUpdateOneRequiredWithoutStatusHistoryNestedInputSchema).optional(),
});

export const StatusHistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  listItemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StatusHistoryCreateManyInputSchema: z.ZodType<Prisma.StatusHistoryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  listItemId: z.string(),
  fromStatus: z.lazy(() => StatusSchema).optional().nullable(),
  toStatus: z.lazy(() => StatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const StatusHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.StatusHistoryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StatusHistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  listItemId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const ListItemListRelationFilterSchema: z.ZodType<Prisma.ListItemListRelationFilter> = z.strictObject({
  every: z.lazy(() => ListItemWhereInputSchema).optional(),
  some: z.lazy(() => ListItemWhereInputSchema).optional(),
  none: z.lazy(() => ListItemWhereInputSchema).optional(),
});

export const ListItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ListItemOrderByRelationAggregateInput> = z.strictObject({
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

export const EnumExternalSourceFilterSchema: z.ZodType<Prisma.EnumExternalSourceFilter> = z.strictObject({
  equals: z.lazy(() => ExternalSourceSchema).optional(),
  in: z.lazy(() => ExternalSourceSchema).array().optional(),
  notIn: z.lazy(() => ExternalSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => NestedEnumExternalSourceFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const EnumContentTypeFilterSchema: z.ZodType<Prisma.EnumContentTypeFilter> = z.strictObject({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => NestedEnumContentTypeFilterSchema) ]).optional(),
});

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.strictObject({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
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

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const SeriesDetailsNullableScalarRelationFilterSchema: z.ZodType<Prisma.SeriesDetailsNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => SeriesDetailsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SeriesDetailsWhereInputSchema).optional().nullable(),
});

export const ListItemNullableScalarRelationFilterSchema: z.ZodType<Prisma.ListItemNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ListItemWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ListItemWhereInputSchema).optional().nullable(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const ContentExternalSourceExternalIdCompoundUniqueInputSchema: z.ZodType<Prisma.ContentExternalSourceExternalIdCompoundUniqueInput> = z.strictObject({
  externalSource: z.lazy(() => ExternalSourceSchema),
  externalId: z.string(),
});

export const ContentCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContentCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  externalSource: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  originalTitle: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  overview: z.lazy(() => SortOrderSchema).optional(),
  tagline: z.lazy(() => SortOrderSchema).optional(),
  genres: z.lazy(() => SortOrderSchema).optional(),
  originalLanguage: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.lazy(() => SortOrderSchema).optional(),
  posterPath: z.lazy(() => SortOrderSchema).optional(),
  backdropPath: z.lazy(() => SortOrderSchema).optional(),
  imdbId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContentAvgOrderByAggregateInput> = z.strictObject({
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContentMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  externalSource: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  originalTitle: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  overview: z.lazy(() => SortOrderSchema).optional(),
  tagline: z.lazy(() => SortOrderSchema).optional(),
  originalLanguage: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.lazy(() => SortOrderSchema).optional(),
  posterPath: z.lazy(() => SortOrderSchema).optional(),
  backdropPath: z.lazy(() => SortOrderSchema).optional(),
  imdbId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContentMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  externalSource: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  originalTitle: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  overview: z.lazy(() => SortOrderSchema).optional(),
  tagline: z.lazy(() => SortOrderSchema).optional(),
  originalLanguage: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.lazy(() => SortOrderSchema).optional(),
  posterPath: z.lazy(() => SortOrderSchema).optional(),
  backdropPath: z.lazy(() => SortOrderSchema).optional(),
  imdbId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ContentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContentSumOrderByAggregateInput> = z.strictObject({
  year: z.lazy(() => SortOrderSchema).optional(),
  runtime: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumExternalSourceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumExternalSourceWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => ExternalSourceSchema).optional(),
  in: z.lazy(() => ExternalSourceSchema).array().optional(),
  notIn: z.lazy(() => ExternalSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => NestedEnumExternalSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumExternalSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumExternalSourceFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const EnumContentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumContentTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => NestedEnumContentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContentTypeFilterSchema).optional(),
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

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const ContentScalarRelationFilterSchema: z.ZodType<Prisma.ContentScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ContentWhereInputSchema).optional(),
  isNot: z.lazy(() => ContentWhereInputSchema).optional(),
});

export const SeriesDetailsCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeriesDetailsCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  seasonCount: z.lazy(() => SortOrderSchema).optional(),
  episodeCount: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastAirDate: z.lazy(() => SortOrderSchema).optional(),
});

export const SeriesDetailsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SeriesDetailsAvgOrderByAggregateInput> = z.strictObject({
  seasonCount: z.lazy(() => SortOrderSchema).optional(),
  episodeCount: z.lazy(() => SortOrderSchema).optional(),
});

export const SeriesDetailsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeriesDetailsMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  seasonCount: z.lazy(() => SortOrderSchema).optional(),
  episodeCount: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastAirDate: z.lazy(() => SortOrderSchema).optional(),
});

export const SeriesDetailsMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeriesDetailsMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  seasonCount: z.lazy(() => SortOrderSchema).optional(),
  episodeCount: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastAirDate: z.lazy(() => SortOrderSchema).optional(),
});

export const SeriesDetailsSumOrderByAggregateInputSchema: z.ZodType<Prisma.SeriesDetailsSumOrderByAggregateInput> = z.strictObject({
  seasonCount: z.lazy(() => SortOrderSchema).optional(),
  episodeCount: z.lazy(() => SortOrderSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
});

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const StatusHistoryListRelationFilterSchema: z.ZodType<Prisma.StatusHistoryListRelationFilter> = z.strictObject({
  every: z.lazy(() => StatusHistoryWhereInputSchema).optional(),
  some: z.lazy(() => StatusHistoryWhereInputSchema).optional(),
  none: z.lazy(() => StatusHistoryWhereInputSchema).optional(),
});

export const StatusHistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StatusHistoryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ListItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.ListItemCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  addedById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ListItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ListItemAvgOrderByAggregateInput> = z.strictObject({
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
});

export const ListItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ListItemMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  addedById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ListItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.ListItemMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  contentId: z.lazy(() => SortOrderSchema).optional(),
  addedById: z.lazy(() => SortOrderSchema).optional(),
  requestedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  addedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ListItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.ListItemSumOrderByAggregateInput> = z.strictObject({
  position: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
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

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
});

export const EnumStatusNullableFilterSchema: z.ZodType<Prisma.EnumStatusNullableFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional().nullable(),
  in: z.lazy(() => StatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusNullableFilterSchema) ]).optional().nullable(),
});

export const ListItemScalarRelationFilterSchema: z.ZodType<Prisma.ListItemScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ListItemWhereInputSchema).optional(),
  isNot: z.lazy(() => ListItemWhereInputSchema).optional(),
});

export const StatusHistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.StatusHistoryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  listItemId: z.lazy(() => SortOrderSchema).optional(),
  fromStatus: z.lazy(() => SortOrderSchema).optional(),
  toStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StatusHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StatusHistoryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  listItemId: z.lazy(() => SortOrderSchema).optional(),
  fromStatus: z.lazy(() => SortOrderSchema).optional(),
  toStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StatusHistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.StatusHistoryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  listItemId: z.lazy(() => SortOrderSchema).optional(),
  fromStatus: z.lazy(() => SortOrderSchema).optional(),
  toStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusNullableWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional().nullable(),
  in: z.lazy(() => StatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusNullableFilterSchema).optional(),
});

export const ListItemCreateNestedManyWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemCreateNestedManyWithoutAddedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutAddedByInputSchema), z.lazy(() => ListItemCreateWithoutAddedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyAddedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
});

export const ListItemCreateNestedManyWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemCreateNestedManyWithoutRequestedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyRequestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
});

export const ListItemUncheckedCreateNestedManyWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateNestedManyWithoutAddedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutAddedByInputSchema), z.lazy(() => ListItemCreateWithoutAddedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyAddedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
});

export const ListItemUncheckedCreateNestedManyWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateNestedManyWithoutRequestedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyRequestedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const ListItemUpdateManyWithoutAddedByNestedInputSchema: z.ZodType<Prisma.ListItemUpdateManyWithoutAddedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutAddedByInputSchema), z.lazy(() => ListItemCreateWithoutAddedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ListItemUpsertWithWhereUniqueWithoutAddedByInputSchema), z.lazy(() => ListItemUpsertWithWhereUniqueWithoutAddedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyAddedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateWithWhereUniqueWithoutAddedByInputSchema), z.lazy(() => ListItemUpdateWithWhereUniqueWithoutAddedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ListItemUpdateManyWithWhereWithoutAddedByInputSchema), z.lazy(() => ListItemUpdateManyWithWhereWithoutAddedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ListItemScalarWhereInputSchema), z.lazy(() => ListItemScalarWhereInputSchema).array() ]).optional(),
});

export const ListItemUpdateManyWithoutRequestedByNestedInputSchema: z.ZodType<Prisma.ListItemUpdateManyWithoutRequestedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ListItemUpsertWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ListItemUpsertWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyRequestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ListItemUpdateWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ListItemUpdateManyWithWhereWithoutRequestedByInputSchema), z.lazy(() => ListItemUpdateManyWithWhereWithoutRequestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ListItemScalarWhereInputSchema), z.lazy(() => ListItemScalarWhereInputSchema).array() ]).optional(),
});

export const ListItemUncheckedUpdateManyWithoutAddedByNestedInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateManyWithoutAddedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutAddedByInputSchema), z.lazy(() => ListItemCreateWithoutAddedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutAddedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ListItemUpsertWithWhereUniqueWithoutAddedByInputSchema), z.lazy(() => ListItemUpsertWithWhereUniqueWithoutAddedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyAddedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateWithWhereUniqueWithoutAddedByInputSchema), z.lazy(() => ListItemUpdateWithWhereUniqueWithoutAddedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ListItemUpdateManyWithWhereWithoutAddedByInputSchema), z.lazy(() => ListItemUpdateManyWithWhereWithoutAddedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ListItemScalarWhereInputSchema), z.lazy(() => ListItemScalarWhereInputSchema).array() ]).optional(),
});

export const ListItemUncheckedUpdateManyWithoutRequestedByNestedInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateManyWithoutRequestedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateWithoutRequestedByInputSchema).array(), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema), z.lazy(() => ListItemCreateOrConnectWithoutRequestedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ListItemUpsertWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ListItemUpsertWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ListItemCreateManyRequestedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ListItemWhereUniqueInputSchema), z.lazy(() => ListItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateWithWhereUniqueWithoutRequestedByInputSchema), z.lazy(() => ListItemUpdateWithWhereUniqueWithoutRequestedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ListItemUpdateManyWithWhereWithoutRequestedByInputSchema), z.lazy(() => ListItemUpdateManyWithWhereWithoutRequestedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ListItemScalarWhereInputSchema), z.lazy(() => ListItemScalarWhereInputSchema).array() ]).optional(),
});

export const ContentCreategenresInputSchema: z.ZodType<Prisma.ContentCreategenresInput> = z.strictObject({
  set: z.string().array(),
});

export const SeriesDetailsCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsCreateNestedOneWithoutContentInput> = z.strictObject({
  create: z.union([ z.lazy(() => SeriesDetailsCreateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeriesDetailsCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => SeriesDetailsWhereUniqueInputSchema).optional(),
});

export const ListItemCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.ListItemCreateNestedOneWithoutContentInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListItemCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => ListItemWhereUniqueInputSchema).optional(),
});

export const SeriesDetailsUncheckedCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedCreateNestedOneWithoutContentInput> = z.strictObject({
  create: z.union([ z.lazy(() => SeriesDetailsCreateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeriesDetailsCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => SeriesDetailsWhereUniqueInputSchema).optional(),
});

export const ListItemUncheckedCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateNestedOneWithoutContentInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListItemCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => ListItemWhereUniqueInputSchema).optional(),
});

export const EnumExternalSourceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumExternalSourceFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => ExternalSourceSchema).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const EnumContentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumContentTypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => ContentTypeSchema).optional(),
});

export const ContentUpdategenresInputSchema: z.ZodType<Prisma.ContentUpdategenresInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const SeriesDetailsUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.SeriesDetailsUpdateOneWithoutContentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SeriesDetailsCreateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeriesDetailsCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => SeriesDetailsUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SeriesDetailsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SeriesDetailsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SeriesDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeriesDetailsUpdateToOneWithWhereWithoutContentInputSchema), z.lazy(() => SeriesDetailsUpdateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedUpdateWithoutContentInputSchema) ]).optional(),
});

export const ListItemUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.ListItemUpdateOneWithoutContentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListItemCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => ListItemUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ListItemWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ListItemWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ListItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateToOneWithWhereWithoutContentInputSchema), z.lazy(() => ListItemUpdateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutContentInputSchema) ]).optional(),
});

export const SeriesDetailsUncheckedUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedUpdateOneWithoutContentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SeriesDetailsCreateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeriesDetailsCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => SeriesDetailsUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SeriesDetailsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SeriesDetailsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SeriesDetailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeriesDetailsUpdateToOneWithWhereWithoutContentInputSchema), z.lazy(() => SeriesDetailsUpdateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedUpdateWithoutContentInputSchema) ]).optional(),
});

export const ListItemUncheckedUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateOneWithoutContentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListItemCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => ListItemUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ListItemWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ListItemWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ListItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateToOneWithWhereWithoutContentInputSchema), z.lazy(() => ListItemUpdateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutContentInputSchema) ]).optional(),
});

export const ContentCreateNestedOneWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentCreateNestedOneWithoutSeriesDetailsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutSeriesDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContentCreateOrConnectWithoutSeriesDetailsInputSchema).optional(),
  connect: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const ContentUpdateOneRequiredWithoutSeriesDetailsNestedInputSchema: z.ZodType<Prisma.ContentUpdateOneRequiredWithoutSeriesDetailsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutSeriesDetailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContentCreateOrConnectWithoutSeriesDetailsInputSchema).optional(),
  upsert: z.lazy(() => ContentUpsertWithoutSeriesDetailsInputSchema).optional(),
  connect: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContentUpdateToOneWithWhereWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUpdateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutSeriesDetailsInputSchema) ]).optional(),
});

export const ContentCreateNestedOneWithoutListItemsInputSchema: z.ZodType<Prisma.ContentCreateNestedOneWithoutListItemsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutListItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContentCreateOrConnectWithoutListItemsInputSchema).optional(),
  connect: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAddedListItemsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddedListItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddedListItemsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRequestedListItemsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedListItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestedListItemsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const StatusHistoryCreateNestedManyWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryCreateNestedManyWithoutListItemInput> = z.strictObject({
  create: z.union([ z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema).array(), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StatusHistoryCreateManyListItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
});

export const StatusHistoryUncheckedCreateNestedManyWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedCreateNestedManyWithoutListItemInput> = z.strictObject({
  create: z.union([ z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema).array(), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StatusHistoryCreateManyListItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => StatusSchema).optional(),
});

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const ContentUpdateOneRequiredWithoutListItemsNestedInputSchema: z.ZodType<Prisma.ContentUpdateOneRequiredWithoutListItemsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ContentCreateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutListItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContentCreateOrConnectWithoutListItemsInputSchema).optional(),
  upsert: z.lazy(() => ContentUpsertWithoutListItemsInputSchema).optional(),
  connect: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContentUpdateToOneWithWhereWithoutListItemsInputSchema), z.lazy(() => ContentUpdateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutListItemsInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutAddedListItemsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddedListItemsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddedListItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddedListItemsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAddedListItemsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAddedListItemsInputSchema), z.lazy(() => UserUpdateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAddedListItemsInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutRequestedListItemsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRequestedListItemsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedListItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestedListItemsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRequestedListItemsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRequestedListItemsInputSchema), z.lazy(() => UserUpdateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRequestedListItemsInputSchema) ]).optional(),
});

export const StatusHistoryUpdateManyWithoutListItemNestedInputSchema: z.ZodType<Prisma.StatusHistoryUpdateManyWithoutListItemNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema).array(), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StatusHistoryUpsertWithWhereUniqueWithoutListItemInputSchema), z.lazy(() => StatusHistoryUpsertWithWhereUniqueWithoutListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StatusHistoryCreateManyListItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StatusHistoryUpdateWithWhereUniqueWithoutListItemInputSchema), z.lazy(() => StatusHistoryUpdateWithWhereUniqueWithoutListItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StatusHistoryUpdateManyWithWhereWithoutListItemInputSchema), z.lazy(() => StatusHistoryUpdateManyWithWhereWithoutListItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StatusHistoryScalarWhereInputSchema), z.lazy(() => StatusHistoryScalarWhereInputSchema).array() ]).optional(),
});

export const StatusHistoryUncheckedUpdateManyWithoutListItemNestedInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedUpdateManyWithoutListItemNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema).array(), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema), z.lazy(() => StatusHistoryCreateOrConnectWithoutListItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StatusHistoryUpsertWithWhereUniqueWithoutListItemInputSchema), z.lazy(() => StatusHistoryUpsertWithWhereUniqueWithoutListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StatusHistoryCreateManyListItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StatusHistoryWhereUniqueInputSchema), z.lazy(() => StatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StatusHistoryUpdateWithWhereUniqueWithoutListItemInputSchema), z.lazy(() => StatusHistoryUpdateWithWhereUniqueWithoutListItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StatusHistoryUpdateManyWithWhereWithoutListItemInputSchema), z.lazy(() => StatusHistoryUpdateManyWithWhereWithoutListItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StatusHistoryScalarWhereInputSchema), z.lazy(() => StatusHistoryScalarWhereInputSchema).array() ]).optional(),
});

export const ListItemCreateNestedOneWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemCreateNestedOneWithoutStatusHistoryInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutStatusHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListItemCreateOrConnectWithoutStatusHistoryInputSchema).optional(),
  connect: z.lazy(() => ListItemWhereUniqueInputSchema).optional(),
});

export const NullableEnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => StatusSchema).optional().nullable(),
});

export const ListItemUpdateOneRequiredWithoutStatusHistoryNestedInputSchema: z.ZodType<Prisma.ListItemUpdateOneRequiredWithoutStatusHistoryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ListItemCreateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutStatusHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListItemCreateOrConnectWithoutStatusHistoryInputSchema).optional(),
  upsert: z.lazy(() => ListItemUpsertWithoutStatusHistoryInputSchema).optional(),
  connect: z.lazy(() => ListItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ListItemUpdateToOneWithWhereWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUpdateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutStatusHistoryInputSchema) ]).optional(),
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

export const NestedEnumExternalSourceFilterSchema: z.ZodType<Prisma.NestedEnumExternalSourceFilter> = z.strictObject({
  equals: z.lazy(() => ExternalSourceSchema).optional(),
  in: z.lazy(() => ExternalSourceSchema).array().optional(),
  notIn: z.lazy(() => ExternalSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => NestedEnumExternalSourceFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumContentTypeFilterSchema: z.ZodType<Prisma.NestedEnumContentTypeFilter> = z.strictObject({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => NestedEnumContentTypeFilterSchema) ]).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumExternalSourceWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumExternalSourceWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => ExternalSourceSchema).optional(),
  in: z.lazy(() => ExternalSourceSchema).array().optional(),
  notIn: z.lazy(() => ExternalSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => NestedEnumExternalSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumExternalSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumExternalSourceFilterSchema).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedEnumContentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumContentTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => NestedEnumContentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContentTypeFilterSchema).optional(),
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

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
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

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
});

export const NestedEnumStatusNullableFilterSchema: z.ZodType<Prisma.NestedEnumStatusNullableFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional().nullable(),
  in: z.lazy(() => StatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusNullableWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => StatusSchema).optional().nullable(),
  in: z.lazy(() => StatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => StatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NestedEnumStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusNullableFilterSchema).optional(),
});

export const ListItemCreateWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemCreateWithoutAddedByInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  content: z.lazy(() => ContentCreateNestedOneWithoutListItemsInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestedListItemsInputSchema),
  statusHistory: z.lazy(() => StatusHistoryCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemUncheckedCreateWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateWithoutAddedByInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  requestedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemCreateOrConnectWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemCreateOrConnectWithoutAddedByInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ListItemCreateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema) ]),
});

export const ListItemCreateManyAddedByInputEnvelopeSchema: z.ZodType<Prisma.ListItemCreateManyAddedByInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ListItemCreateManyAddedByInputSchema), z.lazy(() => ListItemCreateManyAddedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ListItemCreateWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemCreateWithoutRequestedByInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  content: z.lazy(() => ContentCreateNestedOneWithoutListItemsInputSchema),
  addedBy: z.lazy(() => UserCreateNestedOneWithoutAddedListItemsInputSchema),
  statusHistory: z.lazy(() => StatusHistoryCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemUncheckedCreateWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateWithoutRequestedByInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  addedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemCreateOrConnectWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemCreateOrConnectWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ListItemCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema) ]),
});

export const ListItemCreateManyRequestedByInputEnvelopeSchema: z.ZodType<Prisma.ListItemCreateManyRequestedByInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ListItemCreateManyRequestedByInputSchema), z.lazy(() => ListItemCreateManyRequestedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ListItemUpsertWithWhereUniqueWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUpsertWithWhereUniqueWithoutAddedByInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ListItemUpdateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutAddedByInputSchema) ]),
  create: z.union([ z.lazy(() => ListItemCreateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutAddedByInputSchema) ]),
});

export const ListItemUpdateWithWhereUniqueWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUpdateWithWhereUniqueWithoutAddedByInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ListItemUpdateWithoutAddedByInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutAddedByInputSchema) ]),
});

export const ListItemUpdateManyWithWhereWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUpdateManyWithWhereWithoutAddedByInput> = z.strictObject({
  where: z.lazy(() => ListItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ListItemUpdateManyMutationInputSchema), z.lazy(() => ListItemUncheckedUpdateManyWithoutAddedByInputSchema) ]),
});

export const ListItemScalarWhereInputSchema: z.ZodType<Prisma.ListItemScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ListItemScalarWhereInputSchema), z.lazy(() => ListItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ListItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ListItemScalarWhereInputSchema), z.lazy(() => ListItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  contentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  addedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requestedById: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  position: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  addedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const ListItemUpsertWithWhereUniqueWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUpsertWithWhereUniqueWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ListItemUpdateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutRequestedByInputSchema) ]),
  create: z.union([ z.lazy(() => ListItemCreateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutRequestedByInputSchema) ]),
});

export const ListItemUpdateWithWhereUniqueWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUpdateWithWhereUniqueWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ListItemUpdateWithoutRequestedByInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutRequestedByInputSchema) ]),
});

export const ListItemUpdateManyWithWhereWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUpdateManyWithWhereWithoutRequestedByInput> = z.strictObject({
  where: z.lazy(() => ListItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ListItemUpdateManyMutationInputSchema), z.lazy(() => ListItemUncheckedUpdateManyWithoutRequestedByInputSchema) ]),
});

export const SeriesDetailsCreateWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsCreateWithoutContentInput> = z.strictObject({
  id: z.uuid().optional(),
  seasonCount: z.number().int().optional().nullable(),
  episodeCount: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  lastAirDate: z.coerce.date().optional().nullable(),
});

export const SeriesDetailsUncheckedCreateWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedCreateWithoutContentInput> = z.strictObject({
  id: z.uuid().optional(),
  seasonCount: z.number().int().optional().nullable(),
  episodeCount: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  lastAirDate: z.coerce.date().optional().nullable(),
});

export const SeriesDetailsCreateOrConnectWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsCreateOrConnectWithoutContentInput> = z.strictObject({
  where: z.lazy(() => SeriesDetailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeriesDetailsCreateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedCreateWithoutContentInputSchema) ]),
});

export const ListItemCreateWithoutContentInputSchema: z.ZodType<Prisma.ListItemCreateWithoutContentInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  addedBy: z.lazy(() => UserCreateNestedOneWithoutAddedListItemsInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestedListItemsInputSchema),
  statusHistory: z.lazy(() => StatusHistoryCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemUncheckedCreateWithoutContentInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateWithoutContentInput> = z.strictObject({
  id: z.uuid().optional(),
  addedById: z.string(),
  requestedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedCreateNestedManyWithoutListItemInputSchema).optional(),
});

export const ListItemCreateOrConnectWithoutContentInputSchema: z.ZodType<Prisma.ListItemCreateOrConnectWithoutContentInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ListItemCreateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutContentInputSchema) ]),
});

export const SeriesDetailsUpsertWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsUpsertWithoutContentInput> = z.strictObject({
  update: z.union([ z.lazy(() => SeriesDetailsUpdateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedUpdateWithoutContentInputSchema) ]),
  create: z.union([ z.lazy(() => SeriesDetailsCreateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedCreateWithoutContentInputSchema) ]),
  where: z.lazy(() => SeriesDetailsWhereInputSchema).optional(),
});

export const SeriesDetailsUpdateToOneWithWhereWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsUpdateToOneWithWhereWithoutContentInput> = z.strictObject({
  where: z.lazy(() => SeriesDetailsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SeriesDetailsUpdateWithoutContentInputSchema), z.lazy(() => SeriesDetailsUncheckedUpdateWithoutContentInputSchema) ]),
});

export const SeriesDetailsUpdateWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsUpdateWithoutContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seasonCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  episodeCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastAirDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SeriesDetailsUncheckedUpdateWithoutContentInputSchema: z.ZodType<Prisma.SeriesDetailsUncheckedUpdateWithoutContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seasonCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  episodeCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastAirDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ListItemUpsertWithoutContentInputSchema: z.ZodType<Prisma.ListItemUpsertWithoutContentInput> = z.strictObject({
  update: z.union([ z.lazy(() => ListItemUpdateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutContentInputSchema) ]),
  create: z.union([ z.lazy(() => ListItemCreateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutContentInputSchema) ]),
  where: z.lazy(() => ListItemWhereInputSchema).optional(),
});

export const ListItemUpdateToOneWithWhereWithoutContentInputSchema: z.ZodType<Prisma.ListItemUpdateToOneWithWhereWithoutContentInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ListItemUpdateWithoutContentInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutContentInputSchema) ]),
});

export const ListItemUpdateWithoutContentInputSchema: z.ZodType<Prisma.ListItemUpdateWithoutContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addedBy: z.lazy(() => UserUpdateOneRequiredWithoutAddedListItemsNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestedListItemsNestedInputSchema).optional(),
  statusHistory: z.lazy(() => StatusHistoryUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateWithoutContentInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateWithoutContentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ContentCreateWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentCreateWithoutSeriesDetailsInput> = z.strictObject({
  id: z.uuid().optional(),
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  listItems: z.lazy(() => ListItemCreateNestedOneWithoutContentInputSchema).optional(),
});

export const ContentUncheckedCreateWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutSeriesDetailsInput> = z.strictObject({
  id: z.uuid().optional(),
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  listItems: z.lazy(() => ListItemUncheckedCreateNestedOneWithoutContentInputSchema).optional(),
});

export const ContentCreateOrConnectWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutSeriesDetailsInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutSeriesDetailsInputSchema) ]),
});

export const ContentUpsertWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentUpsertWithoutSeriesDetailsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ContentUpdateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutSeriesDetailsInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutSeriesDetailsInputSchema) ]),
  where: z.lazy(() => ContentWhereInputSchema).optional(),
});

export const ContentUpdateToOneWithWhereWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentUpdateToOneWithWhereWithoutSeriesDetailsInput> = z.strictObject({
  where: z.lazy(() => ContentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ContentUpdateWithoutSeriesDetailsInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutSeriesDetailsInputSchema) ]),
});

export const ContentUpdateWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentUpdateWithoutSeriesDetailsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  listItems: z.lazy(() => ListItemUpdateOneWithoutContentNestedInputSchema).optional(),
});

export const ContentUncheckedUpdateWithoutSeriesDetailsInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateWithoutSeriesDetailsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  listItems: z.lazy(() => ListItemUncheckedUpdateOneWithoutContentNestedInputSchema).optional(),
});

export const ContentCreateWithoutListItemsInputSchema: z.ZodType<Prisma.ContentCreateWithoutListItemsInput> = z.strictObject({
  id: z.uuid().optional(),
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  seriesDetails: z.lazy(() => SeriesDetailsCreateNestedOneWithoutContentInputSchema).optional(),
});

export const ContentUncheckedCreateWithoutListItemsInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutListItemsInput> = z.strictObject({
  id: z.uuid().optional(),
  externalId: z.string(),
  externalSource: z.lazy(() => ExternalSourceSchema).optional(),
  title: z.string(),
  originalTitle: z.string().optional().nullable(),
  type: z.lazy(() => ContentTypeSchema),
  overview: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  genres: z.union([ z.lazy(() => ContentCreategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.string().optional().nullable(),
  releaseDate: z.string().optional().nullable(),
  year: z.number().int(),
  runtime: z.number().int().optional().nullable(),
  posterPath: z.string().optional().nullable(),
  backdropPath: z.string().optional().nullable(),
  imdbId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  seriesDetails: z.lazy(() => SeriesDetailsUncheckedCreateNestedOneWithoutContentInputSchema).optional(),
});

export const ContentCreateOrConnectWithoutListItemsInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutListItemsInput> = z.strictObject({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutListItemsInputSchema) ]),
});

export const UserCreateWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserCreateWithoutAddedListItemsInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  requestedListItems: z.lazy(() => ListItemCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAddedListItemsInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  requestedListItems: z.lazy(() => ListItemUncheckedCreateNestedManyWithoutRequestedByInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAddedListItemsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddedListItemsInputSchema) ]),
});

export const UserCreateWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserCreateWithoutRequestedListItemsInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  addedListItems: z.lazy(() => ListItemCreateNestedManyWithoutAddedByInputSchema).optional(),
});

export const UserUncheckedCreateWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRequestedListItemsInput> = z.strictObject({
  id: z.uuid().optional(),
  username: z.string(),
  passwordHash: z.string(),
  displayName: z.string(),
  createdAt: z.coerce.date().optional(),
  addedListItems: z.lazy(() => ListItemUncheckedCreateNestedManyWithoutAddedByInputSchema).optional(),
});

export const UserCreateOrConnectWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRequestedListItemsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedListItemsInputSchema) ]),
});

export const StatusHistoryCreateWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryCreateWithoutListItemInput> = z.strictObject({
  id: z.uuid().optional(),
  fromStatus: z.lazy(() => StatusSchema).optional().nullable(),
  toStatus: z.lazy(() => StatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const StatusHistoryUncheckedCreateWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedCreateWithoutListItemInput> = z.strictObject({
  id: z.uuid().optional(),
  fromStatus: z.lazy(() => StatusSchema).optional().nullable(),
  toStatus: z.lazy(() => StatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const StatusHistoryCreateOrConnectWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryCreateOrConnectWithoutListItemInput> = z.strictObject({
  where: z.lazy(() => StatusHistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema) ]),
});

export const StatusHistoryCreateManyListItemInputEnvelopeSchema: z.ZodType<Prisma.StatusHistoryCreateManyListItemInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => StatusHistoryCreateManyListItemInputSchema), z.lazy(() => StatusHistoryCreateManyListItemInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ContentUpsertWithoutListItemsInputSchema: z.ZodType<Prisma.ContentUpsertWithoutListItemsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ContentUpdateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutListItemsInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedCreateWithoutListItemsInputSchema) ]),
  where: z.lazy(() => ContentWhereInputSchema).optional(),
});

export const ContentUpdateToOneWithWhereWithoutListItemsInputSchema: z.ZodType<Prisma.ContentUpdateToOneWithWhereWithoutListItemsInput> = z.strictObject({
  where: z.lazy(() => ContentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ContentUpdateWithoutListItemsInputSchema), z.lazy(() => ContentUncheckedUpdateWithoutListItemsInputSchema) ]),
});

export const ContentUpdateWithoutListItemsInputSchema: z.ZodType<Prisma.ContentUpdateWithoutListItemsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  seriesDetails: z.lazy(() => SeriesDetailsUpdateOneWithoutContentNestedInputSchema).optional(),
});

export const ContentUncheckedUpdateWithoutListItemsInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateWithoutListItemsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalSource: z.union([ z.lazy(() => ExternalSourceSchema), z.lazy(() => EnumExternalSourceFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalTitle: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => ContentTypeSchema), z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tagline: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genres: z.union([ z.lazy(() => ContentUpdategenresInputSchema), z.string().array() ]).optional(),
  originalLanguage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  runtime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posterPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backdropPath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imdbId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  seriesDetails: z.lazy(() => SeriesDetailsUncheckedUpdateOneWithoutContentNestedInputSchema).optional(),
});

export const UserUpsertWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAddedListItemsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAddedListItemsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddedListItemsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAddedListItemsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAddedListItemsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAddedListItemsInputSchema) ]),
});

export const UserUpdateWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAddedListItemsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedListItems: z.lazy(() => ListItemUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAddedListItemsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAddedListItemsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  requestedListItems: z.lazy(() => ListItemUncheckedUpdateManyWithoutRequestedByNestedInputSchema).optional(),
});

export const UserUpsertWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserUpsertWithoutRequestedListItemsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRequestedListItemsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedCreateWithoutRequestedListItemsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRequestedListItemsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRequestedListItemsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRequestedListItemsInputSchema) ]),
});

export const UserUpdateWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRequestedListItemsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addedListItems: z.lazy(() => ListItemUpdateManyWithoutAddedByNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutRequestedListItemsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRequestedListItemsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addedListItems: z.lazy(() => ListItemUncheckedUpdateManyWithoutAddedByNestedInputSchema).optional(),
});

export const StatusHistoryUpsertWithWhereUniqueWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUpsertWithWhereUniqueWithoutListItemInput> = z.strictObject({
  where: z.lazy(() => StatusHistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StatusHistoryUpdateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedUpdateWithoutListItemInputSchema) ]),
  create: z.union([ z.lazy(() => StatusHistoryCreateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedCreateWithoutListItemInputSchema) ]),
});

export const StatusHistoryUpdateWithWhereUniqueWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUpdateWithWhereUniqueWithoutListItemInput> = z.strictObject({
  where: z.lazy(() => StatusHistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StatusHistoryUpdateWithoutListItemInputSchema), z.lazy(() => StatusHistoryUncheckedUpdateWithoutListItemInputSchema) ]),
});

export const StatusHistoryUpdateManyWithWhereWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUpdateManyWithWhereWithoutListItemInput> = z.strictObject({
  where: z.lazy(() => StatusHistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StatusHistoryUpdateManyMutationInputSchema), z.lazy(() => StatusHistoryUncheckedUpdateManyWithoutListItemInputSchema) ]),
});

export const StatusHistoryScalarWhereInputSchema: z.ZodType<Prisma.StatusHistoryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StatusHistoryScalarWhereInputSchema), z.lazy(() => StatusHistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusHistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusHistoryScalarWhereInputSchema), z.lazy(() => StatusHistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  listItemId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  fromStatus: z.union([ z.lazy(() => EnumStatusNullableFilterSchema), z.lazy(() => StatusSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => EnumStatusFilterSchema), z.lazy(() => StatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const ListItemCreateWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemCreateWithoutStatusHistoryInput> = z.strictObject({
  id: z.uuid().optional(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
  content: z.lazy(() => ContentCreateNestedOneWithoutListItemsInputSchema),
  addedBy: z.lazy(() => UserCreateNestedOneWithoutAddedListItemsInputSchema),
  requestedBy: z.lazy(() => UserCreateNestedOneWithoutRequestedListItemsInputSchema),
});

export const ListItemUncheckedCreateWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemUncheckedCreateWithoutStatusHistoryInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  addedById: z.string(),
  requestedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
});

export const ListItemCreateOrConnectWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemCreateOrConnectWithoutStatusHistoryInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ListItemCreateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutStatusHistoryInputSchema) ]),
});

export const ListItemUpsertWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemUpsertWithoutStatusHistoryInput> = z.strictObject({
  update: z.union([ z.lazy(() => ListItemUpdateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutStatusHistoryInputSchema) ]),
  create: z.union([ z.lazy(() => ListItemCreateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedCreateWithoutStatusHistoryInputSchema) ]),
  where: z.lazy(() => ListItemWhereInputSchema).optional(),
});

export const ListItemUpdateToOneWithWhereWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemUpdateToOneWithWhereWithoutStatusHistoryInput> = z.strictObject({
  where: z.lazy(() => ListItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ListItemUpdateWithoutStatusHistoryInputSchema), z.lazy(() => ListItemUncheckedUpdateWithoutStatusHistoryInputSchema) ]),
});

export const ListItemUpdateWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemUpdateWithoutStatusHistoryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.lazy(() => ContentUpdateOneRequiredWithoutListItemsNestedInputSchema).optional(),
  addedBy: z.lazy(() => UserUpdateOneRequiredWithoutAddedListItemsNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestedListItemsNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateWithoutStatusHistoryInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateWithoutStatusHistoryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ListItemCreateManyAddedByInputSchema: z.ZodType<Prisma.ListItemCreateManyAddedByInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  requestedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
});

export const ListItemCreateManyRequestedByInputSchema: z.ZodType<Prisma.ListItemCreateManyRequestedByInput> = z.strictObject({
  id: z.uuid().optional(),
  contentId: z.string(),
  addedById: z.string(),
  status: z.lazy(() => StatusSchema).optional(),
  position: z.number(),
  rating: z.number().optional().nullable(),
  addedAt: z.coerce.date().optional(),
});

export const ListItemUpdateWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUpdateWithoutAddedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.lazy(() => ContentUpdateOneRequiredWithoutListItemsNestedInputSchema).optional(),
  requestedBy: z.lazy(() => UserUpdateOneRequiredWithoutRequestedListItemsNestedInputSchema).optional(),
  statusHistory: z.lazy(() => StatusHistoryUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateWithoutAddedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateManyWithoutAddedByInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateManyWithoutAddedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requestedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ListItemUpdateWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUpdateWithoutRequestedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.lazy(() => ContentUpdateOneRequiredWithoutListItemsNestedInputSchema).optional(),
  addedBy: z.lazy(() => UserUpdateOneRequiredWithoutAddedListItemsNestedInputSchema).optional(),
  statusHistory: z.lazy(() => StatusHistoryUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateWithoutRequestedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  statusHistory: z.lazy(() => StatusHistoryUncheckedUpdateManyWithoutListItemNestedInputSchema).optional(),
});

export const ListItemUncheckedUpdateManyWithoutRequestedByInputSchema: z.ZodType<Prisma.ListItemUncheckedUpdateManyWithoutRequestedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StatusHistoryCreateManyListItemInputSchema: z.ZodType<Prisma.StatusHistoryCreateManyListItemInput> = z.strictObject({
  id: z.uuid().optional(),
  fromStatus: z.lazy(() => StatusSchema).optional().nullable(),
  toStatus: z.lazy(() => StatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const StatusHistoryUpdateWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUpdateWithoutListItemInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StatusHistoryUncheckedUpdateWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedUpdateWithoutListItemInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StatusHistoryUncheckedUpdateManyWithoutListItemInputSchema: z.ZodType<Prisma.StatusHistoryUncheckedUpdateManyWithoutListItemInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => NullableEnumStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toStatus: z.union([ z.lazy(() => StatusSchema), z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SeriesDetailsFindFirstArgsSchema: z.ZodType<Prisma.SeriesDetailsFindFirstArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereInputSchema.optional(), 
  orderBy: z.union([ SeriesDetailsOrderByWithRelationInputSchema.array(), SeriesDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SeriesDetailsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SeriesDetailsScalarFieldEnumSchema, SeriesDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SeriesDetailsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeriesDetailsFindFirstOrThrowArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereInputSchema.optional(), 
  orderBy: z.union([ SeriesDetailsOrderByWithRelationInputSchema.array(), SeriesDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SeriesDetailsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SeriesDetailsScalarFieldEnumSchema, SeriesDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SeriesDetailsFindManyArgsSchema: z.ZodType<Prisma.SeriesDetailsFindManyArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereInputSchema.optional(), 
  orderBy: z.union([ SeriesDetailsOrderByWithRelationInputSchema.array(), SeriesDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SeriesDetailsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SeriesDetailsScalarFieldEnumSchema, SeriesDetailsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SeriesDetailsAggregateArgsSchema: z.ZodType<Prisma.SeriesDetailsAggregateArgs> = z.object({
  where: SeriesDetailsWhereInputSchema.optional(), 
  orderBy: z.union([ SeriesDetailsOrderByWithRelationInputSchema.array(), SeriesDetailsOrderByWithRelationInputSchema ]).optional(),
  cursor: SeriesDetailsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeriesDetailsGroupByArgsSchema: z.ZodType<Prisma.SeriesDetailsGroupByArgs> = z.object({
  where: SeriesDetailsWhereInputSchema.optional(), 
  orderBy: z.union([ SeriesDetailsOrderByWithAggregationInputSchema.array(), SeriesDetailsOrderByWithAggregationInputSchema ]).optional(),
  by: SeriesDetailsScalarFieldEnumSchema.array(), 
  having: SeriesDetailsScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeriesDetailsFindUniqueArgsSchema: z.ZodType<Prisma.SeriesDetailsFindUniqueArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereUniqueInputSchema, 
}).strict();

export const SeriesDetailsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeriesDetailsFindUniqueOrThrowArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereUniqueInputSchema, 
}).strict();

export const ListItemFindFirstArgsSchema: z.ZodType<Prisma.ListItemFindFirstArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereInputSchema.optional(), 
  orderBy: z.union([ ListItemOrderByWithRelationInputSchema.array(), ListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ListItemWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ListItemScalarFieldEnumSchema, ListItemScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ListItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ListItemFindFirstOrThrowArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereInputSchema.optional(), 
  orderBy: z.union([ ListItemOrderByWithRelationInputSchema.array(), ListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ListItemWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ListItemScalarFieldEnumSchema, ListItemScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ListItemFindManyArgsSchema: z.ZodType<Prisma.ListItemFindManyArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereInputSchema.optional(), 
  orderBy: z.union([ ListItemOrderByWithRelationInputSchema.array(), ListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ListItemWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ListItemScalarFieldEnumSchema, ListItemScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ListItemAggregateArgsSchema: z.ZodType<Prisma.ListItemAggregateArgs> = z.object({
  where: ListItemWhereInputSchema.optional(), 
  orderBy: z.union([ ListItemOrderByWithRelationInputSchema.array(), ListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: ListItemWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ListItemGroupByArgsSchema: z.ZodType<Prisma.ListItemGroupByArgs> = z.object({
  where: ListItemWhereInputSchema.optional(), 
  orderBy: z.union([ ListItemOrderByWithAggregationInputSchema.array(), ListItemOrderByWithAggregationInputSchema ]).optional(),
  by: ListItemScalarFieldEnumSchema.array(), 
  having: ListItemScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ListItemFindUniqueArgsSchema: z.ZodType<Prisma.ListItemFindUniqueArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereUniqueInputSchema, 
}).strict();

export const ListItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ListItemFindUniqueOrThrowArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereUniqueInputSchema, 
}).strict();

export const StatusHistoryFindFirstArgsSchema: z.ZodType<Prisma.StatusHistoryFindFirstArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ StatusHistoryOrderByWithRelationInputSchema.array(), StatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusHistoryScalarFieldEnumSchema, StatusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StatusHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StatusHistoryFindFirstOrThrowArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ StatusHistoryOrderByWithRelationInputSchema.array(), StatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusHistoryScalarFieldEnumSchema, StatusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StatusHistoryFindManyArgsSchema: z.ZodType<Prisma.StatusHistoryFindManyArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ StatusHistoryOrderByWithRelationInputSchema.array(), StatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusHistoryScalarFieldEnumSchema, StatusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StatusHistoryAggregateArgsSchema: z.ZodType<Prisma.StatusHistoryAggregateArgs> = z.object({
  where: StatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ StatusHistoryOrderByWithRelationInputSchema.array(), StatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StatusHistoryGroupByArgsSchema: z.ZodType<Prisma.StatusHistoryGroupByArgs> = z.object({
  where: StatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ StatusHistoryOrderByWithAggregationInputSchema.array(), StatusHistoryOrderByWithAggregationInputSchema ]).optional(),
  by: StatusHistoryScalarFieldEnumSchema.array(), 
  having: StatusHistoryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StatusHistoryFindUniqueArgsSchema: z.ZodType<Prisma.StatusHistoryFindUniqueArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereUniqueInputSchema, 
}).strict();

export const StatusHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StatusHistoryFindUniqueOrThrowArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereUniqueInputSchema, 
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

export const SeriesDetailsCreateArgsSchema: z.ZodType<Prisma.SeriesDetailsCreateArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  data: z.union([ SeriesDetailsCreateInputSchema, SeriesDetailsUncheckedCreateInputSchema ]),
}).strict();

export const SeriesDetailsUpsertArgsSchema: z.ZodType<Prisma.SeriesDetailsUpsertArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereUniqueInputSchema, 
  create: z.union([ SeriesDetailsCreateInputSchema, SeriesDetailsUncheckedCreateInputSchema ]),
  update: z.union([ SeriesDetailsUpdateInputSchema, SeriesDetailsUncheckedUpdateInputSchema ]),
}).strict();

export const SeriesDetailsCreateManyArgsSchema: z.ZodType<Prisma.SeriesDetailsCreateManyArgs> = z.object({
  data: z.union([ SeriesDetailsCreateManyInputSchema, SeriesDetailsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeriesDetailsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SeriesDetailsCreateManyAndReturnArgs> = z.object({
  data: z.union([ SeriesDetailsCreateManyInputSchema, SeriesDetailsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeriesDetailsDeleteArgsSchema: z.ZodType<Prisma.SeriesDetailsDeleteArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  where: SeriesDetailsWhereUniqueInputSchema, 
}).strict();

export const SeriesDetailsUpdateArgsSchema: z.ZodType<Prisma.SeriesDetailsUpdateArgs> = z.object({
  select: SeriesDetailsSelectSchema.optional(),
  include: SeriesDetailsIncludeSchema.optional(),
  data: z.union([ SeriesDetailsUpdateInputSchema, SeriesDetailsUncheckedUpdateInputSchema ]),
  where: SeriesDetailsWhereUniqueInputSchema, 
}).strict();

export const SeriesDetailsUpdateManyArgsSchema: z.ZodType<Prisma.SeriesDetailsUpdateManyArgs> = z.object({
  data: z.union([ SeriesDetailsUpdateManyMutationInputSchema, SeriesDetailsUncheckedUpdateManyInputSchema ]),
  where: SeriesDetailsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SeriesDetailsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SeriesDetailsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SeriesDetailsUpdateManyMutationInputSchema, SeriesDetailsUncheckedUpdateManyInputSchema ]),
  where: SeriesDetailsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SeriesDetailsDeleteManyArgsSchema: z.ZodType<Prisma.SeriesDetailsDeleteManyArgs> = z.object({
  where: SeriesDetailsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ListItemCreateArgsSchema: z.ZodType<Prisma.ListItemCreateArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  data: z.union([ ListItemCreateInputSchema, ListItemUncheckedCreateInputSchema ]),
}).strict();

export const ListItemUpsertArgsSchema: z.ZodType<Prisma.ListItemUpsertArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereUniqueInputSchema, 
  create: z.union([ ListItemCreateInputSchema, ListItemUncheckedCreateInputSchema ]),
  update: z.union([ ListItemUpdateInputSchema, ListItemUncheckedUpdateInputSchema ]),
}).strict();

export const ListItemCreateManyArgsSchema: z.ZodType<Prisma.ListItemCreateManyArgs> = z.object({
  data: z.union([ ListItemCreateManyInputSchema, ListItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ListItemCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ListItemCreateManyAndReturnArgs> = z.object({
  data: z.union([ ListItemCreateManyInputSchema, ListItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ListItemDeleteArgsSchema: z.ZodType<Prisma.ListItemDeleteArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  where: ListItemWhereUniqueInputSchema, 
}).strict();

export const ListItemUpdateArgsSchema: z.ZodType<Prisma.ListItemUpdateArgs> = z.object({
  select: ListItemSelectSchema.optional(),
  include: ListItemIncludeSchema.optional(),
  data: z.union([ ListItemUpdateInputSchema, ListItemUncheckedUpdateInputSchema ]),
  where: ListItemWhereUniqueInputSchema, 
}).strict();

export const ListItemUpdateManyArgsSchema: z.ZodType<Prisma.ListItemUpdateManyArgs> = z.object({
  data: z.union([ ListItemUpdateManyMutationInputSchema, ListItemUncheckedUpdateManyInputSchema ]),
  where: ListItemWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ListItemUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ListItemUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ListItemUpdateManyMutationInputSchema, ListItemUncheckedUpdateManyInputSchema ]),
  where: ListItemWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ListItemDeleteManyArgsSchema: z.ZodType<Prisma.ListItemDeleteManyArgs> = z.object({
  where: ListItemWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StatusHistoryCreateArgsSchema: z.ZodType<Prisma.StatusHistoryCreateArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  data: z.union([ StatusHistoryCreateInputSchema, StatusHistoryUncheckedCreateInputSchema ]),
}).strict();

export const StatusHistoryUpsertArgsSchema: z.ZodType<Prisma.StatusHistoryUpsertArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereUniqueInputSchema, 
  create: z.union([ StatusHistoryCreateInputSchema, StatusHistoryUncheckedCreateInputSchema ]),
  update: z.union([ StatusHistoryUpdateInputSchema, StatusHistoryUncheckedUpdateInputSchema ]),
}).strict();

export const StatusHistoryCreateManyArgsSchema: z.ZodType<Prisma.StatusHistoryCreateManyArgs> = z.object({
  data: z.union([ StatusHistoryCreateManyInputSchema, StatusHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StatusHistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StatusHistoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ StatusHistoryCreateManyInputSchema, StatusHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StatusHistoryDeleteArgsSchema: z.ZodType<Prisma.StatusHistoryDeleteArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  where: StatusHistoryWhereUniqueInputSchema, 
}).strict();

export const StatusHistoryUpdateArgsSchema: z.ZodType<Prisma.StatusHistoryUpdateArgs> = z.object({
  select: StatusHistorySelectSchema.optional(),
  include: StatusHistoryIncludeSchema.optional(),
  data: z.union([ StatusHistoryUpdateInputSchema, StatusHistoryUncheckedUpdateInputSchema ]),
  where: StatusHistoryWhereUniqueInputSchema, 
}).strict();

export const StatusHistoryUpdateManyArgsSchema: z.ZodType<Prisma.StatusHistoryUpdateManyArgs> = z.object({
  data: z.union([ StatusHistoryUpdateManyMutationInputSchema, StatusHistoryUncheckedUpdateManyInputSchema ]),
  where: StatusHistoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StatusHistoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StatusHistoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StatusHistoryUpdateManyMutationInputSchema, StatusHistoryUncheckedUpdateManyInputSchema ]),
  where: StatusHistoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StatusHistoryDeleteManyArgsSchema: z.ZodType<Prisma.StatusHistoryDeleteManyArgs> = z.object({
  where: StatusHistoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();