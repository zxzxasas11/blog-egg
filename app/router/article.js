module.exports = app => {
    const {router, controller} = app;
    router.resources('article','/article',controller.article)
};
