#include "duckdb/web/extensions/icu_extension.h"

#include "icu-extension.hpp"

extern "C" void duckdb_web_icu_init(duckdb::DuckDB* db) { db->LoadExtension<duckdb::ICUExtension>(); }
