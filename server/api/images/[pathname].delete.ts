
export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'pathname')
    const { preview } = getQuery(event);
    await hubBlob().del((path || ""))
    return true;
})