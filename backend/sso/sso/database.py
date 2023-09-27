# https://github.com/jordic/fastapi_asyncpg
import asyncpg


class Database:
    def __init__(self, app, port, host, db_name, username, password):
        self.app = app
        self.dsn = f"postgresql://{username}:{password}@{host}:{port}/{db_name}"
        self.con_opts = {}
        self._pool = None
        self.app.router.add_event_handler("startup", self.on_connect)
        self.app.router.add_event_handler("shutdown", self.on_disconnect)

    async def on_connect(self):
        if self._pool:
            self.app.state.pool = self._pool
            return
        pool = await asyncpg.create_pool(dsn=self.dsn, **self.con_opts)
        self.app.state.pool = pool

    async def on_disconnect(self):
        if self._pool:
            return
        await self.app.state.pool.close()

    @property
    def pool(self):
        return self.app.state.pool

    async def connection(self):
        async with self.pool.acquire() as db:
            yield db

    async def transaction(self):
        async with self.pool.acquire() as db:
            txn = db.transaction()
            await txn.start()
            try:
                yield db
            except:  # noqa
                await txn.rollback()
                raise
            else:
                await txn.commit()

    atomic = transaction
