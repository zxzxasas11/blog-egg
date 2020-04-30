export default =function(asyncFunc){
    try {
        return asyncFunc
    }catch (e) {
        console.log(e)
    }
}