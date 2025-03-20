import { PhotonImage, resize, SamplingFilter } from '@cf-wasm/photon/node'

export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'pathname')
    const { preview } = getQuery(event);
    if (preview === undefined) {
        const body = await hubBlob().serve(event, path || "")
        return body;
    } else {
        // create a PhotonImage instance
        const blob = await hubBlob().get(path || "")
        const inputImage = PhotonImage.new_from_byteslice(new Uint8Array(await blob!.arrayBuffer()));
        const a = inputImage.get_width() / 300;
        const outputImage = resize(
            inputImage,
            inputImage.get_width() / a,
            inputImage.get_height() / a,
            SamplingFilter.Nearest
        );
        const outputBytes = outputImage.get_bytes_webp();
        inputImage.free();
        outputImage.free();

        // return the Response instance
        return new Response(outputBytes, {
            headers: {
            "Content-Type": "image/jpeg"
            }
        });
    }
})