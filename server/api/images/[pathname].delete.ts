
export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'pathname')
    await hubBlob().del(path || "")
    return true;
})