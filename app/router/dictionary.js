module.exports = app => {
    const { router, controller } = app;
    //router.prefix("/api/dictionary");
    router.post('/dictionary/add',controller.dictionary.add);
    router.get("/dictionary",controller.dictionary.getAll);
    router.delete("/dictionary/:id",controller.dictionary.del);
};
