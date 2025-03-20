
export default defineEventHandler(async (event) => {
    const { blobs } = await hubBlob().list({ limit: 20 })
    return blobs;
})