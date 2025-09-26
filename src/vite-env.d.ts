/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_AIRTABLE_API_KEY: string,
  readonly VITE_AIRTABLE_BASE_ID: string,
  readonly VITE_BLACK_BOX_TABLE_ID: string,
  readonly VITE_PEOPLE_TABLE_ID: string,
  readonly VITE_WEBSITE_BROWSE_VIEW_ID: string,
  readonly VITE_DETAIL_VIEW_ID: string
  readonly VITE_SIMPLE_TITLE_FIELD_ID: string,
  readonly VITE_SYNOPSIS_FIELD_ID: string,
  readonly VITE_BLACK_BOX_PHOTO_FIELD_ID: string,
  readonly VITE_COVER_PHOTO_FIELD_ID: string,
  readonly VITE_DESCRIPTION_FIELD_ID: string,
  readonly VITE_YEAR_RANGE_FIELD_ID: string,
  readonly VITE_AUTHOR_FIELD_ID: string,
  readonly VITE_ASSOCIATION_FIELD_ID: string,
  readonly VITE_TAGS_FIELD_ID: string,
  readonly VITE_SHORT_TITLE_FIELD: string,
  readonly VITE_ADDITIONAL_PHOTOS_FIELD: string,
  readonly VITE_ADDITIONAL_INSCRIPTIONS_FIELD: string,
  readonly VITE_CATALOG_NOTES_FIELD: string,
  readonly VITE_REFERENCE_LIBRARY_FIELD: string,
  readonly VITE_RPBB_FIELD: string,
  readonly VITE_CATALOGER_FIELD: string,
  readonly VITE_SORT_FIELD_ID: string,
  readonly VITE_NAME_FIELD_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}