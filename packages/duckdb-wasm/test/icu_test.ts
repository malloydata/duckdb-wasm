import * as duckdb from '../src/';

export function testICU(db: () => duckdb.DuckDBBindings): void {
    let conn: duckdb.DuckDBConnection;
    beforeEach(() => {
        conn = db().connect();
    });

    afterEach(() => {
        conn.close();
        db().flushFiles();
        db().dropFiles();
    });

    describe('ICU', () => {
        it('SET TimeZone', async () => {
            // Will error if ICU isn't loaded
            await conn.query("SET TimeZone='UTC'");
        });
    });
}
